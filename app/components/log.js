"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Logger() {
  const pathname = usePathname();
  const logsRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (logsRef.current.length === 0) return;

      const batch = logsRef.current.splice(0, logsRef.current.length);
      fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batch }),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!pathname) return;
    logsRef.current.push({ route: pathname, timestamp: Date.now() });
  }, [pathname]);

  return null;
}
