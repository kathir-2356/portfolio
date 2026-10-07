"use client";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { experience } from "@/data";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="py-28" aria-label="Work experience">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <span className="section-label" style={{ marginBottom: "16px" }}>Experience</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginTop: "12px", marginBottom: "48px" }}>
            Work <span className="gradient-text">Experience</span>
          </h2>
        </Reveal>

        <div style={{ position: "relative", paddingLeft: "48px" }}>
          <div className="timeline-line" aria-hidden="true" />

          {experience.map((exp, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ position: "relative", marginBottom: "32px" }}>
                {/* Timeline dot */}
                <div style={{
                  position: "absolute", left: "-48px", top: "24px",
                  width: "20px", height: "20px", borderRadius: "50%",
                  border: "2px solid var(--accent-blue)",
                  background: "var(--bg-primary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 12px rgba(59,130,246,0.4)",
                }} aria-hidden="true">
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-blue)" }} />
                </div>

                <div className="card-glow" style={{ padding: "28px 28px 24px" }}>
                  {/* Header */}
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "20px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Briefcase size={16} style={{ color: "var(--accent-blue)" }} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>{exp.role}</h3>
                          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--accent-blue)", marginTop: "2px" }}>{exp.company}</p>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        <Calendar size={11} /> {exp.period}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--text-muted)" }}>
                        <MapPin size={11} /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {exp.stack.map((tech) => (
                      <span key={tech} className="badge" style={{ fontSize: "11px" }}>{tech}</span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", background: "var(--border)", marginBottom: "20px" }} />

                  {/* Responsibilities */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {exp.responsibilities.map((r, ri) => (
                      <li key={ri} style={{ display: "flex", gap: "12px", fontSize: "14px", lineHeight: 1.65, color: "var(--text-secondary)" }}>
                        <span style={{ marginTop: "8px", width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent-blue)", flexShrink: 0, opacity: 0.7 }} aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
