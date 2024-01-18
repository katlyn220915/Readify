import { Roboto, Literata, Inter, Noto_Serif } from "next/font/google";

export const literata = Literata({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-literata",
  display: "swap",
});

export const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const roboto = Roboto({
  weight: ["400", "700"],
  variable: "--font-roboto",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
