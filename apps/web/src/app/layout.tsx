import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { ResolvingViewport } from "next";
import type { PropsWithChildren } from "react";

import Analytics from "../components/analytics";
import { ThemeProvider } from "../components/theme";

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

export const generateViewport = async (): ResolvingViewport => {
  return {
    initialScale: 1,
    minimumScale: 1,
    themeColor: [
      { color: "#f8f8f8", media: "(prefers-color-scheme: light)" },
      { color: "#000", media: "(prefers-color-scheme: dark)" },
    ],
    viewportFit: "cover",
    width: "device-width",
  };
};

export { generateMetadata } from "./metadata";
