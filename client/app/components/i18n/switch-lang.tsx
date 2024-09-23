"use client";

import { Button, Dropdown } from "antd";
import { find } from "lodash-es";
import { Moon, Languages } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const langs = [
  {
    label: "English",
    key: "en",
  },
  {
    label: "简体中文",
    key: "zh",
  },
];

const defaultLang = langs[0]!;

const SwitchLang = () => {
  const { t, i18n } = useTranslation();

  const current = useMemo(
    () => find(langs, { key: i18n.language! }) ?? defaultLang,
    [i18n.language],
  );

  const changeLang = (key: string) => {
    i18n.changeLanguage(key);
  };

  return (
    <Dropdown
      menu={{
        items: langs,
        selectedKeys: [current.key],
        onClick: ({ key }) => changeLang(key),
      }}
      placement="bottom"
    >
      <Button type="text">
        <Languages />
      </Button>
    </Dropdown>
  );
};

export default SwitchLang;
