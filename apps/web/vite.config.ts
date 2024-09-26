import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import { vercelPreset } from "@vercel/remix/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { flatRoutes } from "remix-flat-routes";
import { remixDevTools } from "remix-development-tools";

installGlobals();

export default defineConfig({
  build: {
    target: "esnext",
  },
  server: {
    port: 3000,
  },
  plugins: [
    remixDevTools(),
    remix({
      presets: [vercelPreset()],
      ignoredRouteFiles: ["**/.*"],
      routes: async (r) => flatRoutes("routes", r),
    }),
    tsconfigPaths(),
  ],
});
