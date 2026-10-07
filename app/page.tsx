import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import CSFoundations from "@/components/CSFoundations";
import GitHubSection from "@/components/GitHubSection";
import ResumeCTA from "@/components/ResumeCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Spotlight from "@/components/Spotlight";

function Divider() {
  return (
    <div style={{
      maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
    }}>
      <div className="section-divider" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Spotlight />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Certifications />
        <Divider />
        <Education />
        <Divider />
        <CSFoundations />
        <Divider />
        <GitHubSection />
        <ResumeCTA />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
