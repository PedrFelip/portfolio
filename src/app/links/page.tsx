import type { Metadata } from "next";
import LinksClient from "./LinksClient";

export const metadata: Metadata = {
  title: "Pedro Felipe - Links",
  description: "Connect with me on social media and professional platforms",
};

export default function LinksPage() {
  return <LinksClient />;
}
