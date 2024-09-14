/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const isProd = process.env.NODE_ENV === "production";
const mode = process.env.BUILD_MODE;

/**
 * @param {import("next").NextConfig} conf
 * @returns {import("next").NextConfig}
 */
const noWrapper = (conf) => config;

/** @type {import("next").NextConfig} */
const config = {
  // @ts-ignore
  output: mode,
};

export default config;
