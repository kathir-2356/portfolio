export const personal = {
  name: "Kathir C",
  title: "Backend Engineer | Cloud Automation | AI Systems",
  tagline: "Building reliable backend systems, automating cloud infrastructure, and engineering AI-powered applications.",
  description: "Backend-focused developer with hands-on experience in Python, Java, FastAPI, Spring Boot, AWS, Terraform, Docker, and AI systems.",
  location: "Coimbatore, Tamil Nadu, India",
  email: "kathirchandran2356@gmail.com",
  phone: "+91 8754099616",
  github: "https://github.com/kathir-2356",
  linkedin: "https://www.linkedin.com/in/kathir-c-4221a0391/",
  resumePath: "/resume.pdf",
  availability: "Open to Software Engineering / Backend / Cloud / AI Opportunities",
};

export const education = {
  institution: "KGISL Institute of Technology",
  degree: "B.Tech Information Technology",
  period: "2023 – 2027",
  location: "Coimbatore, Tamil Nadu",
  cgpa: "8.2 / 10",
};

export const stats = [
  { value: "8.2/10", label: "CGPA" },
  { value: "2027", label: "Graduation" },
  { value: "Python + Java", label: "Backend Stack" },
  { value: "AWS + Terraform", label: "Cloud Stack" },
];

