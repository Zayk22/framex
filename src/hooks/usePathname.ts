"use client";

import { usePathname } from "next/navigation";

export function useIsWatchPage() {
  const pathname = usePathname();
  return pathname?.startsWith("/watch");
}