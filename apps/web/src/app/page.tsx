import { Button } from "antd";
import SwitchTheme from "../components/theme/switch-theme";
import Link from "next/link";
import { Views } from "../components/analytics/view";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Vizo
        </h1>
      </div>
      <Link href="/login">
        <Button type="primary">Login</Button>
      </Link>
      <Link href="/console">
        <Button type="primary">控制台</Button>
      </Link>
      <SwitchTheme />
      <Views />
    </main>
  );
}
