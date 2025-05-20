import React, { useEffect, useRef } from "react";

interface CashPrizeProps {
  amount?: number;
}

const DIGITS = Array.from({ length: 10 }, (_, i) => i);
const EXTRA_ITERS = 3;
const TRANS_MS = 5000;

const CashPrize: React.FC<CashPrizeProps> = ({ amount = 4560000 }) => {
  const tracks = useRef<(HTMLDivElement | null)[]>([]);
  const amountStr = amount.toString();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      tracks.current.forEach((el, idx) => {
        if (!el) return;
        const digit = Number(amountStr[idx]);
        const total = (idx + EXTRA_ITERS - 1) * 10 + digit;
        el.style.transform = `translateY(-${total * 8}rem)`;
        el.style.transition = `transform ${TRANS_MS}ms ease-in-out`;
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [amountStr]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex space-x-4">
        {Array.from(amountStr).map((char, idx) => (
          <div
            key={`digit-${idx}`}
            className="relative w-16 h-[8rem] overflow-hidden"
          >
            <div
              className="flex flex-col"
              ref={(el) => {
                tracks.current[idx] = el;
              }}
            >
              {Array.from({ length: idx + EXTRA_ITERS }).flatMap((_, cycle) =>
                DIGITS.map((d) => (
                  <span
                    key={`${idx}-${cycle}-${d}`}
                    className="h-[8rem] flex items-center justify-center text-primary text-[8rem]"
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

export default CashPrize;
