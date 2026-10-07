"use client";
import { useState, useEffect } from "react";
import { Menu, X, Download, Sun, Moon } from "lucide-react";
import { personal } from "@/data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [active, setActive] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const initial = stored ?? preferred;
    setTheme(initial);
    document.documentElement.classList.toggle("light", initial === "light");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Active section detection
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("light", next === "light");
  };

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          background: scrolled ? "rgba(6,7,9,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        }}
        aria-label="Main navigation"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

            {/* Logo */}
            <a href="#" aria-label="Kathir C — Home" style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--text-primary)" }}>
                KATHIR
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.2em", background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {" "}C
              </span>
            </a>

            {/* Desktop nav */}
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }} className="hidden lg:flex">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <button key={link.href} onClick={() => handleNav(link.href)}
                    style={{
                      padding: "7px 14px", fontSize: "13px", fontWeight: isActive ? 500 : 400,
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                      border: "none", borderRadius: "7px", cursor: "pointer",
                      transition: "color 0.15s, background 0.15s",
                      fontFamily: "var(--font-sans)",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text-primary)"; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    {link.label}
                    {isActive && (
                      <span style={{
                        position: "absolute", bottom: "2px", left: "50%", transform: "translateX(-50%)",
                        width: "16px", height: "2px", borderRadius: "1px",
                        background: "var(--accent-gradient)",
                      }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                style={{ width: 34, height: 34, borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </button>

              <a href={personal.resumePath} target="_blank" rel="noopener noreferrer"
                className="btn-primary hidden sm:inline-flex"
                style={{ padding: "8px 18px", fontSize: "13px" }}
                aria-label="Download Resume"
              >
                <Download size={13} /> Resume ↗
              </a>

              <button className="lg:hidden" onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
                style={{ width: 36, height: 36, borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40, background: "var(--bg-primary)", display: "flex", flexDirection: "column", paddingTop: "80px", paddingLeft: "24px", paddingRight: "24px" }} className="lg:hidden">
          {navLinks.map((link) => (
            <button key={link.href} onClick={() => handleNav(link.href)}
              style={{ textAlign: "left", padding: "18px 0", fontSize: "18px", fontWeight: 500, color: "var(--text-primary)", background: "transparent", border: "none", borderBottom: "1px solid var(--border)", cursor: "pointer", fontFamily: "var(--font-sans)" }}
            >
              {link.label}
            </button>
          ))}
          <a href={personal.resumePath} target="_blank" rel="noopener noreferrer"
            className="btn-primary" style={{ marginTop: "28px", justifyContent: "center" }}
            onClick={() => setOpen(false)}
          >
            <Download size={14} /> Download Resume
          </a>
        </div>
      )}
    </>
  );
}
