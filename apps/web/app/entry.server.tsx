import { PassThrough } from "node:stream";
import React from "react";
import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { renderToPipeableStream } from "react-dom/server";
import { antdStyle } from "./components/antd/const";

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  const isBot = isBotRequest(request.headers.get("user-agent"));

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const cache = createCache();
    let isStyleExtracted = false;

    const { pipe, abort } = renderToPipeableStream(
      <StyleProvider cache={cache}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </StyleProvider>,
      {
        onAllReady() {
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
