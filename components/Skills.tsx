"use client";
import { useState } from "react";
import { skillGroups } from "@/data";
import Reveal from "./Reveal";

const categoryColors: Record<string, string> = {
  "Programming": "#3B82F6",
  "Backend": "#8B5CF6",
  "Cloud & DevOps": "#06B6D4",
  "AWS Services": "#F59E0B",
  "Databases": "#10B981",
  "AI / ML": "#EC4899",
  "CS Foundations": "#6366F1",
  "Developer & AI Tools": "#64748B",
};

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <section id="skills" className="py-28" aria-label="Technical skills">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <span className="section-label" style={{ marginBottom: "16px" }}>Skills</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginTop: "12px", marginBottom: "12px" }}>
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "48px", fontFamily: "var(--font-mono)" }}>
            // hover to explore each category
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {skillGroups.map((group, gi) => {
            const color = categoryColors[group.category] ?? "#3B82F6";
            const isActive = activeGroup === group.category;
            return (
              <Reveal key={group.category} delay={gi * 50}>
                <div
                  className="card"
                  style={{
                    padding: "20px",
                    cursor: "default",
                    borderColor: isActive ? `${color}40` : "var(--border)",
                    boxShadow: isActive ? `0 0 24px ${color}15` : "none",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={() => setActiveGroup(group.category)}
                  onMouseLeave={() => setActiveGroup(null)}
                >
                  {/* Category header */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 8px ${color}` }} />
                    <h3 style={{ fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: isActive ? color : "var(--text-muted)", transition: "color 0.2s" }}>
                      {group.category}
                    </h3>
                  </div>

                  {/* Badges */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="badge"
                        style={isActive ? { borderColor: `${color}40`, color: color, background: `${color}0D` } : {}}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
