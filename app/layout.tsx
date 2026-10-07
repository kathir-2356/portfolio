import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kathir C | Backend Engineer | Cloud & AI Systems",
  description:
    "Portfolio of Kathir C, a final-year B.Tech Information Technology student focused on backend engineering, cloud automation, AWS, Terraform, and AI-driven software systems.",
  keywords: [
    "Kathir C", "Backend Engineer", "Cloud Automation", "AI Systems",
    "Python", "Java", "FastAPI", "Spring Boot", "AWS", "Terraform", "Docker",
  ],
  authors: [{ name: "Kathir C" }],
  creator: "Kathir C",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kathirc.dev",
    title: "Kathir C | Backend Engineer | Cloud & AI Systems",
    description: "Portfolio of Kathir C — backend engineering, cloud automation, AWS, Terraform, and AI-driven software systems.",
    siteName: "Kathir C Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kathir C | Backend Engineer | Cloud & AI Systems",
    description: "Portfolio of Kathir C — backend engineering, cloud automation, and AI systems.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://kathirc.dev" />
        <meta name="theme-color" content="#08090B" />
      </head>
      <body>{children}</body>
    </html>
  );
}
