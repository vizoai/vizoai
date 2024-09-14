import { ThemeProvider as NextThemeProvider } from "next-themes";
import { FC, type PropsWithChildren } from "react";
import AntdRegistry from "../antd-registry";

export const ThemeProvider: FC<PropsWithChildren> = (
  props: PropsWithChildren,
) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="theme"
    >
      <AntdRegistry>{props.children}</AntdRegistry>
    </NextThemeProvider>
  );
};
