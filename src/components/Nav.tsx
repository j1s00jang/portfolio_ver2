import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const items = [
    { num: "01", label: "WORK", href: "#work" },
    { num: "02", label: "ABOUT", href: "#about" },
    { num: "03", label: "CONTACT", href: "#contact" },
];

const navLinkClass =
    "relative whitespace-nowrap text-foreground/80 transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100";

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
                    ? "border-b border-border/60 bg-background/75 backdrop-blur-md"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-2.5 px-4 md:h-16 md:gap-6 md:px-10">
                <Link
                    to="/"
                    {...(!onHome ? { hash: "work" } : {})}
                    className="shrink-0 whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.14em] transition-colors hover:text-accent md:text-xs md:tracking-[0.2em]"
                >
                    JISOO JANG
                </Link>

                <nav className="ml-auto flex min-w-0 items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.1em] sm:gap-5 md:gap-7 md:text-xs md:tracking-[0.2em]">
                    {items.map((it) => {
                        const label = (
                            <>
                                <span className="text-accent">{it.num}</span>{" "}
                                {it.label}
                            </>
                        );

                        return onHome ? (
                            <a
                                key={it.label}
                                href={it.href}
                                className={navLinkClass}
                            >
                                {label}
                            </a>
                        ) : (
                            <Link
                                key={it.label}
                                to="/"
                                hash={it.href.slice(1)}
                                className="whitespace-nowrap text-foreground/80 transition-colors hover:text-foreground"
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <ThemeToggle />
            </div>
        </header>
    );
}
