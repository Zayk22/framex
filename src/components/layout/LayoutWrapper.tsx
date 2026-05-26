"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isWatchPage = pathname?.startsWith("/watch");

  return (
    <>
      {!isWatchPage && <Header />}
      {children}
      {!isWatchPage && <Footer />}
    </>
  );
}