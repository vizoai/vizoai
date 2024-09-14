import type { Metadata } from "next";
// import { getConfig } from "@/services/config";

export const generateMetadata = async (): Promise<Metadata> => {
  // const config = await getConfig();
  const config = {} as Record<string, string>
  const title = config.title || "Vizo";
  const description = config.description || "Vizo AI";
  return {
    title: {
      default: title,
      template: `%s · ${title}`,
    },
    description,
    manifest: "/manifest.webmanifest",
    metadataBase: new URL("https://www.vizoai.com"),
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  };
};
