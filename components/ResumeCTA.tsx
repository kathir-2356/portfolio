"use client";
import { Download, FileText, ArrowRight } from "lucide-react";
import { personal } from "@/data";
import Reveal from "./Reveal";

export default function ResumeCTA() {
  return (
    <section className="py-16" aria-label="Resume download">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{
            borderRadius: "20px",
            padding: "56px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background: "var(--bg-card)",
            border: "1px solid var(--border-accent)",
            boxShadow: "var(--glow-blue)",
          }}>
            {/* Animated gradient background */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)",
            }} aria-hidden="true" />
            <div style={{
              position: "absolute", top: "-80px", left: "-80px",
              width: "300px", height: "300px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
              filter: "blur(30px)", pointerEvents: "none",
            }} aria-hidden="true" />
            <div style={{
              position: "absolute", bottom: "-80px", right: "-80px",
              width: "300px", height: "300px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
              filter: "blur(30px)", pointerEvents: "none",
            }} aria-hidden="true" />

            <div style={{ position: "relative" }}>
              <div style={{
                width: 52, height: 52, borderRadius: "14px",
                background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <FileText size={22} style={{ color: "#3B82F6" }} />
              </div>

              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                Want the complete picture?
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "440px", margin: "0 auto 32px", lineHeight: 1.72 }}>
                Download my resume to explore my technical experience, projects, education, and skills.
              </p>

              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href={personal.resumePath} target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label="Download resume PDF">
                  <Download size={15} /> Download Resume
                </a>
                <a href="#contact" className="btn-secondary">
                  Get in Touch <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
