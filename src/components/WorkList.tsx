import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export function WorkList() {
    return (
        <section
            id="work"
            className="px-6 md:px-10 py-24 md:py-40 scroll-mt-20"
        >
            <div className="mx-auto max-w-[1440px]">
                <div className="mb-14 flex items-baseline justify-between">
                    <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Work
                    </h2>
                    <span className="font-mono text-xs text-muted-foreground tabular-nums uppercase tracking-[0.15em]">
                        {String(projects.length).padStart(2, "0")} Projects
                    </span>
                </div>

                <ul className="border-t border-border/70">
                    {projects.map((p, i) => (
                        <motion.li
                            key={p.slug}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.05,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="border-b border-border/70"
                        >
                            <Link
                                to="/work/$slug"
                                params={{ slug: p.slug }}
                                className="group block py-7 md:py-9"
                                onClick={() => {
                                    window.history.replaceState(
                                        null,
                                        "",
                                        `${window.location.pathname}#work`,
                                    );
                                }}
                            >
                                <div className="flex items-center justify-between gap-6">
                                    <div className="flex items-baseline gap-6 md:gap-10 min-w-0">
                                        <span className="font-mono text-xs text-muted-foreground tabular-nums w-8 shrink-0">
                                            0{i + 1}
                                        </span>
                                        <h3 className="font-display text-3xl md:text-6xl font-medium tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:text-accent">
                                            {p.title}
                                        </h3>
                                    </div>
                                    <div className="hidden md:flex flex-1 items-center justify-end gap-10">
                                        <span className="text-sm text-muted-foreground">
                                            {p.role}
                                        </span>
                                        <span className="text-sm text-muted-foreground tabular-nums w-44 text-right">
                                            {p.year}
                                        </span>
                                        <ArrowUpRight
                                            className="h-5 w-5 transition-all duration-500 ease-out group-hover:rotate-45 group-hover:text-accent"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                </div>
                                <p className="md:hidden mt-3 ml-14 text-sm text-muted-foreground">
                                    {p.year} · {p.role}
                                </p>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
