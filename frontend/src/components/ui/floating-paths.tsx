"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function buildPaths(position: number) {
  return Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));
}

function PathSet({ position, durationOffset = 0 }: { position: number; durationOffset?: number }) {
  const paths = buildPaths(position);
  return (
    <svg
      className="w-full h-full text-teal"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={0.07 + path.id * 0.018}
          initial={{ pathLength: 0.3, opacity: 0.6 }}
          animate={{
            pathLength: 1,
            opacity: [0.3, 0.6, 0.3],
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration: 20 + durationOffset + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  );
}

export function FloatingPathsBackground({
  position,
  children,
  className,
}: {
  position: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("w-full relative", className)}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Forward paths */}
        <div className="absolute inset-0">
          <PathSet position={position} durationOffset={0} />
        </div>
        {/* Inverted duplicate — mirrors horizontally, staggered timing */}
        <div className="absolute inset-0 opacity-60">
          <PathSet position={-position} durationOffset={5} />
        </div>
      </div>
      {children}
    </div>
  );
}
