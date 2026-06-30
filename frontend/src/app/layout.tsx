import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "IntelliOps AI — Industrial Knowledge Platform",
  description: "Unified Asset & Operations Brain powered by GraphRAG — real-time intelligence for industrial operations at Visakhapatnam Plant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className} style={{ background: '#020408', color: '#e8f4fd' }}>
        {children}
      </body>
    </html>
  );
}
