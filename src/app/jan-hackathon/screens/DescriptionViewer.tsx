import { Text } from "@components/text";
import { KohbeeMarketingPosterState } from "@recoil/atoms";
import { useRecoilState } from "recoil";
import { AngleIcon } from "@library/icons";
import { useRouter } from "next/router";
import { Button } from "@components/button";
import { ChangeEvent, useState } from "react";

const wordLimit = 18;

const DescriptionViewer = ({
  handleSetStage,
}: {
  handleSetStage: (value: number) => void;
}): JSX.Element => {
  const [usePosterData, setPosterData] = useRecoilState(
    KohbeeMarketingPosterState
  );
  const router = useRouter();
  const [wordCount, setWordCount] = useState<number>(0);
  const [userInput, setUserInput] = useState("");
  const [isVisibleEditor, setIsVisibleEditor] = useState(false);

  const handleSelectDescription = (index: number) => {
    const description = usePosterData?.description[index];
    setPosterData({ ...usePosterData, selectedDescription: description });
    if (description?.length) {
      // handleSetStage(4);
      router.push("?step=templates", undefined, { shallow: true });
    }
  };

  const handleChangeAns = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = event.target;
    const res: string[] = [];
    let tempValue = value;
    tempValue
      .replace(/[\t\n\r]/gm, " ")
      .split(" ")
      .map((word) => {
        const trimed = word.trim();
        if (trimed.length > 0) {
          res.push(trimed);
        }
      });
    setWordCount(res.length);

    setUserInput(value);
  };

  const handleAddDescription = () => {
    setPosterData({
      ...usePosterData,
      description: [...usePosterData.description, userInput],
    });
    setUserInput("");
    setWordCount(0);
  };

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
          {usePosterData?.description?.length ? (
            usePosterData?.description?.map((description, index) => (
              <div
                key={index}
                className={`cursor-pointer flex justify-between items-center gap-2 p-2 border-[0.5px] border-grey rounded shadow-[0px_0px_4px_rgba(0,0,0,0.15)] ${
                  usePosterData?.selectedDescription == description
                    ? "bg-off-white"
                    : ""
                }`}
                onClick={() => handleSelectDescription(index)}
              >
                <div className="flex-1">
                  <Text
                    t={description ? description : ""}
                    style="subtextSmall text-dark-grey w-[90%]"
                  />
                </div>
                <div>
                  <AngleIcon type="right" color="#4DB6AC" />
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      {isVisibleEditor && (
        <div>
          <div className="mt-8">
            <textarea
              value={userInput}
              onChange={(event) => handleChangeAns(event)}
              placeholder="Write your own description"
              rows={4}
              className={`w-full h-auto py-2 px-3 rounded border-2 border-[#1D797E] focus:ring-transparent focus:border-[#1D797E]`}
            ></textarea>

            <div>
              <Text
                t={`${wordCount}/${wordLimit} Words ${
                  wordCount >= wordLimit
                    ? ", You have exceeded max word limit"
                    : ""
                }`}
                style={`smalltext ml-3 ${
                  wordCount >= wordLimit ? "!text-[#E03131]" : "!text-#0000008a"
                }`}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-12 gap-2 grid-rows-1">
            <Button
              className={`col-start-2 col-end-12 ${
                wordCount == 0 ? "!bg-dark-grey" : ""
              }`}
              loadingText="loading"
              onClick={handleAddDescription}
              disabled={wordCount == 0}
            >
              <Text t="Add" style="paragraphRegular" />
            </Button>
          </div>
        </div>
      )}

      {!isVisibleEditor && (
        <div className="m-auto mt-8">
          <div className="flex justify-center">
            <button className="" onClick={() => setIsVisibleEditor(true)}>
              <Text t="or write your own" style="underline text-center" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { DescriptionViewer };
