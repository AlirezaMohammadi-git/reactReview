import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useLocalStorage(
    "theme",
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)} className={className}>
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
