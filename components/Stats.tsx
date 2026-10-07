"use client";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/data";
import Reveal from "./Reveal";

function StatItem({ value, label }: { value: string; label: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ textAlign: "center", padding: "32px 24px" }}>
      <div
        className="stat-number"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
      >
        {value}
      </div>
      <p style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginTop: "8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section aria-label="Quick stats" style={{ padding: "0 0 16px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            position: "relative",
          }} className="stats-grid">
            {/* Shimmer overlay */}
            <div className="shimmer" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, borderRadius: "16px" }} aria-hidden="true" />
            {stats.map((stat, i) => (
              <div key={stat.label} style={{ borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none", position: "relative", zIndex: 1 }}>
                <StatItem value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
