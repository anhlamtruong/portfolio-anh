"use client";

import { useTRPC } from "@/app/(homepage)/_trpc/client";
import { PageContentLoading } from "@/components/ui/loading";
import { cn } from "@/lib/utils";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import React, { Suspense, useEffect, useRef } from "react";

interface CountingOdometerProps {
  amount?: number;
  className?: string;
}

const DIGITS = Array.from({ length: 10 }, (_, i) => i);
const EXTRA_ITERS = 3;
const TRANS_MS = 5000;

const CountingOdometer: React.FC<CountingOdometerProps> = ({
  amount = 4560000,
  className,
}) => {
  const tracks = useRef<(HTMLDivElement | null)[]>([]);

  const trpc = useTRPC();

  const updateViewMutation = useMutation(
    trpc.homepage.incrementPageView.mutationOptions({
      onError(error) {
        console.error("Error incrementing view count:", error);
      },
    })
  );
  const { data } = useSuspenseQuery(trpc.homepage.getPageView.queryOptions());

  useEffect(() => {
    updateViewMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      tracks.current.forEach((el, idx) => {
        if (!el) return;
        const digit = Number(data.count[idx]);
        const total = (idx + EXTRA_ITERS - 1) * 10 + digit;
        el.style.transform = `translateY(-${total * 8}rem)`;
        el.style.transition = `transform ${TRANS_MS}ms ease-in-out`;
      });
    }, 50);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.count]);

  return (
    <Suspense fallback={<PageContentLoading />}>
      <div className={cn(className, "flex items-center justify-start")}>
        <div className="flex">
          {Array.from(data.count).map((char, idx) => (
            <div
              key={`digit-${idx}`}
              className="relative h-[8rem] overflow-hidden"
            >
              <div
                className="flex flex-col items-start justify-start"
                ref={(el) => {
                  tracks.current[idx] = el;
                }}
              >
                {Array.from({ length: idx + EXTRA_ITERS }).flatMap((_, cycle) =>
                  DIGITS.map((d) => (
                    <span
                      key={`${idx}-${cycle}-${d}`}
                      className="h-[8rem] flex items-center justify-start"
                    >
                      {d}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default CountingOdometer;
