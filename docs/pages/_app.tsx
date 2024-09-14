import React from "react";
import "../styles/globals.css";
import { type AppType, type AppProps } from "next/app";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="min-h-screen">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
