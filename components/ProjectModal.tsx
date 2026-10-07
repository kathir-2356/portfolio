"use client";
import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import { AutoInfraArchitecture, TraceLensArchitecture } from "./ArchitectureDiagram";

interface Project {
  id: string; name: string; subtitle: string; stack: string[];
  description: string; status: string | null; github: string | null;
  points: string[]; overview: string; architecture: string | null;
  challenges: string[]; outcome: string;
}

const projectColors: Record<string, string> = {
  autoinfra: "#3B82F6",
  tracelens: "#8B5CF6",
  nexavren: "#10B981",
};

function SectionHead({ label }: { label: string }) {
  return (
    <p style={{ fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px" }}>
      {label}
    </p>
  );
}

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const color = projectColors[project.id] ?? "#3B82F6";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label={`${project.name} case study`}>
      <div className="modal-content">
        {/* Header */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          padding: "24px 28px 20px",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px",
        }}>
          <div>
            {/* Color accent line */}
            <div style={{ width: 32, height: 3, borderRadius: "2px", background: `linear-gradient(90deg, ${color}, ${color}60)`, marginBottom: "12px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{project.name}</h2>
              {project.status && (
                <span className="tag-chip tag-yellow">{project.status}</span>
              )}
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{project.subtitle}</p>
          </div>
          <button onClick={onClose} aria-label="Close"
            style={{ width: 34, height: 34, borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Overview */}
          <div>
            <SectionHead label="Overview" />
            <p style={{ fontSize: "14px", lineHeight: 1.78, color: "var(--text-secondary)" }}>{project.overview}</p>
          </div>

          {/* Architecture */}
          {project.architecture && (
            <div>
              <SectionHead label="Architecture" />
              <div style={{ borderRadius: "12px", padding: "20px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                {project.architecture === "autoinfra" && <AutoInfraArchitecture />}
                {project.architecture === "tracelens" && <TraceLensArchitecture />}
              </div>
            </div>
          )}

          {/* Stack */}
          <div>
            <SectionHead label="Technology Stack" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {project.stack.map((tech) => (
                <span key={tech} className="badge">{tech}</span>
              ))}
            </div>
          </div>

          {/* Engineering */}
          <div>
            <SectionHead label="Engineering Details" />
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {project.points.map((p, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", fontSize: "14px", lineHeight: 1.65, color: "var(--text-secondary)" }}>
                  <span style={{ marginTop: "8px", width: 4, height: 4, borderRadius: "50%", background: color, flexShrink: 0 }} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div>
            <SectionHead label="Technical Challenges" />
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {project.challenges.map((c, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", fontSize: "14px", lineHeight: 1.65, color: "var(--text-secondary)" }}>
                  <span style={{ marginTop: "8px", width: 4, height: 4, borderRadius: "50%", background: "#8B5CF6", flexShrink: 0 }} aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div style={{ padding: "16px 20px", borderRadius: "10px", background: `${color}08`, border: `1px solid ${color}20` }}>
            <SectionHead label="Outcome" />
            <p style={{ fontSize: "14px", lineHeight: 1.72, color: "var(--text-secondary)" }}>{project.outcome}</p>
          </div>

          {/* GitHub */}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ alignSelf: "flex-start" }}>
              <GithubIcon size={14} /> View on GitHub <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
