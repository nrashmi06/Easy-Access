import { useEffect, useState } from "react";

export default function useTheme(defaultTheme = "light") {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "forest") return "dark";
      if (saved === "lemonade") return "light";

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const daisyTheme = theme === "dark" ? "forest" : "lemonade";
    document.documentElement.setAttribute("data-theme", daisyTheme);
    localStorage.setItem("theme", daisyTheme);
  }, [theme]);

  // ⬇️ Optional: Listen to external theme toggle (e.g. from a button elsewhere)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "forest" ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return [theme, setTheme];
}