export const skillGroups = [
  {
    category: "Programming",
    skills: ["Python", "Java", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    category: "Backend",
    skills: ["FastAPI", "Flask", "Spring Boot", "REST APIs"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS", "Terraform", "Docker", "Linux", "GitHub Actions", "CI/CD"],
  },
  {
    category: "AWS Services",
    skills: ["EC2", "S3", "IAM", "VPC", "Security Groups", "Elastic IP", "Auto Scaling", "ELB", "CloudWatch"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "PostgreSQL", "pgvector"],
  },
  {
    category: "AI / ML",
    skills: ["LLMs", "RAG", "Embeddings", "Vector Search"],
  },
  {
    category: "CS Foundations",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
  },
  {
    category: "Developer & AI Tools",
    skills: ["Git", "GitHub", "ChatGPT", "Claude", "Amazon Q", "Antigravity"],
  },
];

export const experience = [
  {
    company: "Codec Technologies Pvt. Ltd.",
    role: "Python Developer Intern",
    location: "Coimbatore, Tamil Nadu",
    period: "Jan 2026 – Apr 2026",
    stack: ["Python", "FastAPI", "Flask", "REST APIs", "MySQL", "Git", "GitHub", "Linux"],
    responsibilities: [
      "Developed backend modules and REST APIs using Python, FastAPI, and Flask for application development and integration.",
      "Integrated backend APIs with MySQL databases to support data-driven application workflows.",
      "Implemented API testing and debugging to identify issues and improve application reliability.",
      "Used Git, GitHub, and Linux for source control, development, testing, and backend troubleshooting.",
    ],
  },
];

export const projects = [
  {
    id: "autoinfra",
    name: "AutoInfra",
    subtitle: "Intelligent Cloud Infrastructure Automation System",
    stack: ["Java", "Spring Boot", "Terraform", "AWS", "GitHub Actions", "CloudWatch"],
    description: "A cloud infrastructure automation platform that converts application requirements into Terraform-based infrastructure configurations and automates AWS provisioning.",
    status: null,
    github: null,
    points: [
      "Developed a Spring Boot platform that converts application requirements into Terraform-based infrastructure configurations.",
      "Automated AWS provisioning across EC2, VPC, IAM, S3, Security Groups, Elastic IP, Auto Scaling, and Elastic Load Balancing.",
      "Integrated GitHub Actions for CI/CD pipeline automation.",
      "Configured CloudWatch for infrastructure monitoring and logging.",
    ],
    overview: "AutoInfra addresses the complexity of manually provisioning cloud infrastructure by providing an automated pipeline that translates high-level application requirements into production-ready Terraform configurations and deploys them to AWS.",
    architecture: "autoinfra",
    challenges: [
      "Mapping diverse application requirements to correct Terraform resource configurations.",
      "Handling AWS provisioning order dependencies (VPC before subnets, IAM before EC2).",
      "Designing idempotent infrastructure configurations to prevent duplicate resource creation.",
    ],
    outcome: "A functional automation platform capable of generating and applying Terraform configurations for multi-component AWS infrastructure from structured application requirements.",
  },
  {
    id: "tracelens",
    name: "TraceLens AI",
    subtitle: "LLM-Powered Software Failure Investigation System",
    stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "LLMs", "RAG", "Embeddings"],
    description: "An AI-assisted software failure investigation system designed to analyze application logs, stack traces, code changes, and Git history to help investigate software failures.",
    status: null,
    github: null,
    points: [
      "Designed an LLM-powered system to analyze application logs, stack traces, code changes, and Git history.",
      "Designed a RAG pipeline using chunking, embeddings, vector search, and context-grounded LLM responses.",
      "Used PostgreSQL and pgvector for vector-based retrieval.",
    ],
    overview: "TraceLens AI tackles the time-consuming process of debugging software failures by building a retrieval-augmented generation pipeline that grounds LLM analysis in actual logs, stack traces, and code history rather than hallucinated responses.",
    architecture: "tracelens",
    challenges: [
      "Designing effective chunking strategies for heterogeneous inputs (logs vs. stack traces vs. code diffs).",
      "Tuning embedding retrieval to surface the most relevant context for each failure query.",
      "Keeping LLM responses grounded strictly in retrieved context to avoid hallucination.",
    ],
    outcome: "A working RAG pipeline that ingests software failure artifacts and returns context-grounded investigation responses via a FastAPI interface.",
  },
  {
    id: "nexavren",
    name: "Nexavren",
    subtitle: "AI-Powered Business Intelligence Platform",
    stack: ["Python", "FastAPI", "REST APIs", "LLMs"],
    description: "An AI-assisted business intelligence concept designed to consolidate operational business data and help identify potential business risks.",
    status: "Concept / In Development",
    github: null,
    points: [
      "Designed an AI-assisted platform for consolidating operational business data.",
      "Planned REST APIs for business intelligence workflows.",
      "Designed AI-assisted analysis for business summaries, risk identification, and prioritized recommendations.",
    ],
    overview: "Nexavren is a conceptual platform exploring how LLMs can be applied to business intelligence workflows — consolidating operational data and surfacing risk signals through AI-assisted analysis.",
    architecture: null,
    challenges: [
      "Defining a data model flexible enough to represent diverse business operational data.",
      "Designing prompts that produce structured, actionable business intelligence outputs.",
    ],
    outcome: "Currently in design and early development phase. No production deployment or real user data.",
  },
];

export const certifications = [
  {
    title: "AWS Solutions Architecture Job Simulation",
    issuer: "Forage",
    icon: "aws",
  },
  {
    title: "AWS Multi-Tier VPC Architecture",
    issuer: "Coursera",
    icon: "aws",
  },
  {
    title: "Introduction to Microsoft Azure Cloud Services",
    issuer: "Microsoft",
    icon: "azure",
  },
  {
    title: "Linux Introduction (LFS101)",
    issuer: "Linux Foundation",
    icon: "linux",
  },
];

export const csFoundations = [
  {
    title: "Data Structures & Algorithms",
    description: "Problem solving, algorithmic thinking, searching, sorting, arrays, strings, trees, graphs, and complexity analysis.",
    icon: "dsa",
  },
  {
    title: "Object-Oriented Programming",
    description: "Encapsulation, inheritance, polymorphism, abstraction, and design patterns applied in Java and Python.",
    icon: "oop",
  },
  {
    title: "Database Management Systems",
    description: "Relational modeling, SQL, normalization, transactions, indexing, and query optimization.",
    icon: "dbms",
  },
  {
    title: "Operating Systems",
    description: "Process management, memory management, file systems, scheduling, and concurrency fundamentals.",
    icon: "os",
  },
  {
    title: "Computer Networks",
    description: "TCP/IP, HTTP, DNS, network layers, routing, and fundamentals of distributed communication.",
    icon: "networks",
  },
];
