import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Агроусадьба Поместье «Русаково» — отдых у реки Ислочь | Воложинский район",
  description:
    "Агро эко усадьба «Русаково» в 78 км от Минска: домики у реки Ислочь и Налибокской пущи, баня на берегу, сибирский чан, рыбалка, байдарки, корпоративы и праздники. Бронь: +375 (29) 247-74-00.",
  openGraph: {
    title: "Поместье «Русаково» — место силы в Налибокской пуще",
    description:
      "Агроусадьба у реки Ислочь, 78 км от Минска. Домики, баня, чан, байдарки, ферма.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body
        className={`${cormorant.variable} ${inter.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
