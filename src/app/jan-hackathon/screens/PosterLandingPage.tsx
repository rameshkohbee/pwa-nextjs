import { Button } from "@components/button";
import { Text } from "@components/text";
import { KohbeeMarketingPosterState } from "@recoil/atoms";
import { ChangeEvent, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const wordLimit = 900;
const PosterLandingPage = ({
  handleSetStage,
}: {
  handleSetStage: (value: number) => void;
}): JSX.Element => {
  const [userInput, setUserInput] = useState(
    "Join our 10-hour online yoga course under the guidance of International Yoga Master Praveen Kumar Verma, focusing on advanced techniques for flexibility and strength, arm balances, and more. Suitable for all fitness levels, with multiple styles of yoga included"
  );
  const [usePosterData, setPosterData] = useRecoilState(
    KohbeeMarketingPosterState
  );
  const router = useRouter();
  const textAreaRef = useRef<any>();
  const [wordCount, setWordCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_OPENAIKEY;
  const handleChangeAns = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    let userInput = value;
    if (userInput.length > wordLimit) {
      userInput = value.slice(0, wordLimit);
    }
    setWordCount(userInput.length);

    setUserInput(userInput);
  };

  const getHooklines = async ({
    type,
    query,
  }: {
    type: "hookline" | "description";
    query: string;
  }) => {
    // console.log(type);

    const apiUrl = "https://api.openai.com/v1/completions";
    let isSuccess = false;
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
      }),
    };
    // stop: ".",
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
    // n: 4,
    let data = fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        let isEmptyField = false;
        let hooks = data.choices.filter((choice) => {
          if (choice?.text?.trim().length) {
            return choice;
          }
        });
        // console.log(isEmptyField, "sentance", hooks);
        hooks = hooks.map((choice) => choice.text);
        // if (hooks?.length < 2) {
        //   isEmptyField = true;
        // }
        // console.log(isEmptyField, "after", hooks);
        if (!hooks?.length) {
          hooks = ["", ""];
          isEmptyField = true;
        }
        if (hooks?.length && !isEmptyField) {
          isSuccess = true;
          if (type == "hookline") {
            const payload = {
              userInput: userInput,
              hooklines: hooks?.length ? hooks : [],
            };
            setPosterData((prev) => {
              return { ...prev, ...payload };
            });
          } else {
            const payload = {
              userInput: userInput,
              description: hooks?.length ? hooks : [],
            };
            setPosterData((prev) => {
              return { ...prev, ...payload };
            });
          }
          return true;
        } else {
          if (hooks?.length && isEmptyField) {
            toast.warn("You have exceeded max token limit");
          } else {
            toast.warn("Something went wrong");
          }
          isSuccess = false;
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
        setLoading(false);
        isSuccess = false;
        return false;
      });
    await data;
    return isSuccess;
  };

  const handleGetHooklines = async () => {
    setLoading(true);

    let value = userInput;
    let newValue = value.replace(/[\t\n\r]/gm, " ");

    const hooklineQuery = `Create a hook line in less than 8 words from the following text. ${newValue}`;
    // const query = `Create a value-driven title in not more than 8 words using the following text. ${newValue}`;

    const descriptionQuery = `Create a value-deriving title in less than 18 words from the following text. ${newValue}`;

    let hooklines = await getHooklines({
      type: "hookline",
      query: hooklineQuery,
    });

    if (hooklines) {
      let description = await getHooklines({
        type: "description",
        query: descriptionQuery,
      });

      if (description) {
        // handleSetStage(2);
        router.push("?step=title", undefined, { shallow: true });
        return true;
      }
    }
    // handleSetStage(2);

    setLoading(false);
  };
  return (
    <div className="page-margin pb-6 md:pb-8">
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
            t={`${wordCount}/${wordLimit} Characters ${
              wordCount >= wordLimit
                ? ", You have exceeded max character limit"
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
