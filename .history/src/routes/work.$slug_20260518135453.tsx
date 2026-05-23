import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { SectionNav, scaffoldSections } from "@/components/SectionNav";
import { getProject, projects } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
    loader: ({ params }) => {
        const project = getProject(params.slug);
        if (!project) throw notFound();
        return project;
    },
    head: ({ loaderData }) => ({
        meta: [
            { title: `${loaderData?.title ?? "Project"} — Jisoo Jang` },
            { name: "description", content: loaderData?.summary ?? "" },
            {
                property: "og:title",
                content: `${loaderData?.title ?? "Project"} — Jisoo Jang`,
            },
            { property: "og:description", content: loaderData?.summary ?? "" },
        ],
    }),
    notFoundComponent: () => (
        <div className="flex min-h-screen items-center justify-center px-6">
            <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    404
                </p>
                <h1 className="font-display text-4xl mb-6">
                    Project not found
                </h1>
                <Link
                    to="/"
                    className="text-accent underline underline-offset-4"
                >
                    Back home
                </Link>
            </div>
        </div>
    ),
    errorComponent: ({ error }) => (
        <div className="flex min-h-screen items-center justify-center px-6">
            <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
    ),
    component: ProjectPage,
});

function ProjectPage() {
    const project = Route.useLoaderData();
    const idx = projects.findIndex((p) => p.slug === project.slug);
    const next = projects[(idx + 1) % projects.length];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Nav />
            <SectionNav
                sections={scaffoldSections}
                revealAfterSelector="#intro-visuals"
                hideWhenPastSelector="#next-project"
            />

            <article className="px-6 md:px-10 pt-32 pb-24">
                <div className="mx-auto max-w-[1440px]">
                    <Link
                        to="/"
                        hash="work"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-16"
                    >
                        <ArrowLeft className="h-4 w-4" /> All work
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.95] tracking-tight"
                    >
                        {project.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-6 max-w-2xl text-lg md:text-xl text-foreground/70"
                    >
                        {project.summary}
                    </motion.p>
                </div>
            </article>

            {/* Intro visuals — 4 placeholders. Side nav reveals after this block scrolls past. */}
            <section
                id="intro-visuals"
                className="px-6 md:px-10 pb-24 md:pb-32"
            >
                <div className="mx-auto max-w-[1440px] grid gap-4 sm:grid-cols-2">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="aspect-[4/3] rounded-md border border-border bg-secondary flex items-center justify-center text-xs text-muted-foreground"
                        >
                            Visual {i + 1}
                        </div>
                    ))}
                </div>
            </section>

            {/* Case study sections */}
            <div className="px-6 md:px-10 pb-24 md:pb-40">
                <div className="mx-auto max-w-[1440px] lg:pl-64 space-y-24 md:space-y-32">
                    {scaffoldSections.map((s) => (
                        <section
                            key={s.id}
                            id={s.id}
                            className="scroll-mt-24"
                        >
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                                <span className="text-accent">{s.num}</span>{" "}
                                &nbsp; {s.label}
                            </p>
                            <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-6">
                                {s.label}
                            </h2>
                            {s.id === "overview" ? (
                                <div className="space-y-5 text-lg leading-relaxed text-foreground/85 max-w-3xl">
                                    {project.overview?.map(
                                        (p: string, i: number) => (
                                            <p key={i}>{p}</p>
                                        ),
                                    )}
                                </div>
                            ) : (
                                <p className="text-lg text-foreground/60 max-w-3xl">
                                    Content coming soon!
                                </p>
                            )}
                        </section>
                    ))}
                </div>
            </div>

            {/* Next project — sentinel for SectionNav: nav hides when this block reaches mid-viewport */}
            <section
                id="next-project"
                className="border-t border-border/70 px-6 md:px-10 py-16 md:py-24"
            >
                <div className="mx-auto max-w-[1440px]">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                        Next project
                    </p>
                    <Link
                        to="/work/$slug"
                        params={{ slug: next.slug }}
                        className="group flex items-center justify-between"
                    >
                        <h3 className="font-display text-4xl md:text-7xl font-medium tracking-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent">
                            {next.title}
                        </h3>
                        <ArrowUpRight
                            className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45 group-hover:text-accent"
                            strokeWidth={1.5}
                        />
                    </Link>
                </div>
            </section>
        </main>
    );
}
