"use client";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data";
import Reveal from "./Reveal";

const issuerColors: Record<string, string> = {
  "Forage": "#F59E0B",
  "Coursera": "#3B82F6",
  "Microsoft": "#0EA5E9",
  "Linux Foundation": "#EAB308",
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-28" aria-label="Certifications">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <span className="section-label" style={{ marginBottom: "16px" }}>Certifications</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginTop: "12px", marginBottom: "48px" }}>
            Certifications &amp; <span className="gradient-text">Training</span>
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {certifications.map((cert, i) => {
            const color = issuerColors[cert.issuer] ?? "#3B82F6";
            return (
              <Reveal key={cert.title} delay={i * 80}>
                <div
                  className="card"
                  style={{ padding: "24px", height: "100%", display: "flex", flexDirection: "column" }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: "12px",
                    background: `${color}12`, border: `1px solid ${color}28`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "16px",
                  }}>
                    <Award size={20} style={{ color }} />
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.5, marginBottom: "12px", flex: 1 }}>
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600,
                      color, padding: "3px 10px", borderRadius: "100px",
                      background: `${color}10`, border: `1px solid ${color}25`,
                    }}>
                      {cert.issuer}
                    </span>
                    <ExternalLink size={13} style={{ color: "var(--text-muted)" }} />
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
