"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <MeshGradient
        className="w-full h-full"
        colors={["#fdf5f0", "#d5f0f4", "#ffffff", "#f5ddd1"]}
        speed={0.4}
      />
    </div>
  );
}
