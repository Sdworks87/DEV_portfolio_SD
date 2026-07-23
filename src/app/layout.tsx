import type { Metadata } from "next";
import { inter, spaceGrotesk, jetbrainsMono } from "@/lib/fonts";
import { siteMetadata } from "@/lib/constants";
import LenisProvider from "@/providers/lenis-provider";
import { Navigation } from "@/components/layout/Navigation";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/sections/Preloader";
import "./globals.css";

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="bg-[#070707] text-white min-h-full flex flex-col font-sans">
        <Preloader />
        <Cursor />
        <LenisProvider>
          <Navigation />
          <main className="flex-grow flex flex-col relative z-0">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
