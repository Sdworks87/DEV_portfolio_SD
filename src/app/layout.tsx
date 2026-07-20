import type { Metadata } from "next";
import { inter, spaceGrotesk, jetbrainsMono } from "@/lib/fonts";
import { siteMetadata } from "@/lib/constants";
import LenisProvider from "@/providers/lenis-provider";
import { Navigation } from "@/components/layout/Navigation";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-primary selection:text-background font-sans">
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
