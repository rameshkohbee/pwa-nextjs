// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
import React from "react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { RecoilRoot } from "recoil";
import '../src/styles/global.css';
import "../src/styles/typography.css";
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  nextRouter: {
    Provider: RouterContext.Provider,
    locale: "en" // optional
  },
};


export const decorators = [
  (Story) => (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  ),
]