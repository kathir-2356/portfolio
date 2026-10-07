"use client";
import { useEffect, useRef } from "react";
import { Server, Cloud, Brain, MapPin, GraduationCap } from "lucide-react";
import { personal, education } from "@/data";
import Reveal from "./Reveal";

const focusAreas = [
  { icon: Server, label: "Backend Engineering", desc: "REST APIs, microservices, Python, Java, FastAPI, Spring Boot", color: "#3B82F6", pct: 85 },
  { icon: Cloud, label: "Cloud & Automation", desc: "AWS, Terraform, Docker, CI/CD, Infrastructure as Code", color: "#8B5CF6", pct: 78 },
  { icon: Brain, label: "AI Systems", desc: "LLMs, RAG pipelines, embeddings, vector search, pgvector", color: "#06B6D4", pct: 70 },
];

function SkillBar({ pct, color }: { pct: number; color: string }) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transform = `scaleX(${pct / 100})`;
        observer.unobserve(el);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [pct]);

  return (
    <div className="skill-bar-track" style={{ marginTop: "8px" }}>
      <div
        ref={fillRef}
        className="skill-bar-fill"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}99)`, transition: "transform 1.2s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-28" aria-label="About section">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <span className="section-label" style={{ marginBottom: "16px" }}>About</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginTop: "12px", marginBottom: "48px" }}>
            Engineering with a <span className="gradient-text">backend-first</span> mindset.
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "start" }} className="about-grid">
          {/* Left: Bio */}
          <Reveal>
            <div>
              <p style={{ fontSize: "15px", lineHeight: 1.82, color: "var(--text-secondary)", marginBottom: "20px" }}>
                I&apos;m a final-year B.Tech Information Technology student focused on backend engineering, cloud automation, and AI-driven software systems.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.82, color: "var(--text-secondary)", marginBottom: "32px" }}>
                My primary interests are designing APIs, building scalable backend services, automating infrastructure, working with cloud platforms, and integrating modern AI technologies into practical software systems. I enjoy understanding how systems work behind the interface — from APIs and databases to infrastructure, deployment, monitoring, and intelligent automation.
              </p>

              {/* Info cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <GraduationCap size={16} style={{ color: "var(--accent-blue)", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{education.institution}</p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{education.degree} · CGPA {education.cgpa}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <MapPin size={16} style={{ color: "var(--accent-violet)", flexShrink: 0 }} />
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{personal.location}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Focus areas with skill bars */}
          <Reveal delay={150}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {focusAreas.map((area) => (
                <div key={area.label} className="card" style={{ padding: "20px 22px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: `${area.color}15`, border: `1px solid ${area.color}28`, flexShrink: 0 }}>
                      <area.icon size={18} style={{ color: area.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>{area.label}</h3>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>{area.pct}%</span>
                      </div>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "10px" }}>{area.desc}</p>
                      <SkillBar pct={area.pct} color={area.color} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
