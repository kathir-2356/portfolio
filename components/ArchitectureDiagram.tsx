"use client";

function FlowArrow() {
  return (
    <div className="flex justify-center my-1" aria-hidden="true">
      <svg width="2" height="20" viewBox="0 0 2 20">
        <line
          x1="1" y1="0" x2="1" y2="20"
          stroke="rgba(59,130,246,0.5)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className="flow-line"
        />
      </svg>
    </div>
  );
}

function Node({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "accent" | "violet" | "green";
}) {
  const styles: Record<string, React.CSSProperties> = {
    default: {},
    accent: {
      borderColor: "rgba(59,130,246,0.4)",
      background: "rgba(59,130,246,0.08)",
      color: "#93C5FD",
    },
    violet: {
      borderColor: "rgba(139,92,246,0.4)",
      background: "rgba(139,92,246,0.08)",
      color: "#C4B5FD",
    },
    green: {
      borderColor: "rgba(52,211,153,0.4)",
      background: "rgba(52,211,153,0.08)",
      color: "#6EE7B7",
    },
  };

  return (
    <div
      className="arch-node text-center mx-auto"
      style={{ maxWidth: 220, ...styles[variant] }}
    >
      {label}
    </div>
  );
}

function MultiNode({ labels }: { labels: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" aria-label="AWS services">
      {labels.map((l) => (
        <div
          key={l}
          className="arch-node text-xs"
          style={{
            borderColor: "rgba(59,130,246,0.3)",
            background: "rgba(59,130,246,0.06)",
            color: "#93C5FD",
            padding: "4px 10px",
          }}
        >
          {l}
        </div>
      ))}
    </div>
  );
}

export function AutoInfraArchitecture() {
  return (
    <div className="py-4 px-2" role="img" aria-label="AutoInfra architecture diagram">
      <Node label="Application Requirements" variant="default" />
      <FlowArrow />
      <Node label="Spring Boot API" variant="accent" />
      <FlowArrow />
      <Node label="Infrastructure Configuration" variant="default" />
      <FlowArrow />
      <Node label="Terraform" variant="violet" />
      <FlowArrow />
      <Node label="AWS" variant="accent" />
      <FlowArrow />
      <MultiNode labels={["EC2", "VPC", "IAM", "S3", "ELB", "Auto Scaling"]} />
      <FlowArrow />
      <Node label="CloudWatch Monitoring" variant="green" />
    </div>
  );
}

export function TraceLensArchitecture() {
  return (
    <div className="py-4 px-2" role="img" aria-label="TraceLens AI architecture diagram">
      <div className="flex flex-wrap justify-center gap-2 mb-1">
        {["Logs", "Stack Traces", "Git History", "Code Changes"].map((l) => (
          <div
            key={l}
            className="arch-node text-xs"
            style={{ padding: "4px 10px" }}
          >
            {l}
          </div>
        ))}
      </div>
      <FlowArrow />
      <Node label="Chunking" variant="default" />
      <FlowArrow />
      <Node label="Embeddings" variant="accent" />
      <FlowArrow />
      <Node label="pgvector (PostgreSQL)" variant="violet" />
      <FlowArrow />
      <Node label="Retrieval" variant="default" />
      <FlowArrow />
      <Node label="LLM" variant="violet" />
      <FlowArrow />
      <Node label="Context-Grounded Investigation" variant="green" />
    </div>
  );
}
