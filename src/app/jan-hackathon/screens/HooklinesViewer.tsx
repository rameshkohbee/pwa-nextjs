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
    const apiUrl = "https://api.openai.com/v1/completions";

    const query = `Create a value-deriving title in less than 18 words from the following text. ${usePosterData?.userInput}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: query,
        model: "text-davinci-003",
        temperature: 0.7,
        max_tokens: 150,
        stop: ".",
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 4,
      }),
    };
    // n: 4,
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        const hooks = data.choices.map((choice) => choice.text);
        setPosterData({
          ...usePosterData,
          description: hooks.length ? hooks : [],
          selectedHookline: hookline,
        });
        handleSetStage(3);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
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
