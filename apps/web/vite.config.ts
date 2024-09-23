import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import { vercelPreset } from "@vercel/remix/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { flatRoutes } from 'remix-flat-routes'

installGlobals();

export default defineConfig({
  build: {
    target: "ES2022",
  },
  server: {
    port: 3000,
  },
  plugins: [remix({
    presets: [vercelPreset()],
    ignoredRouteFiles: ['**/.*'],
    routes: async (defineRoutes) => flatRoutes('routes', defineRoutes),
  }), tsconfigPaths()],
});
