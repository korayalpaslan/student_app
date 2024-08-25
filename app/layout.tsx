import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
import localfont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./AuthProvider";
import { UiProvider } from "./UiProvider";
import { Toaster } from "@/components/ui/toaster";

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "700"],
//   variable: "--font-roboto",
// });
const custom_font = localfont({
  src: [
    {
      path: "../public/fonts/NeueMontreal-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Regular.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-custom",
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
        <body className={`${custom_font.variable}`}>
          {" "}
          <UiProvider>{children}</UiProvider>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
