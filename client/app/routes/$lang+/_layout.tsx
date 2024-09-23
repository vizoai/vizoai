import { Outlet, type ShouldRevalidateFunctionArgs } from "@remix-run/react";
import i18next from "i18next";
import { resolveNamespace } from "@/i18n/i18n";
import SwitchTheme from "@/components/themes/switch-theme";
import SwitchLang from "@/components/i18n/switch-lang";

let url: URL;

export const shouldRevalidate = ({ nextUrl }: ShouldRevalidateFunctionArgs) => {
  url = nextUrl;
  return true;
};

export const clientLoader = async () => {
  if (url) {
    await window.asyncLoadResource?.(i18next.language, {
      namespaces: [...resolveNamespace(url.pathname)],
    });
  }
  return null;
};

export function HydrateFallback() {
  return null;
}

export default function Layout() {
  return (
    <div>
      <Outlet />
      <SwitchTheme />
      <SwitchLang />
    </div>
  );
}
