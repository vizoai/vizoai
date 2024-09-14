/* eslint-disable no-undef */
import bundleAnalyzer from "@next/bundle-analyzer";
import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  defaultShowCopyCode: true,
  themeConfig: "./theme.config.tsx",
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
};

export default withBundleAnalyzer(withNextra(nextConfig));
