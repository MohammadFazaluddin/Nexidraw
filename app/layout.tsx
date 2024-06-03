import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "NexiDraw",
  description: "Draw and paint with imagination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}
