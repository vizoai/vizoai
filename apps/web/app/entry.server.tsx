import { PassThrough } from "node:stream";
import React from "react";
import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { renderToPipeableStream } from "react-dom/server";
import { antdStyle } from "./components/antd/const";
import i18n from "./i18n";
import { createInstance } from "i18next";
import i18neServer, { i18nServerOptions } from './i18n/i18next.server'
import { I18nextProvider, initReactI18next } from "react-i18next";
import { resolve } from "node:path";
import Backend from 'i18next-fs-backend';

const ABORT_DELAY = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const isBot = isBotRequest(request.headers.get("user-agent"));

  const callbackName = isBot ? "onAllReady" : "onShellReady";

  const i18nInstance = createInstance();
  const lng = await i18neServer.getLocale(request);
  // const ns = i18neServer.getRouteNamespaces(remixContext);
  console.log('locale', lng)

  await i18nInstance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .init({
      ...i18nServerOptions, // spread the configuration
      lng, // The locale we detected above
      ns: i18nServerOptions.resources[lng]
        ? Object.keys(i18nServerOptions.resources[lng])
        : [...i18nServerOptions.defaultNS],
    });

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const cache = createCache();
    let isStyleExtracted = false;

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18nInstance} defaultNS={i18nServerOptions.defaultNS}>
        <StyleProvider cache={cache}>
          <RemixServer
            context={remixContext}
            url={request.url}
            abortDelay={ABORT_DELAY}
          />
        </StyleProvider>
      </I18nextProvider>,
      {
        [callbackName]: () => {
          shellRendered = true;
          const body = new PassThrough({
            transform(c, _, callback) {
              let chunk = c.toString();
              if (!isStyleExtracted) {
                const str: string = chunk.toString();
                if (str.includes(antdStyle)) {
                  chunk = str.replace(
                    antdStyle,
                    isBot ? "" : extractStyle(cache),
                  );
                  isStyleExtracted = true;
                }
              }
              callback(null, chunk);
            },
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );
          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

// We have some Remix apps in the wild already running with isbot@3 so we need
// to maintain backwards compatibility even though we want new apps to use
// isbot@4.  That way, we can ship this as a minor Semver update to @remix-run/dev.
function isBotRequest(userAgent: string | null) {
  if (!userAgent) {
    return false;
  }

  // isbot >= 3.8.0, >4
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }

  // isbot < 3.8.0
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }

  return false;
}
