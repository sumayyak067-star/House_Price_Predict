"use client";

import { useEffect, useState } from "react";

/** Returns true after client hydration — avoids theme/UI mismatches */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
