// @ts-ignore
import ncc from "@vercel/ncc";
import path from "node:path";
import * as fs from "fs-extra";
import dotenv from "dotenv";

const bundleName = "index.js";

async function build() {
  const cwd = process.cwd();
  const targetPath = path.join(cwd, "build");
  fs.removeSync(targetPath);
  fs.ensureDirSync(targetPath);
  const { code, assets } = await ncc(path.join(cwd, "src/main.ts"), {
    minify: false,
    sourceMap: true,
    out: targetPath,
    cache: true,
    externals: [],
    // target: 'es5',
    assetsBuilds: false,
  });

  // copy assets
  for (const assetKey of Object.keys(assets)) {
    const asset = assets[assetKey];
    const data = asset.source;
    const fileTarget = path.join(targetPath, assetKey);
    fs.ensureDirSync(path.dirname(fileTarget));
    fs.writeFileSync(fileTarget, data);
  }

  // write code to package
  const outfile = path.join(targetPath, bundleName);
  fs.ensureDirSync(path.dirname(outfile));
  fs.writeFileSync(path.join(targetPath, bundleName), code, "utf-8");
  console.log("build success");

  // output
  const output = path.join("../../build/api");
  fs.removeSync(output);
  fs.copySync(path.join(cwd, "build"), output);

  const config = dotenv.config({ path: "../../.env" });
  fs.writeJSONSync(path.join(output, "package.json"), {
    type: "commonjs",
  });
  fs.writeJSONSync(path.join(output, "pm2.json"), {
    apps: [
      {
        name: "vizoai-api",
        script: "./index.js",
        instances: "max",
        max_restarts: 3,
        restart_delay: 10000,
        exec_mode: "cluster",
        env: config.parsed,
        exp_backoff_restart_delay: 100,
      },
    ],
  });
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
