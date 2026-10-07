"use client";
import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import { projects } from "@/data";
import Reveal from "./Reveal";
import ProjectModal from "./ProjectModal";

type Project = (typeof projects)[number];

const projectColors: Record<string, { primary: string; secondary: string }> = {
  autoinfra: { primary: "#3B82F6", secondary: "#8B5CF6" },
  tracelens: { primary: "#8B5CF6", secondary: "#06B6D4" },
  nexavren: { primary: "#10B981", secondary: "#3B82F6" },
};

function FeaturedCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const colors = projectColors[project.id] ?? { primary: "#3B82F6", secondary: "#8B5CF6" };

  return (
    <div
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      aria-label={`View ${project.name} case study`}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${colors.primary}28`,
        borderRadius: "18px",
        padding: "32px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 60px ${colors.primary}18`;
        el.style.borderColor = `${colors.primary}50`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        el.style.borderColor = `${colors.primary}28`;
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "300px", height: "300px",
        background: `radial-gradient(circle at top right, ${colors.primary}08, transparent 70%)`,
        pointerEvents: "none",
      }} aria-hidden="true" />

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, boxShadow: `0 0 10px ${colors.primary}60` }} />
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{project.name}</h3>
            {project.status && (
              <span className="tag-chip tag-yellow">{project.status}</span>
            )}
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{project.subtitle}</p>
        </div>
        <ArrowRight size={18} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "4px", transition: "transform 0.2s, color 0.2s" }} />
      </div>

      {/* Description */}
      <p style={{ fontSize: "14px", lineHeight: 1.72, color: "var(--text-secondary)", marginBottom: "20px", maxWidth: "520px" }}>
        {project.description}
      </p>

      {/* Key points */}
      <ul style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
        {project.points.slice(0, 2).map((point, i) => (
          <li key={i} style={{ display: "flex", gap: "10px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            <span style={{ marginTop: "7px", width: "4px", height: "4px", borderRadius: "50%", background: colors.primary, flexShrink: 0 }} aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>

      {/* Stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
        {project.stack.map((tech) => (
          <span key={tech} className="badge" style={{ fontSize: "11px" }}>{tech}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
        <button
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
          style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: colors.primary, background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
        >
          View Case Study <ExternalLink size={12} />
        </button>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${project.name} GitHub`}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px", border: "1px solid var(--border)", color: "var(--text-muted)", transition: "all 0.2s", textDecoration: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <GithubIcon size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = projects.slice(0, 2);
  const rest = projects.slice(2);

  return (
    <section id="projects" className="py-28" aria-label="Projects">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <span className="section-label" style={{ marginBottom: "16px" }}>Projects</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginTop: "12px", marginBottom: "12px" }}>
            Things I&apos;ve <span className="gradient-text">built</span>
          </h2>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "48px", fontFamily: "var(--font-mono)" }}>
            // click any project to explore architecture, engineering decisions, and challenges
          </p>
        </Reveal>

        {/* Featured 2-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="projects-grid">
          {featured.map((project, i) => (
            <Reveal key={project.id} delay={i * 100}>
              <FeaturedCard project={project} onOpen={() => setSelected(project)} />
            </Reveal>
          ))}
        </div>

        {/* Remaining projects */}
        {rest.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
            {rest.map((project, i) => (
              <Reveal key={project.id} delay={i * 100}>
                <FeaturedCard project={project} onOpen={() => setSelected(project)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
