import { NotFound } from "@components/not-found";
import { ProgressBar } from "@components/progress-bar";
import { Text } from "@components/text";
import { BackArrowIcon } from "@library/icons";
import { KohbeeMarketingPosterState } from "@recoil/atoms";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { DescriptionViewer } from "src/app/jan-hackathon/screens/DescriptionViewer";
import { HooklineViewer } from "src/app/jan-hackathon/screens/HooklinesViewer";
import { PosterBuilding } from "src/app/jan-hackathon/screens/PosterBuilding";
import { PosterDownload } from "src/app/jan-hackathon/screens/PosterDownload";
import { PosterLandingPage } from "src/app/jan-hackathon/screens/PosterLandingPage";
import { PosterStyleSelector } from "src/app/jan-hackathon/screens/PosterStyleSelector";

export default function Home(): JSX.Element {
  const [stage, setStage] = useState<number>(1);
  const [usePosterData, setPosterData] = useRecoilState(
    KohbeeMarketingPosterState
  );
  const router = useRouter();
  const getStage = {
    title: 2,
    description: 3,
    templates: 4,
    generating: 5,
    download: 6,
  };

  useEffect(() => {
    let query = router?.query?.step;
    if (query) {
      if (!Array.isArray(query) && getStage[query]) {
        setStage(getStage[query]);
      }
    } else {
      let url = window.location.origin;
      window.history.pushState({}, "", url);
      router.replace("/");
      setStage(1);
    }
  }, [router?.query?.step]);

  useEffect(() => {
    const payload = {
      userInput: "",
      hooklines: [],
      description: [],
      selectedHookline: "",
      selectedDescription: "",
      selectedPosterStyle: {
        id: 1,
        bg: "bg-[url('/images/marketingPoster/1_Vibes.png')]",
        boxStyle:
          "p-6 pt-8 cursor-pointer bg-[url('/images/marketingPoster/1_Vibes.png')] bg-cover max-w-[300px] min-w-[300px] aspect-square ",
        hookline: {
          style: "text-left !text-[#333333] headerSmall uppercase mb-3",
        },
        description: {
          isVisible: true,
          style: "text-left !text-[#333333] smalltext uppercase",
        },
      },
    };
    setPosterData({ ...usePosterData, ...payload });
  }, []);

  const handleSetStage = useCallback(
    (value: number) => {
      if (value == -1 && stage > 2) {
        router.back();
      }
    },
    [stage]
  );

  const getStageText = {
    "1": "Choose a Title",
    "2": "Choose a short description",
    "3": "Choose a design",
    "4": "All Done! Sit back...",
  };

  console.log(stage);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="margin-x max-w-7xl mx-auto bg-pure-white z-10 py-4 fixed top-0 left-0 right-0">
        <div
          className={`flex justify-start ${
            stage == 1 || stage == 2 || stage == 5 ? "invisible" : ""
          }`}
        >
          <button onClick={() => handleSetStage(-1)}>
            <div className="flex items-center gap-3">
              <BackArrowIcon color="#555555" className="h-[1rem]" />
              <Text t="Back" style="subtextRegular" />
            </div>
          </button>
        </div>
        <div
          className={`mt-4 grid grid-cols-12 gap-2  ${
            stage == 2 || stage == 3 || stage == 4 || stage == 5 ? "" : "hidden"
          }`}
        >
          <div className="col-start-3 col-end-11 mb-1">
            <ProgressBar
              value={stage - 2}
              max={3}
              fillColor={"#4DB6AC"}
              bgColor={"#B8F2E3"}
            />
          </div>
          <div className="col-start-3 col-end-11">
            <Text
              t={`${getStageText[stage - 1]}`}
              style="smalltext text-center !font-normal"
            />
          </div>
        </div>
      </div>
      {(() => {
        switch (stage) {
          case 1:
            return <PosterLandingPage handleSetStage={handleSetStage} />;
          case 2:
            return <HooklineViewer handleSetStage={handleSetStage} />;
          case 3:
            return <DescriptionViewer handleSetStage={handleSetStage} />;
          case 4:
            return <PosterStyleSelector handleSetStage={handleSetStage} />;
          case 5:
            return <PosterBuilding />;
          case 6:
            return <PosterDownload />;
          default:
            return <NotFound />;
        }
      })()}
    </div>
  );
}
