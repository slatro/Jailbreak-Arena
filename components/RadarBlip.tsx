"use client";

import { useState, useEffect } from "react";

interface BlipState {
  x: number;
  y: number;
  id: number;
  label: string;
}

export function RadarBlip() {
  const [blip, setBlip] = useState<BlipState>({
    x: 36,
    y: -30,
    id: 1,
    label: "TGT-01",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Pick random target coordinate within the 172px outer radar disk.
    // Disk diameter = 172px, radius R = 86px.
    // Safe radius: 22px to 62px to guarantee the blip and its expanding ping rings remain strictly inside the circle.
    const interval = setInterval(() => {
      const radius = 22 + Math.random() * 40; // 22px to 62px
      const angle = Math.random() * 2 * Math.PI;
      const x = Math.round(radius * Math.cos(angle));
      const y = Math.round(radius * Math.sin(angle));
      const labels = ["TGT-01", "SIG-AI", "OBJ-0x71", "RAD-2B", "ANOMALY"];
      const label = labels[Math.floor(Math.random() * labels.length)];

      setBlip({
        x,
        y,
        id: Date.now(),
        label,
      });
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div
      key={blip.id}
      className="radar-blip-target"
      style={{
        left: `calc(50% + ${blip.x}px)`,
        top: `calc(50% + ${blip.y}px)`,
      }}
      title={`Target detected at coordinates (${blip.x}, ${blip.y})`}
    >
      {/* Central glowing orange radar target dot */}
      <div className="radar-blip-dot" />

      {/* Expanding concentric sonar ping waves */}
      <div className="radar-blip-wave wave-1" />
      <div className="radar-blip-wave wave-2" />

      {/* Micro HUD label */}
      <span className="radar-blip-label">{blip.label}</span>
    </div>
  );
}
