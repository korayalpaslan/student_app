import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../app/(auth)/Provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Öğrenci Değerlendirme Uygulaması",
  description: "Öğrenci Değerlendirme Uygulaması",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={roboto.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
