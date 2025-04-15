import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { AuthProvider } from "@/context/AuthContext";
import StoreProvider from "@/lib/redux/StoreProvider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    absolute: "Home | Readify",
    default: "Readify",
    template: "%s | Readify",
  },
  description:
    "Web app enabling smooth EPUB file uploads for an enhanced e-book reading experience. Users can seamlessly read and take notes, enhancing engagement and personalization.",
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
        <div
          className={`${
            pathname === "/" || pathname === "/signin" || pathname === "/signup"
              ? "wrapper"
              : "root"
          }`}
        >
          <AuthProvider>
            <StoreProvider>{children}</StoreProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
