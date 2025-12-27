import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "./providers/query-client-provider";
import NetworkBackground from "../components/NetworkBackground";
import RightSidebar from "../components/RightSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blix - Element Crafting Game",
  description: "Combine elements, discover magic. Start with Water, Fire, Wind, and Earth—then craft your way to infinite possibilities. Free online crafting game inspired by Infinite Craft.",
  keywords: ["element crafting", "infinite craft", "puzzle game", "browser game", "free game", "element combinations"],
  authors: [{ name: "Blix" }],
  creator: "Blix",
  publisher: "Blix",
  openGraph: {
    title: "Blix - Element Crafting Game",
    description: "Combine elements and discover infinite possibilities. Free online crafting game.",
    url: "https://blix-beige.vercel.app",
    siteName: "Blix",
    type: "website",
    images: [
      {
        url: "/Blixlogo.ico",
        width: 32,
        height: 32,
        alt: "Blix Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Blix - Element Crafting Game",
    description: "Combine elements and discover infinite possibilities.",
    images: ["/Blixlogo.ico"],
  },
  icons: {
    icon: "/Blixlogo.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" 
          rel="stylesheet" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NetworkBackground />
        <QueryClientProvider>
          <div className="lg:pr-80 pb-24 lg:pb-0">
            {children}
          </div>
          <RightSidebar />
        </QueryClientProvider>
      </body>
    </html>
  );
}
