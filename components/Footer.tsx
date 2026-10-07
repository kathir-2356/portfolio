"use client";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { personal } from "@/data";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", paddingTop: "48px", paddingBottom: "40px" }} aria-label="Footer">
      {/* Top gradient line */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), transparent)", marginBottom: "48px" }} aria-hidden="true" />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "14px", letterSpacing: "0.2em", color: "var(--text-primary)", marginBottom: "6px" }}>
              KATHIR C
            </p>
            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Backend Engineering · Cloud Automation · AI Systems
            </p>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              Coimbatore, India
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {[
              { href: personal.github, icon: <GithubIcon size={17} />, label: "GitHub" },
              { href: personal.linkedin, icon: <LinkedinIcon size={17} />, label: "LinkedIn" },
              { href: `mailto:${personal.email}`, icon: <Mail size={17} />, label: "Email" },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer" aria-label={label}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "10px", border: "1px solid var(--border)", color: "var(--text-muted)", transition: "all 0.2s", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "transparent"; }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border)", margin: "28px 0" }} />

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>© 2026 Kathir C. All rights reserved.</p>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Built with curiosity and code.</p>
        </div>
      </div>
    </footer>
  );
}
