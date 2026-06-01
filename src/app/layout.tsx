import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/ui/Toast";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Happu TV | Stream Movies & TV Shows",
  description: "Watch your favorite movies, videos, and TV shows on Happu TV.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} ${playfair.variable} font-sans bg-matte-950 text-white antialiased`}
        >
          <ToastProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </ToastProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}