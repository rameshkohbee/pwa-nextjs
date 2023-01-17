import { Text } from "@components/text";
import { KohbeeMarketingPosterState } from "@recoil/atoms";
import { useRecoilState } from "recoil";
import { AngleIcon } from "@library/icons";
import { useRouter } from "next/router";

const DescriptionViewer = ({
  handleSetStage,
}: {
  handleSetStage: (value: number) => void;
}): JSX.Element => {
  const [usePosterData, setPosterData] = useRecoilState(
    KohbeeMarketingPosterState
  );
  const router = useRouter();

  const handleSelectDescription = (index: number) => {
    const description = usePosterData?.description[index];
    setPosterData({ ...usePosterData, selectedDescription: description });
    if (description?.length) {
      // handleSetStage(4);
      router.push("?step=templates", undefined, { shallow: true });
    }
  };
  console.log("posterData", usePosterData);

  return (
    <div className="page-margin pb-6 md:pb-8">
      <Text
        t="Add a short description to show some value "
        style="header text-center mt-[112px] md:mt-[142px]"
      />
      <Text
        t="We have generated some relevant ones for you to choose from..."
        style="paragraphRegular text-center mt-4"
      />
      <div className="mt-16">
        <div className="flex flex-col gap-4">
          {usePosterData?.description?.length &&
            usePosterData?.description?.map((description, index) => (
              <div
                key={index}
                className="cursor-pointer flex justify-between items-center gap-2 p-2 border-[0.5px] border-grey rounded shadow-[0px_0px_4px_rgba(0,0,0,0.15)]"
                onClick={() => handleSelectDescription(index)}
              >
                <Text
                  t={description ? description : ""}
                  style="subtextSmall text-dark-grey w-[90%]"
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

export { DescriptionViewer };
