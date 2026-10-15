"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "black" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("black");

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && (savedTheme === "black" || savedTheme === "light")) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("theme", theme);

    // Update CSS variables based on theme
    const root = document.documentElement;
    if (theme === "black") {
      root.style.setProperty("--background", "#0A0A0F");
      root.style.setProperty("--background-secondary", "#151520");
      root.style.setProperty("--foreground", "#F8FAFC");
      root.style.setProperty("--foreground-secondary", "#E2E8F0");
      root.style.setProperty("--surface-card", "#151520");
      root.style.setProperty("--accent-orange", "#FF6B35");
      root.style.setProperty("--accent-lime", "#A3E635");
      root.style.setProperty("--accent-purple", "#7C3AED");
      root.style.setProperty("--accent-blue", "#00E5FF");
      root.style.setProperty("--text-muted", "#94A3B8");
    } else if (theme === "light") {
      root.style.setProperty("--background", "#FFFBF0");
      root.style.setProperty("--background-secondary", "#F5F0E6");
      root.style.setProperty("--foreground", "#000000");
      root.style.setProperty("--foreground-secondary", "#1A1A1A");
      root.style.setProperty("--surface-card", "#FFFFFF");
      root.style.setProperty("--accent-orange", "#FF6B35");
      root.style.setProperty("--accent-lime", "#A3E635");
      root.style.setProperty("--accent-purple", "#7C3AED");
      root.style.setProperty("--accent-blue", "#0066FF");
      root.style.setProperty("--text-muted", "#4B5563");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
