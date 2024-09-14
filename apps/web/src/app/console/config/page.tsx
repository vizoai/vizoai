import type { Metadata } from "next";

export default function ConfigPage() {
  // return <div>{data ? JSON.stringify(data) : null}</div>;
  return <div>控制台</div>;
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "控制台",
  };
};
