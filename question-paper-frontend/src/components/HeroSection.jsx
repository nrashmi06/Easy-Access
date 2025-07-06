import { useMemo } from "react";
import useTheme from "../hooks/useTheme";

export default function HeroSection() {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  // Dynamically compute background gradient
  const backgroundStyle = useMemo(() => {
    return {
      background: isDark
        ? "linear-gradient(90deg, rgb(36, 126, 131) 0%, rgb(2, 62, 30) 50%, rgb(187, 189, 144) 100%)"
        : "linear-gradient(90deg, rgba(191, 232, 255, 1) 0%, rgba(171, 217, 190, 1) 50%, rgba(255, 248, 168, 1) 100%)",
    };
  }, [isDark]);

  return (
    <>
      {/* Hero Section */}
      <div className="hero min-h-[80vh] relative transition-colors duration-500" id="home" style={backgroundStyle}>
                <div className="hero-content text-center container mx-auto relative z-10">
          <div className={`max-w-xl mx-auto ${isDark ? "text-white" : "text-black"}`}>
            <h1 className="text-5xl font-bold">Access Question Papers Easily</h1>
            <p className="py-6">
              Your centralized platform for previous years' question papers, organized and easy to find.
            </p>
            <a href="#about" className="btn btn-primary scroll-smooth">
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-base-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary">About Easy Access</h2>
          <p className="text-base-content text-lg leading-relaxed">
            Easy Access helps students find and review previous years' question papers effortlessly.
            Organized by subjects, departments, and years, we empower you to prepare smarter and faster.
          </p>
        </div>
      </section>
    </>
  );
}
