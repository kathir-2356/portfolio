"use client";
import { GraduationCap, MapPin, Calendar, Star } from "lucide-react";
import { education } from "@/data";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="py-28" aria-label="Education">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <span className="section-label" style={{ marginBottom: "16px" }}>Education</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginTop: "12px", marginBottom: "48px" }}>
            Education
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="card-glow"
            style={{ padding: "36px", maxWidth: "680px", position: "relative", overflow: "hidden" }}
          >
            {/* Background glow */}
            <div style={{
              position: "absolute", top: "-60px", right: "-60px",
              width: "240px", height: "240px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }} aria-hidden="true" />

            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", position: "relative" }}>
              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: "14px", flexShrink: 0,
                background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <GraduationCap size={24} style={{ color: "#3B82F6" }} />
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px", letterSpacing: "-0.02em" }}>
                  {education.institution}
                </h3>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent-blue)", marginBottom: "16px" }}>
                  {education.degree}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
                    <Calendar size={13} style={{ color: "var(--text-muted)" }} />
                    {education.period}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--text-secondary)" }}>
                    <MapPin size={13} style={{ color: "var(--text-muted)" }} />
                    {education.location}
                  </span>
                </div>

                {/* CGPA badge */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  padding: "12px 20px", borderRadius: "12px",
                  background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)",
                }}>
                  <Star size={15} style={{ color: "#10B981" }} />
                  <div>
                    <p style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "2px" }}>CGPA</p>
                    <p style={{ fontSize: "22px", fontWeight: 800, color: "#10B981", lineHeight: 1, letterSpacing: "-0.03em" }}>
                      {education.cgpa}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
