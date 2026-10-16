"use client";

import { useEffect, useState } from "react";

/** Footer copyright year — resolved on the client so pages stay prerenderable. */
export default function CurrentYear() {
  const [year, setYear] = useState(2026);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setYear(new Date().getFullYear());
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return <>{year}</>;
}
