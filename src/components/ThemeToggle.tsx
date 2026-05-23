import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-foreground"
    >
      <span className="min-w-0 shrink text-right">{isDark ? "LIGHT" : "DARK"}</span>
      <span
        className={cn(
          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 transition-[background-color,border-color,color] duration-200 [&_svg]:transition-colors",
          !isDark &&
            "group-hover:border-white group-hover:bg-[oklch(0.18_0.005_80)] [&_svg]:text-foreground group-hover:[&_svg]:text-white",
          isDark &&
            "group-hover:border-[oklch(0.262_0_0)] group-hover:bg-[oklch(0.978_0.008_80)] [&_svg]:text-foreground group-hover:[&_svg]:text-[oklch(0.262_0_0)]",
        )}
      >
        {isDark ? (
          <Sun size={14} strokeWidth={1.75} className="shrink-0" />
        ) : (
          <Moon size={14} strokeWidth={1.75} className="shrink-0" />
        )}
      </span>
    </button>
  );
}
