import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Login",
});

export default function LoginPage() {
  return <div>Login Page</div>;
}
