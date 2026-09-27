import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "[name] // Aerospace Mecha Web Portfolio",
  description:
    "Futuristic cyber anime & aerospace developer portfolio of [name]. Full-stack web applications, mecha UI/UX, and high-performance engineering.",
  keywords: [
    "[name]",
    "Portfolio",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Anime Theme",
    "Cyberpunk UI",
    "Aerospace Web",
  ],
  authors: [{ name: "[name]" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#000000] text-white font-sans selection:bg-white selection:text-black">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
