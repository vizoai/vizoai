import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { isBrowser } from "browser-or-node";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { isDev } from "./utils/env";
import { antdStyle } from "./components/antd/const";
import globalCss from "./styles/global.css?url";
import {
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/react";
import { combineHeaders } from "./utils/misc.server";
import { siteConfig } from "./const/site";

export async function loader({ request, params }: LoaderFunctionArgs) {
  return json(
    {},
    {
      headers: combineHeaders(
        {},
        // { "Set-Cookie": await localeCookie.serialize(locale) },
        // csrfCookieHeader ? { "Set-Cookie": csrfCookieHeader } : null,
      ),
    },
  );
}

export const meta: MetaFunction<typeof loader> = () => {
  return [
    { title: siteConfig.title },
    {
      name: "description",
      content: siteConfig.description,
    },
    {
      name: "keyword",
      content: siteConfig.keyword,
    },
  ];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalCss }];
};

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {!isBrowser && !isDev() && antdStyle}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return <Document>{children}</Document>;
}

export default function App() {
  return <Outlet />;
}
