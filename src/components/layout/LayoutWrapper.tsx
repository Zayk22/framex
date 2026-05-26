"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return <>{children}</>;
  }

  const isWatchPage = pathname?.startsWith("/watch");

  return (
    <>
      {!isWatchPage && <Header />}
      {children}
      {!isWatchPage && <Footer />}
    </>
  );
}