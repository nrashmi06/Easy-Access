import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-base-300 text-base-content">
      <div className="px-10 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <div className="text-xl font-bold text-primary mb-1">EasyAccess</div>
            <p className="text-sm opacity-70">
              Providing reliable academic content since 2024.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a href="#about" className="link link-hover text-sm opacity-70 hover:opacity-100">
              About
            </a>
            <a href="#contact" className="link link-hover text-sm opacity-70 hover:opacity-100">
              Contact
            </a>
            <a href="#" className="link link-hover text-sm opacity-70 hover:opacity-100">
              Privacy
            </a>
            <a 
              href="#" 
              className="text-base-content/60 hover:text-primary transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-base-content/10 px-10 py-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-70">
            © 2025 <span className="font-semibold text-primary">EasyAccess</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}