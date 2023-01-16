import { Text } from "@components/text";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Lottie from "react-lottie-player";
import RocketFlying from "public/images/marketingPoster/rocket-flying.json";
const PosterBuilding = (): JSX.Element => {
  const router = useRouter();
  const timerId = useRef<any>(null);
  useEffect(() => {
    timerId.current = setTimeout(() => {
      router.replace("?step=download", undefined, { shallow: true });
      timerId.current = null;
      clearTimeout(timerId.current);
    }, 4000);

    return () => {
      clearTimeout(timerId.current);
    };
  }, []);

  return (
    <div className="page-margin pb-4">
      <Text
        t="Something delightful is on the way..."
        style="header text-center mt-[108px] md:mt-[138px]"
      />
      <Text
        t="Getting your beautiful poster ready!"
        style="paragraphRegular text-center mt-4"
      />
      <div className="mt-16">
        <div className="flex justify-center">
          <Lottie
            loop
            animationData={RocketFlying}
            play
            style={{ width: 300, height: 300 }}
          />
        </div>
        <div className="mt-20">
          <Text t="Powered by @teamkohbee" style="text-center smalltext" />
        </div>
      </div>
    </div>
  );
};

export { PosterBuilding };
