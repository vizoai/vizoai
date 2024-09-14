import React from "react";
import { useConfig, type DocsThemeConfig } from "nextra-theme-docs";
import Logo from "./components/logo";
import StartButton from "./components/start-button";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: <Logo />,
  darkMode: true,
  project: {
    link: "https://github.com/vizoai/vizoai",
  },
  docsRepositoryBase: "https://github.com/vizoai/vizoai/tree/main",
  footer: {
    content: "Vizo Docs",
  },
  editLink: {
    content: "Edit this page on GitHub",
  },
  navbar: {
    extraContent: <StartButton />,
  },
  search: {
    placeholder: "Search...",
  },
  head: function useHead() {
    const config = useConfig();
    const { route } = useRouter();
    const isDefault = route === "/" || !config.title;
    const image =
      "https://www.vizoai.com/" +
      (isDefault ? "og.jpeg" : `api/og?title=${config.title}`);

    const description = config.frontMatter.description || "Make Nice AI.";
    const title = config.title + (route === "/" ? "" : " - VizoAI");

    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="msapplication-TileColor" content="#fff" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site:domain" content="www.vizoai.com" />
        <meta name="twitter:url" content="https://www.vizoai.com" />
        <meta name="apple-mobile-web-app-title" content="vizoai" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link
          rel="icon"
          href="/favicon-dark.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/favicon-dark.png"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        />
      </>
    );
  },
};

export default config;
