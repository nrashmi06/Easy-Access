import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <section id="about">
          <Features />
        </section>
      </main>

      <section id="contact">
        <Footer />
      </section>
    </div>
  );
}
