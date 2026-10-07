"use client";
import { useEffect, useRef, useState } from "react";
import { Mail, Download, ArrowRight, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { personal } from "@/data";

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.4 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,130,246,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });

      // Draw faint connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

/* ── Typewriter ── */
function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < word.length) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 45);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, words]);

  return (
    <span style={{ color: "var(--accent-blue)" }}>
      {text}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "1em",
          background: "var(--accent-blue)",
          marginLeft: "2px",
          verticalAlign: "middle",
          animation: "blink 1s step-end infinite",
        }}
      />
    </span>
  );
}

/* ── Terminal ── */
const terminalLines = [
  { text: "$ whoami", delay: 500, type: "cmd" },
  { text: "kathir-c", delay: 1000, type: "output" },
  { text: "", delay: 1200, type: "blank" },
  { text: "> backend-engineer", delay: 1400, type: "tag" },
  { text: "> cloud-automation", delay: 1700, type: "tag" },
  { text: "> ai-systems", delay: 2000, type: "tag" },
  { text: "", delay: 2200, type: "blank" },
  { text: "$ cat stack.json", delay: 2500, type: "cmd" },
  { text: '{ "lang": ["Python","Java"],', delay: 2900, type: "json" },
  { text: '  "cloud": ["AWS","Terraform"],', delay: 3100, type: "json" },
  { text: '  "ai": ["LLMs","RAG"] }', delay: 3300, type: "json" },
  { text: "", delay: 3500, type: "blank" },
  { text: "status: building...", delay: 3700, type: "status" },
];

function Terminal() {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisible((v) => [...v, i]), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const color = (type: string) => {
    if (type === "cmd") return "#60A5FA";
    if (type === "output") return "#F0F2F5";
    if (type === "tag") return "#A78BFA";
    if (type === "json") return "#34D399";
    if (type === "status") return "#FBBF24";
    return "transparent";
  };

  return (
    <div
      className="float"
      style={{
        background: "linear-gradient(145deg, #0F1117, #0C0E13)",
        border: "1px solid rgba(59,130,246,0.2)",
        borderRadius: "16px",
        boxShadow: "0 0 0 1px rgba(59,130,246,0.06), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(59,130,246,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: "7px",
        padding: "13px 18px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}>
        {["#FF5F57","#FEBC2E","#28C840"].map((c) => (
          <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "inline-block", opacity: 0.85 }} />
        ))}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", marginLeft: "10px", letterSpacing: "0.05em" }}>
          bash — kathir@portfolio
        </span>
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>
          zsh 5.9
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "22px 22px 26px", minHeight: "260px" }}>
        {terminalLines.map((line, i) =>
          visible.includes(i) ? (
            <div key={i} style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13.5px",
              lineHeight: "1.9",
              color: color(line.type),
            }}>
              {line.text || "\u00A0"}
              {i === terminalLines.length - 1 && (
                <span style={{
                  display: "inline-block", width: "8px", height: "15px",
                  background: "#FBBF24", marginLeft: "3px", verticalAlign: "middle",
                  animation: "blink 1s step-end infinite",
                }} />
              )}
            </div>
          ) : null
        )}
      </div>

      {/* Bottom status bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.015)",
      }}>
        <div style={{ display: "flex", gap: "16px" }}>
          {["Python","Java","FastAPI","AWS","Terraform"].map((t) => (
            <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>{t}</span>
          ))}
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "rgba(52,211,153,0.7)" }}>● active</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center grid-bg" aria-label="Hero section" style={{ overflow: "hidden" }}>
      <ParticleCanvas />

      {/* Orbs */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-20%", left: "-10%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", right: "-10%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "50%",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)",
          filter: "blur(30px)",
          transform: "translate(-50%,-50%)",
        }} />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", width: "100%", paddingTop: "110px", paddingBottom: "72px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="hero-grid">
          {/* Left */}
          <div>
            {/* Top label */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <span className="tag-chip tag-blue">B.TECH IT · 2027</span>
              <span className="tag-chip tag-green" style={{ position: "relative" }}>
                <span className="availability-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
                Available
              </span>
            </div>

            {/* Name */}
            <div style={{ marginBottom: "8px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-muted)", letterSpacing: "0.15em" }}>
                Hi, I&apos;m
              </span>
            </div>
            <h1 style={{
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}>
              Kathir C
            </h1>

            {/* Typewriter role */}
            <div style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 600, marginBottom: "24px", minHeight: "2em", letterSpacing: "-0.02em" }}>
              <Typewriter words={["Backend Engineer", "Cloud Automation", "AI Systems Builder", "API Developer"]} />
            </div>

            <p style={{ fontSize: "15px", lineHeight: 1.78, color: "var(--text-secondary)", maxWidth: "500px", marginBottom: "32px" }}>
              {personal.description}
            </p>

            {/* Availability */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 18px", borderRadius: "100px",
              background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)",
              color: "#34D399", fontSize: "13px", fontWeight: 500, marginBottom: "36px",
            }}>
              <span className="availability-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#34D399", display: "inline-block", flexShrink: 0, position: "relative" }} aria-hidden="true" />
              {personal.availability}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "36px" }}>
              <a href="#projects" className="btn-primary">
                View Projects <ArrowRight size={14} />
              </a>
              <a href={personal.resumePath} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Download size={14} /> Download Resume
              </a>
            </div>

            {/* Socials */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {[
                { href: personal.github, icon: <GithubIcon size={17} />, label: "GitHub" },
                { href: personal.linkedin, icon: <LinkedinIcon size={17} />, label: "LinkedIn" },
                { href: `mailto:${personal.email}`, icon: <Mail size={17} />, label: "Email" },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer" aria-label={label}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "10px", color: "var(--text-muted)", border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)", transition: "all 0.2s", textDecoration: "none" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                >
                  {icon}
                </a>
              ))}
              <div style={{ width: "1px", height: "20px", background: "var(--border)", margin: "0 8px" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                {personal.location}
              </span>
            </div>
          </div>

          {/* Right: Terminal */}
          <div>
            <Terminal />
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "72px" }}>
          <a href="#about" aria-label="Scroll to About"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: "var(--text-muted)", textDecoration: "none", opacity: 0.6, transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em" }}>SCROLL</span>
            <ChevronDown size={13} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
