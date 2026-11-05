"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "portfolio-visit-counted";

// One request per page load, shared by every counter on the page. The visit
// is counted once per browser session; later loads only read the total.
let request: Promise<number | null> | null = null;

function loadCount(): Promise<number | null> {
  if (!request) {
    const counted = sessionStorage.getItem(SESSION_KEY) === "1";
    request = fetch("/api/public/views", { method: counted ? "GET" : "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: number } | null) => {
        if (typeof data?.count === "number" && data.count > 0) {
          sessionStorage.setItem(SESSION_KEY, "1");
          return data.count;
        }
        return null;
      })
      .catch(() => null);
  }
  return request;
}

// The slot keeps a fixed width so the number never shifts the layout.
export function ViewCounter({ className }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    loadCount().then((value) => {
      if (active) setCount(value);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        minWidth: "6ch",
        fontVariantNumeric: "tabular-nums",
      }}
      aria-label={count === null ? "Visit count" : `${count} visits`}
    >
      {count === null ? "·····" : count.toLocaleString("en-US")}
    </span>
  );
}
