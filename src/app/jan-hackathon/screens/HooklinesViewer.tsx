import { Text } from "@components/text";
import { KohbeeMarketingPosterState } from "@recoil/atoms";
import { useRecoilState } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AngleIcon } from "@library/icons";

const HooklineViewer = ({
  handleSetStage,
}: {
  handleSetStage: (value: number) => void;
}): JSX.Element => {
  const [usePosterData, setPosterData] = useRecoilState(
    KohbeeMarketingPosterState
  );
  const apiKey = process.env.NEXT_PUBLIC_OPENAIKEY;
  const handleSelectHookline = (index: number) => {
    const hookline = usePosterData?.hooklines[index];

    setPosterData({
      ...usePosterData,
      selectedHookline: hookline,
    });
    handleSetStage(3);
  };

  return (
    <div className="page-margin">
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
                  t={
                    hookline ||
                    "Improve flexibility, strength, technique through yoga."
                  }
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
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        theme="dark"
        limit={2}
      />
    </div>
  );
};

export { HooklineViewer };
