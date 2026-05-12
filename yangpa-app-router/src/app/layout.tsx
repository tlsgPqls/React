import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <header>
        <Link href={"/"}>홈</Link> &nbsp;&nbsp;
        <Link href={"/search"}>검색</Link> &nbsp;&nbsp;
        <Link href={"/sale/1"}>1번 상품</Link> &nbsp;&nbsp;
      </header>
      <body>{children}</body>
    </html>
  );
}
