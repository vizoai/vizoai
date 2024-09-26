import { Dropdown, Button } from "antd";
import { useLocale } from "../../hooks/set-locale";

export function LanguageSwitch() {
  const [locale, setLocale] = useLocale()

  const langs = [
    { text: 'English', value: 'en' },
    { text: '简体中文', value: 'zh' },
  ]
  const formatLanguage = (lng: string) => langs.find((lang) => lang.value === lng)?.text

  return (
    <Dropdown
      menu={{
        selectedKeys: [locale],
        items: langs.map((lang) => ({
          key: lang.value,
          label: lang.text,
          onClick: () => {
            const nextLanguage = locale === 'en' ? 'zh' : 'en'
            setLocale(nextLanguage)
          }
        }))
      }}
    >
      <Button>
        {formatLanguage(locale!)}
      </Button>
    </Dropdown>
  );
}
