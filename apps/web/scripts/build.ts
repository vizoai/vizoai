import * as fs from "fs";
import fse from "fs-extra";
import path from "path";
import pkg from "../package.json";
import childProcess from "node:child_process";
import dotenv from "dotenv";

interface BuildOptions {
  nextConfigPath: string;
}

const setNextOptions = async (nextConfig: string) => {
  const currentConfig = await import(nextConfig).then((r) => r.default);
  const updatedConfig = {
    ...currentConfig,
    output: "standalone",
    serverRuntimeConfig: {
      ...currentConfig.serverRuntimeConfig,
      // nextServerlessCacheConfig: cacheConfig
    },
    // cacheHandler: require.resolve(path.join('..', 'cacheHandler', 'index.js'))
  };

  console.log("nextConfig", nextConfig);
  const currentContent = fs.readFileSync(nextConfig, "utf-8");

  let updatedContent = `module.exports = ${JSON.stringify(updatedConfig, null, 4)};\n`;

  // Check if the file has .mjs extension
  if (nextConfig.endsWith(".mjs")) {
    updatedContent = `export default ${JSON.stringify(updatedConfig, null, 4)};\n`;
  }

  fs.writeFileSync(nextConfig, updatedContent, "utf-8");

  // Function to revert back to original content of file
  return () => {
    fs.writeFileSync(nextConfig, currentContent, "utf-8");
  };
};

const buildNext = async (options: BuildOptions) => {
  // const { nextConfigPath } = options

  // const clearNextConfig = await setNextOptions(nextConfigPath)
  childProcess.execSync(pkg.scripts.build, {
    stdio: "inherit",
    env: {
      ...process.env,
      BUILD_MODE: "standalone",
      NODE_ENV: "production",
      cwd: process.cwd(),
    },
  });

  // Reverts changes to next project
  // return clearNextConfig
};

const build = async () => {
  const cwd = process.cwd();
  fse.removeSync(path.join(cwd, "build"));
  await buildNext({ nextConfigPath: path.join(cwd, "next.config.js") });
  const standalonePath = path.join(cwd, ".next/standalone");

  fse.copySync(
    path.join(cwd, ".next/static"),
    path.join(standalonePath, "apps/web/.next/static"),
  );
  fse.copySync(
    path.join(cwd, "public"),
    path.join(standalonePath, "apps/web/public"),
  );
  fse.copySync(path.join(standalonePath, "apps/web"), path.join(cwd, "build"));
  fse.copySync(
    path.join(standalonePath, "node_modules"),
    path.join(cwd, "build/node_modules"),
  );

  // output
  const output = path.join("../../build/web");
  fse.removeSync(output);
  fse.copySync(path.join(cwd, "build"), output);
  const config = dotenv.config({ path: "../../.env" });

  fse.writeJSONSync(path.join(output, "env.json"), config.parsed);
  fse.writeJSONSync(path.join(output, "pm2.json"), {
    apps: [
      {
        name: "vizoai-web",
        script: "./server.js",
        instances: "max",
        max_restarts: 3,
        restart_delay: 10000,
        exec_mode: "cluster",
        extra_env: ["./env.json"],
        exp_backoff_restart_delay: 100,
      },
    ],
  });
};

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
