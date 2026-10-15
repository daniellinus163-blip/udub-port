"use client";

import { useTheme } from "@/contexts/ThemeContext";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 border-2 border-black px-3 py-2 shadow-[2px_2px_0px_#000000]" style={{ backgroundColor: 'var(--surface-card)' }}>
      <button
        onClick={() => setTheme("black")}
        className={`w-6 h-6 rounded-sm border-2 border-black transition-all ${
          theme === "black" ? "bg-[#0A0A0F] scale-110" : "bg-gray-200"
        }`}
        title="Dark Mode"
      />
      <button
        onClick={() => setTheme("light")}
        className={`w-6 h-6 rounded-sm border-2 border-black transition-all ${
          theme === "light" ? "bg-[#FFFBF0] scale-110" : "bg-gray-200"
        }`}
        title="Light Mode"
      />
    </div>
  );
}
