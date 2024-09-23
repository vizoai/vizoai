import { useTranslation } from "react-i18next";
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Card, Space, Tag } from "antd";
import { useTheme } from "remix-themes";
import LocaleLink from "@/components/locale-link";
import { i18nServer } from "@/i18n/i18n.server";
import { tdk } from "@/utils/tdk";

export async function loader({ request }: LoaderFunctionArgs) {
  const t = await i18nServer.getFixedT(request);
  const title = t("common.title");
  return json({ title });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return tdk({ t: data?.title, d: "remix antd i18n demo" });
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const [theme] = useTheme();

  return (
    <div className="flex flex-col items-center gap-y-3">
      <div>{t("common.title")}</div>
      <div className="flex w-96 flex-col gap-y-4">
        <Card title={t("home.theme")}>
          <Space direction="vertical">
            <div className={"flex items-center"}>
              <div>当前主题：</div>
              <Tag>{theme}</Tag>
            </div>
          </Space>
        </Card>
        <Card title={t("home.language")}>
          <Space direction="vertical">
            <div>当前语言：{i18n.language}</div>
          </Space>
        </Card>
        <Card title={t("home.route")}>
          <Space direction="vertical">
            <LocaleLink to={"/user/login"}>跳转到登录页面</LocaleLink>
          </Space>
        </Card>
      </div>
    </div>
  );
}
