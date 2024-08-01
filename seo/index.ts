import type { Metadata } from "next";

const title = "Awesome QA Tool";
const description = "It's awesome 🤘🏻";
const url = process.env.NEXT_PUBLIC_BASE_DOMAIN;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(url),
  authors: { name: "Soham Mondal", url: new URL("https://sohammondal.com") },
  alternates: { canonical: "/" },
  keywords: [...title.split(" ")],
  openGraph: {
    title,
    description,
    images: [],
    url: "/",
    siteName: title,
    type: "website",
  },
  twitter: {
    title,
    description,
    images: [],
    site: "@sohammondal_",
    creator: "@sohammondal_",
  },
};
