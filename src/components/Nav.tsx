import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const items = [
  { num: "01", label: "WORK", href: "#work" },
  { num: "02", label: "ABOUT", href: "#about" },
  { num: "03", label: "CONTACT", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-background/75 border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <div className="flex-1 flex justify-start">
          <Link
            to="/"
            className="font-mono text-xs font-medium uppercase tracking-[0.2em] hover:text-accent transition-colors"
          >
            JISOO JANG
            <span className="ml-2 text-muted-foreground font-normal hidden sm:inline">
              <span className="text-accent">—</span> PRODUCT DESIGNER
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-7 font-mono text-xs uppercase tracking-[0.2em]">
          {items.map((it) =>
            onHome ? (
              <a
                key={it.label}
                href={it.href}
                className="relative text-foreground/80 hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
              >
                <span className="text-accent">{it.num}</span> {it.label}
              </a>
            ) : (
              <Link
                key={it.label}
                to="/"
                hash={it.href.slice(1)}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                <span className="text-accent">{it.num}</span> {it.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex-1 flex justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
