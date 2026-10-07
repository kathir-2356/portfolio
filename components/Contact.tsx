"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { personal } from "@/data";
import Reveal from "./Reveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: `1px solid ${focused === name ? "rgba(59,130,246,0.5)" : "var(--border)"}`,
    background: focused === name ? "rgba(59,130,246,0.04)" : "var(--bg-primary)",
    color: "var(--text-primary)",
    fontSize: "14px",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    boxShadow: focused === name ? "0 0 0 3px rgba(59,130,246,0.08)" : "none",
  });

  return (
    <section id="contact" className="py-28" aria-label="Contact">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <span className="section-label" style={{ marginBottom: "16px" }}>Contact</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginTop: "12px", marginBottom: "12px" }}>
            Let&apos;s build something <span className="gradient-text">useful.</span>
          </h2>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "520px", marginBottom: "48px", lineHeight: 1.72 }}>
            I&apos;m open to opportunities in backend engineering, software development, cloud engineering, and AI-driven systems.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "32px", alignItems: "start" }} className="contact-grid">
          {/* Left */}
          <Reveal delay={100}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}`, color: "#3B82F6" },
                { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone}`, color: "#8B5CF6" },
                { icon: MapPin, label: "Location", value: personal.location, href: null, color: "#10B981" },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <div
                  key={label}
                  className="card"
                  style={{ padding: "16px 20px" }}
                  {...(href ? { as: "a" } : {})}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "10px", background: `${color}12`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: "2px", letterSpacing: "0.08em" }}>{label}</p>
                      {href ? (
                        <a href={href} style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)", textDecoration: "none" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                        >{value}</a>
                      ) : (
                        <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>{value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <a href={`mailto:${personal.email}`} className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "11px 16px" }}>
                  <Mail size={14} /> Email Me
                </a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: "11px 16px" }} aria-label="LinkedIn">
                  <LinkedinIcon size={15} />
                </a>
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: "11px 16px" }} aria-label="GitHub">
                  <GithubIcon size={15} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal delay={200}>
            <div className="card-glow" style={{ padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>Send a message</h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>// opens email client</span>
              </div>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }} aria-label="Contact form">
                <div>
                  <label htmlFor="c-name" style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>Name</label>
                  <input id="c-name" type="text" required placeholder="Your name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    style={inputStyle("name")} />
                </div>
                <div>
                  <label htmlFor="c-email" style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>Email</label>
                  <input id="c-email" type="email" required placeholder="your@email.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    style={inputStyle("email")} />
                </div>
                <div>
                  <label htmlFor="c-msg" style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "6px" }}>Message</label>
                  <textarea id="c-msg" required rows={4} placeholder="What would you like to discuss?" value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("message"), resize: "none" }} />
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: "center" }}>
                  <Send size={14} /> Send Message <ArrowRight size={13} />
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
