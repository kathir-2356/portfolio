"use client";
import { useState, useEffect, useRef } from "react";
import { Play, CheckCircle, Clock, Zap, Server, Cloud, GitBranch, Terminal, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";

/* ── Code snippets ── */
const snippets = [
  {
    id: "terraform",
    label: "Terraform",
    lang: "hcl",
    color: "#8B5CF6",
    icon: Cloud,
    title: "AWS VPC + EC2 Provisioning",
    code: `# AutoInfra — Generated Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "autoinfra-vpc" }
}

resource "aws_instance" "app" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.public.id
  
  tags = {
    Name        = "autoinfra-app"
    Environment = var.environment
    ManagedBy   = "AutoInfra"
  }
}

resource "aws_lb" "main" {
  name               = "autoinfra-alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = aws_subnet.public[*].id
}`,
  },
  {
    id: "fastapi",
    label: "FastAPI",
    lang: "python",
    color: "#10B981",
    icon: Server,
    title: "REST API — Backend Module",
    code: `# TraceLens AI — FastAPI Backend
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from services.rag import RAGPipeline
from services.embeddings import EmbeddingService

app = FastAPI(title="TraceLens AI")
rag = RAGPipeline()

class InvestigationRequest(BaseModel):
    logs: list[str]
    stack_trace: str
    git_history: list[str]

@app.post("/investigate")
async def investigate_failure(req: InvestigationRequest):
    # Chunk and embed all artifacts
    chunks = rag.chunk_artifacts(
        logs=req.logs,
        stack_trace=req.stack_trace,
        git_history=req.git_history
    )
    # Vector search + LLM grounded response
    context = await rag.retrieve(chunks, top_k=8)
    response = await rag.generate(context)
    return { "investigation": response, "sources": context }`,
  },
  {
    id: "cicd",
    label: "GitHub Actions",
    lang: "yaml",
    color: "#3B82F6",
    icon: GitBranch,
    title: "CI/CD Pipeline",
    code: `# AutoInfra — CI/CD Pipeline
name: Deploy Infrastructure

on:
  push:
    branches: [main]

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_KEY }}
          
      - name: Terraform Init
        run: terraform init
        
      - name: Terraform Plan
        run: terraform plan -out=tfplan
        
      - name: Terraform Apply
        run: terraform apply -auto-approve tfplan
        
      - name: Notify CloudWatch
        run: aws cloudwatch put-metric-data \\
          --namespace AutoInfra --metric-name Deploy \\
          --value 1`,
  },
  {
    id: "springboot",
    label: "Spring Boot",
    lang: "java",
    color: "#F59E0B",
    icon: Terminal,
    title: "Infrastructure Controller",
    code: `// AutoInfra — Spring Boot Controller
@RestController
@RequestMapping("/api/infra")
public class InfraController {

    @Autowired
    private TerraformService terraformService;
    
    @Autowired
    private AWSProvisioningService awsService;

    @PostMapping("/provision")
    public ResponseEntity<ProvisionResult> provision(
        @RequestBody InfraRequest request
    ) {
        // Generate Terraform config from requirements
        TerraformConfig config = terraformService
            .generateConfig(request.getRequirements());
        
        // Validate and apply
        ValidationResult validation = config.validate();
        if (!validation.isValid()) {
            return ResponseEntity.badRequest()
                .body(ProvisionResult.failed(validation));
        }
        
        // Provision on AWS
        ProvisionResult result = awsService.apply(config);
        return ResponseEntity.ok(result);
    }
}`,
  },
];

/* ── Pipeline steps ── */
const pipelineSteps = [
  { id: 1, label: "Requirements", sublabel: "App specs defined", icon: "📋", color: "#3B82F6", duration: 800 },
  { id: 2, label: "Spring Boot", sublabel: "Config generated", icon: "⚙️", color: "#F59E0B", duration: 1200 },
  { id: 3, label: "Terraform", sublabel: "IaC written", icon: "🏗️", color: "#8B5CF6", duration: 1600 },
  { id: 4, label: "GitHub Actions", sublabel: "CI/CD triggered", icon: "🔄", color: "#06B6D4", duration: 2000 },
  { id: 5, label: "AWS", sublabel: "Infra provisioned", icon: "☁️", color: "#10B981", duration: 2400 },
  { id: 6, label: "CloudWatch", sublabel: "Monitoring active", icon: "📊", color: "#34D399", duration: 2800 },
];

/* ── Infra metrics ── */
const metrics = [
  { label: "EC2 Instances", value: "3", unit: "running", color: "#10B981", trend: "↑" },
  { label: "CPU Usage", value: "24", unit: "%", color: "#3B82F6", trend: "→" },
  { label: "Memory", value: "61", unit: "%", color: "#8B5CF6", trend: "↓" },
  { label: "Requests/s", value: "142", unit: "req/s", color: "#F59E0B", trend: "↑" },
];

/* ── Syntax highlight (simple) ── */
function highlight(code: string, lang: string): string {
  if (lang === "hcl" || lang === "yaml") {
    return code
      .replace(/(#[^\n]*)/g, '<span style="color:#4A5568">$1</span>')
      .replace(/("([^"]*)")/g, '<span style="color:#34D399">$1</span>')
      .replace(/\b(resource|variable|output|data|locals|module|provider|terraform|on|push|branches|jobs|runs-on|steps|uses|with|run|name)\b/g, '<span style="color:#60A5FA">$1</span>')
      .replace(/\b(true|false|null)\b/g, '<span style="color:#F472B6">$1</span>');
  }
  if (lang === "python") {
    return code
      .replace(/(#[^\n]*)/g, '<span style="color:#4A5568">$1</span>')
      .replace(/("([^"]*)")/g, '<span style="color:#34D399">$1</span>')
      .replace(/\b(from|import|class|def|async|await|return|if|else|not|and|or|in|for|with)\b/g, '<span style="color:#A78BFA">$1</span>')
      .replace(/(@\w+)/g, '<span style="color:#60A5FA">$1</span>')
      .replace(/\b(FastAPI|BaseModel|HTTPException|list|str|int|bool)\b/g, '<span style="color:#FBBF24">$1</span>');
  }
  if (lang === "java") {
    return code
      .replace(/(\/\/[^\n]*)/g, '<span style="color:#4A5568">$1</span>')
      .replace(/("([^"]*)")/g, '<span style="color:#34D399">$1</span>')
      .replace(/\b(public|private|class|interface|new|return|if|else|void|static|final|extends|implements|throws)\b/g, '<span style="color:#A78BFA">$1</span>')
      .replace(/(@\w+)/g, '<span style="color:#60A5FA">$1</span>')
      .replace(/\b(String|ResponseEntity|RequestBody|Autowired|RestController|RequestMapping|PostMapping)\b/g, '<span style="color:#FBBF24">$1</span>');
  }
  return code;
}

/* ── Pipeline component ── */
function AutomationPipeline() {
  const [active, setActive] = useState<number[]>([]);
  const [running, setRunning] = useState(false);

  const runPipeline = () => {
    if (running) return;
    setRunning(true);
    setActive([]);
    pipelineSteps.forEach((step) => {
      setTimeout(() => {
        setActive((prev) => [...prev, step.id]);
        if (step.id === pipelineSteps.length) setRunning(false);
      }, step.duration);
    });
  };

  useEffect(() => { runPipeline(); }, []);

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "2px" }}>AutoInfra Pipeline</p>
          <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Infrastructure automation flow</p>
        </div>
        <button
          onClick={runPipeline}
          disabled={running}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "7px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
            background: running ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.3)", color: "#60A5FA",
            cursor: running ? "not-allowed" : "pointer", transition: "all 0.2s",
            fontFamily: "var(--font-sans)",
          }}
        >
          <Play size={11} /> {running ? "Running..." : "Run Pipeline"}
        </button>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {pipelineSteps.map((step, i) => {
          const isDone = active.includes(step.id);
          const isNext = !isDone && active.length === i;
          return (
            <div key={step.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Connector */}
              {i > 0 && (
                <div style={{ position: "absolute", left: "35px", marginTop: "-20px", width: "1px", height: "8px", background: isDone ? step.color : "var(--border)", transition: "background 0.4s", display: "none" }} />
              )}
              {/* Status icon */}
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: isDone ? `${step.color}20` : "rgba(255,255,255,0.03)",
                border: `1px solid ${isDone ? step.color : "var(--border)"}`,
                transition: "all 0.4s ease",
                boxShadow: isDone ? `0 0 10px ${step.color}40` : "none",
              }}>
                {isDone
                  ? <CheckCircle size={13} style={{ color: step.color }} />
                  : isNext
                  ? <Clock size={13} style={{ color: "var(--text-muted)", animation: "spin 1s linear infinite" }} />
                  : <span style={{ fontSize: "10px" }}>{step.id}</span>
                }
              </div>

              {/* Label */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "13px", fontWeight: isDone ? 600 : 400, color: isDone ? "var(--text-primary)" : "var(--text-muted)", transition: "all 0.3s" }}>
                    {step.icon} {step.label}
                  </span>
                  {isDone && (
                    <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: step.color }}>✓ done</span>
                  )}
                </div>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "1px" }}>{step.sublabel}</p>
              </div>

              {/* Progress bar */}
              <div style={{ width: "60px", height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: "2px",
                  background: step.color,
                  width: isDone ? "100%" : "0%",
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>
          );
        })}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ── Metrics dashboard ── */
