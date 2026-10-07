"use client";
import { ArrowRight, Code2, GitBranch, Star } from "lucide-react";
import { GithubIcon } from "./Icons";
import { personal } from "@/data";
import Reveal from "./Reveal";

export default function GitHubSection() {
  return (
    <section className="py-16" aria-label="GitHub">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div
            className="card-glow"
            style={{ padding: "36px 40px", position: "relative", overflow: "hidden" }}
          >
            {/* Background */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)",
            }} aria-hidden="true" />

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "28px", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "14px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <GithubIcon size={24} style={{ color: "var(--text-primary)" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                    Building in Public
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                    Explore my repositories, projects, and code on GitHub.
                  </p>
                </div>
              </div>

              {/* Mini stats */}
              <div style={{ display: "flex", gap: "24px" }}>
                {[
                  { icon: Code2, label: "Repositories" },
                  { icon: GitBranch, label: "Commits" },
                  { icon: Star, label: "Projects" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <Icon size={16} style={{ color: "var(--text-muted)", margin: "0 auto 4px" }} />
                    <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{label}</p>
                  </div>
                ))}
              </div>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ flexShrink: 0 }}
                aria-label="Visit GitHub profile"
              >
                Explore my code <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
