import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { headers } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Readify",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();
  const pathname = headerList.get("x-pathname");

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={`${pathname === "/" ? "wrapper" : ""}`}>
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
