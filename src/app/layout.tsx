import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sidaamu Afoo Spoken Language Guide",
  description: "Learn everyday spoken expressions in English, Sidaamu Afoo and Amharic.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}