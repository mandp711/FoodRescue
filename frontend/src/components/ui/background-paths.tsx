"use client";

import { motion } from "framer-motion";

function HeroPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 18 }, (_, i) => ({
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

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
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
    </div>
  );
}

export function BackgroundPaths({
  title = "Background Paths",
  children,
}: {
  title?: string;
  bare?: boolean;
  children?: React.ReactNode;
}) {
  const words = title.split(" ");

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <HeroPaths position={1} />

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
