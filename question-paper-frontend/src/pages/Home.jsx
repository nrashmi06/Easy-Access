import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import LoadingSpinner from "../components/LoadingSpinner"; // ✅ Import it

const Features = lazy(() => import("../components/Features"));
const Footer = lazy(() => import("../components/Footer"));

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

        <Suspense fallback={<LoadingSpinner />}>
          <section id="about">
            <Features />
          </section>
        </Suspense>
      </main>

      <Suspense fallback={<LoadingSpinner />}>
        <section id="contact">
          <Footer />
        </section>
      </Suspense>
    </div>
  );
}
