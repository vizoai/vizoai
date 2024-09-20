"use client";

import { Dropdown, Button, Menu } from "@arco-design/web-react";
import { find } from "lodash";
import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo } from "react";
import { Icon } from "../acro-design/icon";

const themes = [
  {
    label: "Light",
    key: "light",
    icon: <Icon icon={Sun} />,
  },
  {
    label: "Dark",
    key: "dark",
    icon: <Icon icon={Moon} />,
  },
  {
    label: "System",
    key: "system",
    icon: <Icon icon={Computer} />,
  },
];

const defaultTheme = themes[2]!;

const SwitchTheme = () => {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const current = useMemo(
    () => find(themes, { key: theme }) ?? defaultTheme,
    [theme],
  );

  useEffect(
    () => document.body.setAttribute('arco-theme', resolvedTheme === 'dark' ? 'dark' : 'light'),
    [resolvedTheme],
  )

  return (
    <Dropdown
      position="bottom"
      droplist={
        <Menu onClickMenuItem={(key) => setTheme(key)} selectedKeys={[current.key]}>
          {themes.map(item => (
            <Menu.Item key={item.key}>{item.icon} {item.label}</Menu.Item>
          ))}
        </Menu>
      }
      trigger="click"
    >
      <Button type='text' icon={current.icon}></Button>
    </Dropdown>
  );
};

export default SwitchTheme;
