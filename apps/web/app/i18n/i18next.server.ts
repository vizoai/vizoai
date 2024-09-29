import { resolve } from "node:path";
import { RemixI18Next } from "remix-i18next/server";
import i18n from "../i18n";
import Backend from "i18next-fs-backend";
import createCookie from "~/lib/cookie";
import { Cookie } from "@remix-run/server-runtime";
import { cookieName, cookieOptions } from "./i18next.cookie";

export const localeCookie = createCookie(cookieName, cookieOptions)

export function createLocaleCookieResolver(localeCookie: Cookie) {
  const resolver = async (request: Request) => {
    const cookie = await localeCookie.parse(request.headers.get('Cookie'))

    return {
      getLocale: () => {
        return cookie || i18n.fallbackLng
      },
      setLocale: async (locale: string) => {
        return {
          'Set-Cookie': await localeCookie.serialize(locale),
        }
      },
    }
  }
  return resolver
}

let i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    cookie: localeCookie,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
    },
    // interpolation: {
    //   escapeValue: false,
    // },
  },
  // The i18next plugins you want RemixI18next to use for `i18n.getFixedT` inside loaders and actions.
  // E.g. The Backend plugin for loading translations from the file system
  // Tip: You could pass `resources` to the `i18next` configuration and avoid a backend here
  plugins: [Backend],
});

export default i18next;