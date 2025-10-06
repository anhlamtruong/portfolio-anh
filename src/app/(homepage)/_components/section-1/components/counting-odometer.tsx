"use client";

import { useTRPC } from "@/app/(homepage)/_trpc/client";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";

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

  const [amountStr, setAmountStr] = React.useState("0");

  const trpc = useTRPC();

  const updateViewMutation = useMutation(
    trpc.homepage.getAndIncrementView.mutationOptions({
      onSuccess(data) {
        setAmountStr(data.count.toString());
        // console.log(`This is the ${data} visit!`);
      },
      onError(error) {
        setAmountStr(amount.toString());
        console.error("Error incrementing view count:", error);
      },
    })
  );
  useEffect(() => {
    updateViewMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (amountStr === "0") {
      return;
    }
    const timer = window.setTimeout(() => {
      tracks.current.forEach((el, idx) => {
        if (!el) return;
        const digit = Number(amountStr[idx]);
        const total = (idx + EXTRA_ITERS - 1) * 10 + digit;
        el.style.transform = `translateY(-${total * 8}rem)`;
        el.style.transition = `transform ${TRANS_MS}ms ease-in-out`;
      });
    }, 50);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountStr]);

  return (
    <div className={cn(className, "flex items-center justify-start")}>
      <div className="flex">
        {Array.from(amountStr).map((char, idx) => (
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
  );
};

export default CountingOdometer;
