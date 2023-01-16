import { Button } from "@components/button";
import { Text } from "@components/text";
import { KohbeeMarketingPosterState } from "@recoil/atoms";
import { ChangeEvent, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const wordLimit = 900;
const PosterLandingPage = ({
  handleSetStage,
}: {
  handleSetStage: (value: number) => void;
}): JSX.Element => {
  const [userInput, setUserInput] = useState("");
  const [usePosterData, setPosterData] = useRecoilState(
    KohbeeMarketingPosterState
  );
  const textAreaRef = useRef<any>();
  const [wordCount, setWordCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleChangeAns = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    let userInput = value;
    if (userInput.length > wordLimit) {
      userInput = value.slice(0, wordLimit);
    }
    setWordCount(userInput.length);

    setUserInput(userInput);
  };

  const handleGetHooklines = () => {
    setLoading(true);
    const apiUrl = "https://api.openai.com/v1/completions";
    const apiKey = "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"; //ramesh
    // const apiKey = "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";
    // const apiKey = "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";
    // const query = `Generate a alternate value-deriving titles in not more than 8 words from the following text. ${userInput}`;
    const query = `Create a hook line in less than 8 words from the following text. ${userInput}`;

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
        const payload = {
          userInput: userInput,
          hooklines: hooks.length ? hooks : [],
          description: usePosterData?.description || [],
          selectedHookline: "",
          selectedDescription: "",
          selectedPosterStyle: {
            id: 1,
            bg: "bg-[url('/images/marketingPoster/1_Vibes.png')]",
            boxStyle:
              "p-6 pt-8 cursor-pointer bg-[url('/images/marketingPoster/1_Vibes.png')] bg-cover max-w-[300px] aspect-square ",
            hookline: {
              style: "text-left !text-[#333333] headerSmall uppercase mb-3",
            },
            description: {
              isVisible: true,
              style: "text-left !text-[#333333] smalltext uppercase",
            },
          },
        };
        setPosterData({ ...payload });
        console.log(data);
        handleSetStage(2);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="page-margin">
      <Text
        t="Welcome to Marketing Poster Creator"
        style="header text-center mt-[92px]"
      />
      <Text
        t="Upload your content and Choose your Poster. As simple as that!"
        style="paragraphRegular text-center mt-4"
      />
      <div className="mt-8">
        <textarea
          ref={(ele) => {
            if (ele) {
              textAreaRef.current = ele;
            }
          }}
          value={userInput}
          onChange={(event) => handleChangeAns(event)}
          placeholder="Add your content here..."
          rows={12}
          className={`w-full h-auto py-2 px-3 rounded border-2 border-[#1D797E] focus:ring-transparent focus:border-[#1D797E]`}
        ></textarea>

        <div>
          <Text
            t={`${wordCount}/${wordLimit} Words${
              wordCount >= wordLimit ? ", You have exceeded max word limit" : ""
            }`}
            style={`smalltext ml-3 ${
              wordCount >= wordLimit ? "!text-[#E03131]" : "!text-#0000008a"
            }`}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-2 grid-rows-1">
        <Button
          className="col-start-2 col-end-12"
          isLoading={loading}
          loadingText="loading"
          disabled={loading}
          onClick={handleGetHooklines}
        >
          <Text t="Next" style="paragraphRegular" />
        </Button>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        theme="dark"
        limit={2}
      />
    </div>
  );
};

export { PosterLandingPage };
