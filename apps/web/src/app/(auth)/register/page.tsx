import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Register",
});

export default function RegisterPage() {
  return <div>Register Page</div>;
}
