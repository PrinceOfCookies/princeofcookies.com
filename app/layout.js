import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../lib/fontawesome";
import Logger from "./components/log";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio - PrinceOfCookies",
  description: "PrinceOfCookies - Developer & content creator working with mainly Lua and JavaScript",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Logger />
        {children}
        <Footer />
      </body>
    </html>
  );
}
