import Head from "next/head";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import "@styles/global.css";
import "@styles/typography.css";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <title>AI Poster Maker</title>

          <link rel="manifest" href="/manifest.json" />
          <link href="/favicon.ico" rel="icon" type="image/png" sizes="16x16" />
          <link href="/favicon.png" rel="icon" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#317EFB" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  );
}
