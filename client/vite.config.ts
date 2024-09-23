import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import { preset } from "vite-config-preset";
import { envOnlyMacros } from "vite-env-only";
import { i18nAlly } from "vite-plugin-i18n-ally";
import { vercelPreset } from "@vercel/remix/vite";
import { remixFlatRoutes } from "vite-plugin-remix-flat-routes";

installGlobals();

export default defineConfig((env) => {
  const ignoredRouteFiles = [
    "**/components/**",
    "**/hooks/**",
    "**/images/**",
    "**/utils/**",
    "**/*.css",
    "**/meta.*",
  ];
  return preset(
    {
      env,
      server: {
        port: 3000,
      },
      plugins: [
        i18nAlly({
          localesPaths: ["public/locales"],
          namespace: true,
        }),
        envOnlyMacros(),
        remix({
          routes: (routes) =>
            flatRoutes("routes", routes, { ignoredRouteFiles }),
          presets: [vercelPreset()],
        }),
        remixFlatRoutes({
          flatRoutesOptions: {
            ignoredRouteFiles,
          },
        }),
      ],
    },
    {
      react: false,
    },
  );
});
