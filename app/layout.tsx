import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "База отдыха",
  description: "Домики и баня для отдыха",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
