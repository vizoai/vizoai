// @ts-ignore
import ncc from "@vercel/ncc";
import path from "path";
import * as fs from "fs-extra";

const bundleName = "index.js";

async function build() {
  const cwd = process.cwd();
  const targetPath = path.join(cwd, "build");
  fs.removeSync(targetPath);
  fs.ensureDirSync(targetPath);
  let { code, assets } = await ncc(path.join(cwd, "src/main.ts"), {
    minify: false,
    sourceMap: true,
    out: targetPath,
    cache: false,
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
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
