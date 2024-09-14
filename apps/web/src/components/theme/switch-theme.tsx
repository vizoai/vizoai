"use client";

import { Button, Dropdown } from "antd";
import { find } from "lodash";
import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo } from "react";

const themes = [
  {
    label: "Light",
    key: "light",
    icon: <Sun />,
  },
  {
    label: "Dark",
    key: "dark",
    icon: <Moon />,
  },
  {
    label: "System",
    key: "system",
    icon: <Computer />,
  },
];

const defaultTheme = themes[2]!;

const SwitchTheme = () => {
  const { setTheme, theme } = useTheme();
  const current = useMemo(
    () => find(themes, { key: theme }) ?? defaultTheme,
    [theme],
  );

  return (
    <Dropdown
      menu={{
        items: themes,
        selectedKeys: [current.key],
        onClick: ({ key }) => setTheme(key),
      }}
      placement="bottom"
    >
      <Button type="text" icon={current.icon} />
    </Dropdown>
  );
};

export default SwitchTheme;
