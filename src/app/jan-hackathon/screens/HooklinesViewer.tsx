import { Text } from "@components/text";
import { KohbeeMarketingPosterState } from "@recoil/atoms";
import { useRecoilState } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import { AngleIcon } from "@library/icons";
import { useRouter } from "next/router";

const HooklineViewer = ({
  handleSetStage,
}: {
  handleSetStage: (value: number) => void;
}): JSX.Element => {
  const [usePosterData, setPosterData] = useRecoilState(
    KohbeeMarketingPosterState
  );
  const router = useRouter();
  const handleSelectHookline = (index: number) => {
    const hookline = usePosterData?.hooklines[index];

    setPosterData({
      ...usePosterData,
      selectedHookline: hookline,
    });
    // handleSetStage(3);
    router.push("?step=description", undefined, { shallow: true });
  };
  console.log("posterDataHookline", usePosterData);

  return (
    <div className="page-margin pb-6 md:pb-8">
      <Text
        t="Hook your viewers with a Crisp Title"
        style="header text-center mt-[112px] md:mt-[142px]"
      />
      <Text
        t="We have generated some relevant ones for you to choose from..."
        style="paragraphRegular text-center mt-4"
      />
      <div className="mt-16">
        <div className="flex flex-col gap-4">
          {usePosterData?.hooklines?.length &&
            usePosterData?.hooklines?.map((hookline, index) => (
              <div
                key={index}
                className="cursor-pointer flex justify-between items-center gap-2 p-2 border-[0.5px] border-grey rounded shadow-[0px_0px_4px_rgba(0,0,0,0.15)]"
                onClick={() => handleSelectHookline(index)}
              >
                <Text
                  t={hookline ? hookline : ""}
                  style="subtextRegular text-dark-grey w-[80%]"
                />
                <div>
                  <AngleIcon type="right" color="#4DB6AC" />
                </div>
              </div>
            ))}
        </div>
      </div>
      {false && (
        <div className="m-auto">
          <div className="flex justify-center">
            <button className="">
              <Text t="or write your own" style="underline text-center" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { HooklineViewer };
