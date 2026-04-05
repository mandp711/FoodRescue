"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function buildPaths(position: number) {
  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 8 * position} -${189 + i * 10}C-${
      380 - i * 8 * position
    } -${189 + i * 10} -${312 - i * 8 * position} ${216 - i * 10} ${
      152 - i * 8 * position
    } ${343 - i * 10}C${616 - i * 8 * position} ${470 - i * 10} ${
      684 - i * 8 * position
    } ${875 - i * 10} ${684 - i * 8 * position} ${875 - i * 10}`,
    width: 0.7 + i * 0.1,
  }));
}

function PathSet({ position }: { position: number }) {
  const paths = buildPaths(position);
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="#60a5fa"
          strokeWidth={path.width}
          strokeOpacity={0.2 + path.id * 0.035}
          initial={{ pathLength: 0, opacity: 0, pathOffset: 0 }}
          animate={{
            pathLength: 1,
            opacity: [0.4, 0.7, 0.4],
            pathOffset: [0, 1],
          }}
          transition={{
            pathLength: { duration: 2 + path.id * 0.2, ease: "easeOut" },
            opacity: { duration: 6 + path.id * 0.5, repeat: Infinity, ease: "easeInOut" },
              pathOffset: { duration: 10 + path.id * 0.8, repeat: Infinity, ease: "linear" },
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
        <PathSet position={position} />
      </div>
      {children}
    </div>
  );
}
