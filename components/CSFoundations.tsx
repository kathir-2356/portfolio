"use client";
import { GitBranch, Layers, Database, Cpu, Network } from "lucide-react";
import { csFoundations } from "@/data";
import Reveal from "./Reveal";

const icons = { dsa: GitBranch, oop: Layers, dbms: Database, os: Cpu, networks: Network };
const colors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#06B6D4"];

export default function CSFoundations() {
  return (
    <section className="py-28" aria-label="Computer Science Foundations">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <span className="section-label" style={{ marginBottom: "16px" }}>Foundations</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginTop: "12px", marginBottom: "48px" }}>
            Computer Science <span className="gradient-text">Foundations</span>
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
          {csFoundations.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons];
            const color = colors[i % colors.length];
            return (
              <Reveal key={item.title} delay={i * 70}>
                <div
                  className="card"
                  style={{ padding: "22px", height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: "10px",
                    background: `${color}12`, border: `1px solid ${color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "14px",
                  }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px", lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6, flex: 1 }}>
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
