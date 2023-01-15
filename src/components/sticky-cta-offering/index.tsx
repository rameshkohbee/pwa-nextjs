import { useEffect, useState } from "react";
import { KohbeeCourse } from "src/models/kohbee-course";
import { GradientButton, Text } from "..";

export default function StickyCtaOffering({
    course,
}: {
    course: KohbeeCourse;
}): JSX.Element {
    const [scrollPosition, setScrollPosition] = useState(0);
    const coursePageLink = `/app/#courses?id=${encodeURIComponent(
        course.id,
    )}&paymentredirect=true`;

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {scrollPosition > 600 && (
                <div className="lg:hidden fixed bottom-0 z-[10] w-full pb-safe">
                    <GradientButton
                        isAnimated={false}
                        isRounded={false}
                        className="w-full py-4"
                    >
                        <a href={coursePageLink}>
                            <Text
                                t={`ENROLL NOW @ ${
                                    course.price > 0
                                        ? `₹${course.price}`
                                        : "FREE"
                                }`}
                                style="!text-white"
                            ></Text>
                        </a>
                    </GradientButton>
                </div>
            )}
        </>
    );
}
