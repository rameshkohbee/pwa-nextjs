import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Text } from "@components/text";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import websiteState from "@recoil/atoms/website";
import { useRecoilState } from "recoil";

export function WebsiteTestimonial(): JSX.Element {
    const [websiteData] = useRecoilState(websiteState);
    const testimonial = websiteData.sectionWidgetData.testimonialSection;
    function compare(a, b) {
        const val1 = a.position;
        const val2 = b.position;
        if (val1 > val2) return 1;
        if (val1 < val2) return -1;
        return 0;
    }
    if (
        testimonial?.contentList == null ||
        testimonial.contentList === undefined ||
        testimonial.contentList.length === 0
    ) {
        return <div />;
    }
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
                nextEl: ".swiper-button-nextious",
                prevEl: ".swiper-button-previous",
            }}
            pagination={{ clickable: true }}
            rewind
            autoHeight
            followFinger={false}
        >
            <div className="testimonial-buttons-parent">
                <div className="swiper-button-previous testimonial-buttons-previous">
                    <button className="testimonial-button">
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            style={{ color: "white" }}
                        />
                    </button>
                </div>
                <div className="swiper-button-nextious testimonial-buttons-next">
                    <button className="testimonial-button">
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            style={{ color: "white" }}
                        />
                    </button>
                </div>
            </div>
            <div className="parent_class">
                {testimonial.contentList
                    .slice()
                    .sort(compare)
                    .map((value) => (
                        <SwiperSlide>
                            <div className="">
                                <section className="rounded-md bg-gray-100">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center">
                                        <img
                                            alt="Man"
                                            src={
                                                value.hasImage
                                                    ? value.imageUrl
                                                    : "/images/blog-img-3.png"
                                            }
                                            className="aspect-square w-full rounded-lg object-cover"
                                        />
                                        <blockquote className="sm:col-span-2 px-4 pb-4">
                                            <Text
                                                t={value.title}
                                                style="headerSmall"
                                            ></Text>
                                            <cite className="mt-2 inline-flex items-center not-italic">
                                                <Text
                                                    t={value.subtitle}
                                                    style="paragraphRegular"
                                                ></Text>
                                            </cite>
                                        </blockquote>
                                    </div>
                                </section>
                            </div>
                        </SwiperSlide>
                    ))}
            </div>
        </Swiper>
    );
}