function MetricsDashboard() {
  const [vals, setVals] = useState(metrics.map((m) => parseInt(m.value)));

  useEffect(() => {
    const interval = setInterval(() => {
      setVals((prev) => prev.map((v, i) => {
        const delta = Math.floor(Math.random() * 6) - 3;
        const min = [1, 10, 30, 80][i];
        const max = [8, 80, 90, 300][i];
        return Math.min(max, Math.max(min, v + delta));
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>CloudWatch Metrics</p>
        <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", fontFamily: "var(--font-mono)", color: "#34D399" }}>
          <span className="availability-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#34D399", display: "inline-block" }} />
          LIVE
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {metrics.map((m, i) => (
          <div key={m.label} style={{
            padding: "14px", borderRadius: "10px",
            background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
          }}>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "6px" }}>{m.label}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{ fontSize: "22px", fontWeight: 800, color: m.color, letterSpacing: "-0.03em", transition: "all 0.5s ease", fontFamily: "var(--font-sans)" }}>
                {vals[i]}
              </span>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{m.unit}</span>
              <span style={{ fontSize: "11px", color: m.color, marginLeft: "auto" }}>{m.trend}</span>
            </div>
            {/* Mini sparkline */}
            <div style={{ marginTop: "8px", height: "24px", display: "flex", alignItems: "flex-end", gap: "2px" }}>
              {Array.from({ length: 12 }, (_, j) => (
                <div key={j} style={{
                  flex: 1, borderRadius: "1px",
                  background: m.color,
                  opacity: 0.2 + (j / 12) * 0.6,
                  height: `${20 + Math.sin(j + vals[i]) * 10}px`,
                  transition: "height 0.5s ease",
                }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Code viewer ── */
function CodeViewer() {
  const [active, setActive] = useState(snippets[0]);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(active.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Tabs */}
      <div style={{
        display: "flex", gap: "2px", padding: "12px 16px 0",
        borderBottom: "1px solid var(--border)",
        background: "rgba(255,255,255,0.01)",
        overflowX: "auto",
      }}>
        {snippets.map((s) => {
          const Icon = s.icon;
          const isActive = active.id === s.id;
          return (
            <button key={s.id} onClick={() => setActive(s)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px", borderRadius: "6px 6px 0 0",
                fontSize: "12px", fontWeight: isActive ? 600 : 400,
                color: isActive ? s.color : "var(--text-muted)",
                background: isActive ? "rgba(255,255,255,0.04)" : "transparent",
                border: "none", borderBottom: isActive ? `2px solid ${s.color}` : "2px solid transparent",
                cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
                fontFamily: "var(--font-sans)",
              }}
            >
              <Icon size={12} />
              {s.label}
            </button>
          );
        })}
      </div>

      {/* File header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px", borderBottom: "1px solid var(--border)",
        background: "rgba(255,255,255,0.01)",
      }}>
        <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
          // {active.title}
        </span>
        <button onClick={copy}
          style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: copied ? "#34D399" : "var(--text-muted)", background: "transparent", border: "none", cursor: "pointer", transition: "color 0.2s" }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>

      {/* Code */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>
        <pre style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.8", color: "#CBD5E1" }}>
          <code dangerouslySetInnerHTML={{ __html: highlight(active.code, active.lang) }} />
        </pre>
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function AutomationShowcase() {
  const [tab, setTab] = useState<"pipeline" | "metrics">("pipeline");

  return (
    <section className="py-28" aria-label="Automation showcase">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <span className="section-label" style={{ marginBottom: "16px" }}>Automation</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, marginTop: "12px", marginBottom: "12px" }}>
            How I <span className="gradient-text">automate</span> infrastructure
          </h2>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "48px", fontFamily: "var(--font-mono)" }}>
            // from application requirements → terraform config → AWS provisioning → monitoring
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "20px", alignItems: "start" }} className="automation-grid">
          {/* Left: Pipeline + Metrics */}
          <Reveal delay={100}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Tab switcher */}
              <div style={{
                display: "flex", gap: "4px", padding: "4px",
                background: "rgba(255,255,255,0.03)", borderRadius: "10px",
                border: "1px solid var(--border)", width: "fit-content",
              }}>
                {(["pipeline", "metrics"] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{
                      padding: "7px 16px", borderRadius: "7px", fontSize: "12px", fontWeight: 500,
                      background: tab === t ? "rgba(59,130,246,0.15)" : "transparent",
                      border: tab === t ? "1px solid rgba(59,130,246,0.3)" : "1px solid transparent",
                      color: tab === t ? "#60A5FA" : "var(--text-muted)",
                      cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--font-sans)",
                    }}
                  >
                    {t === "pipeline" ? <><Zap size={11} style={{ display: "inline", marginRight: 5 }} />Pipeline</> : <><Server size={11} style={{ display: "inline", marginRight: 5 }} />Metrics</>}
                  </button>
                ))}
              </div>

              {/* Panel */}
              <div style={{
                background: "var(--bg-card)", border: "1px solid var(--border-accent)",
                borderRadius: "16px", overflow: "hidden",
                boxShadow: "var(--glow-blue)",
              }}>
                {tab === "pipeline" ? <AutomationPipeline /> : <MetricsDashboard />}
              </div>

              {/* Tech stack row */}
              <div style={{
                padding: "14px 18px", borderRadius: "12px",
                background: "var(--bg-card)", border: "1px solid var(--border)",
                display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center",
              }}>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginRight: "4px" }}>stack:</span>
                {["Spring Boot", "Terraform", "AWS", "GitHub Actions", "CloudWatch", "Docker"].map((t) => (
                  <span key={t} className="badge" style={{ fontSize: "11px" }}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: Code viewer */}
          <Reveal delay={200}>
            <div style={{
              background: "linear-gradient(145deg, #0F1117, #0C0E13)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px", overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              height: "520px", display: "flex", flexDirection: "column",
            }}>
              {/* Window chrome */}
              <div style={{
                display: "flex", alignItems: "center", gap: "7px",
                padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.015)",
              }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                  <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block", opacity: 0.8 }} />
                ))}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)", marginLeft: "8px" }}>
                  code — autoinfra / tracelens
                </span>
              </div>
              <CodeViewer />
            </div>
          </Reveal>
        </div>

        {/* Bottom: How it works steps */}
        <Reveal delay={300}>
          <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
            {[
              { step: "01", title: "Define Requirements", desc: "App specs sent to Spring Boot API", color: "#3B82F6" },
              { step: "02", title: "Generate Config", desc: "Terraform HCL auto-generated", color: "#8B5CF6" },
              { step: "03", title: "Validate & Plan", desc: "terraform plan checks resources", color: "#06B6D4" },
              { step: "04", title: "CI/CD Trigger", desc: "GitHub Actions runs pipeline", color: "#F59E0B" },
              { step: "05", title: "AWS Provision", desc: "EC2, VPC, IAM, S3, ELB created", color: "#10B981" },
              { step: "06", title: "Monitor", desc: "CloudWatch tracks all metrics", color: "#34D399" },
            ].map((item) => (
              <div key={item.step} style={{
                padding: "16px", borderRadius: "12px",
                background: "var(--bg-card)", border: "1px solid var(--border)",
                transition: "border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${item.color}40`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: item.color, fontWeight: 700 }}>{item.step}</span>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", margin: "6px 0 4px" }}>{item.title}</p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .automation-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
