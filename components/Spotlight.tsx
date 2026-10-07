"use client";
import { useEffect, useRef } from "react";

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x, cy = y;
    let raf: number;

    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });

    const animate = () => {
      cx += (x - cx) * 0.08;
      cy += (y - cy) * 0.08;
      el.style.left = cx + "px";
      el.style.top = cy + "px";
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    el.style.opacity = "1";

    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0,
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 65%)",
        transition: "opacity 0.5s ease",
      }}
    />
  );
}
