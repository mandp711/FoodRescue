"use client";

export function MeshBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, #dbeafe 0%, transparent 50%), " +
          "radial-gradient(ellipse at 80% 20%, #eff6ff 0%, transparent 50%), " +
          "radial-gradient(ellipse at 60% 80%, #e0f2fe 0%, transparent 50%), " +
          "#f8fafc",
      }}
    />
  );
}
