import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { isBrowser } from "browser-or-node";
import React from "react";
import { useChangeLanguage } from "remix-i18next/react";
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
import i18next, { localeCookie } from "./i18n/i18next.server";
import { useTranslation } from "react-i18next";

export async function loader({ request }: LoaderFunctionArgs) {
  let locale = await i18next.getLocale(request);

  return json(
    { locale },
    {
      headers: combineHeaders(
        {},
        {
          'Set-Cookie': await localeCookie.serialize(locale),
        },
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

function Document({ children, lang }: { children: React.ReactNode, lang: string }) {
  let { i18n } = useTranslation();

  return (
    <html lang={lang} dir={i18n.dir()}>
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

export default function App() {
  const { locale, } = useLoaderData<typeof loader>()
  console.log('locale', locale)
  useChangeLanguage(locale)

  return <Document lang={locale}><Outlet /></Document>;
}
