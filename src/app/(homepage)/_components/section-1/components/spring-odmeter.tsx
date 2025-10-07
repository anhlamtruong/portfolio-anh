import React from "react";
import { useSpring, animated } from "react-spring";
import { easeExpOut } from "d3-ease";
import { cn } from "@/lib/utils";
const SpringOdometer = ({
  endValue,
  className,
}: {
  endValue: number;
  className: string;
}) => {
  const props = useSpring({
    from: { number: 0 },
    to: { number: endValue },
    config: {
      tension: 180, // High tension to make it fast in the beginning
      friction: 60, // High friction to slow down at the end
      clamp: false,
      easing: easeExpOut, // Use easing function for smooth slow down
      duration: 5000, // Duration can be tweaked for overall effect
    },
  });

  return (
    <animated.div className={cn(className)}>
      {props.number.to((n) => Math.floor(n))}
    </animated.div>
  );
};

export default SpringOdometer;
