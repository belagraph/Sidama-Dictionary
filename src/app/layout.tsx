import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sidaamu Afoo Dictionary",
  description: "Explore Sidaamu Afoo through Amharic and English.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}