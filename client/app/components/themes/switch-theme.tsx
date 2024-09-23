"use client";

import { Button, Dropdown } from "antd";
import { find } from "lodash-es";
import { Computer, Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import { useMemo } from "react";

const themes = [
  {
    label: "Light",
    key: Theme.LIGHT,
    icon: <Sun />,
  },
  {
    label: "Dark",
    key: Theme.DARK,
    icon: <Moon />,
  },
];

const defaultTheme = themes[0]!;

const SwitchTheme = () => {
  const [theme, setTheme] = useTheme();

  const current = useMemo(
    () => find(themes, { key: theme! }) ?? defaultTheme,
    [theme],
  );

  return (
    <Dropdown
      menu={{
        items: themes,
        selectedKeys: [current.key as string],
        onClick: ({ key }) => setTheme(key as Theme),
      }}
      placement="bottom"
    >
      <Button type="text" icon={current.icon} />
    </Dropdown>
  );
};

export default SwitchTheme;
