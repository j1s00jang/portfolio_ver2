import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CaseStudyEmbedImage } from "../components/CaseStudyEmbedImage";
import { Nav } from "../components/Nav";
import { SectionNav, scaffoldSections } from "../components/SectionNav";
import { getProject, projects, type Project } from "../lib/projects";
import type { CaseStudyBlock, CaseStudyStatItem } from "../lib/projects/types";

/** Wrap segments in `**like this**` as <strong>. */
function formatInlineBold(text: string): ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong
                    key={i}
                    className="font-semibold text-foreground"
                >
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return part;
    });
}

/** Numbered list line: "1. …" or "**1. …" (bold heading bullet). */
function isNumberedBulletLine(para: string): boolean {
    return /^\d+\.\s/.test(para) || /^\*\*\d+\.\s/.test(para);
}

/** Tighten vertical gap between numbered lines (e.g. "1. …") while keeping normal paragraphs looser. */
function groupParagraphRuns(paragraphs: string[]) {
    const groups: { numbered: boolean; items: string[] }[] = [];
    for (const para of paragraphs) {
        const numbered = isNumberedBulletLine(para);
        const prev = groups[groups.length - 1];
        if (prev && prev.numbered === numbered) {
            prev.items.push(para);
        } else {
            groups.push({ numbered, items: [para] });
        }
    }
    return groups;
}

function formatStatNumber(value: number): string {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function AnimatedStatNumber({
    value,
    suffix,
    delay = 0,
    active,
}: {
    value: number;
    suffix: string;
    delay?: number;
    active: boolean;
}) {
    const [text, setText] = useState("0");

    useEffect(() => {
        if (!active) return;
        const decimals = Number.isInteger(value) ? 0 : 1;
        const controls = animate(0, value, {
            delay,
            duration: 1.35,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (latest) => {
                const n =
                    decimals === 0
                        ? Math.round(latest)
                        : Math.round(latest * 10) / 10;
                setText(formatStatNumber(n));
            },
        });
        return () => controls.stop();
    }, [value, delay, active]);

    return (
        <span className="tabular-nums">
            {text}
            {suffix}
        </span>
    );
}

function StatHeadline({
    stat,
    delay,
    active,
}: {
    stat: CaseStudyStatItem;
    delay: number;
    active: boolean;
}) {
    const hasSubline =
        stat.headlineBottom != null && stat.headlineBottom !== "";
    const topSuffix = hasSubline ? (stat.suffix ?? "") : (stat.suffix ?? "%");

    if (hasSubline) {
        return (
            <span className="flex flex-col items-start gap-2 leading-none">
                <AnimatedStatNumber
                    value={stat.value}
                    suffix={topSuffix}
                    delay={delay}
                    active={active}
                />
                <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                        active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{
                        duration: 0.5,
                        delay: delay + 0.15,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {stat.headlineBottom}
                </motion.span>
            </span>
        );
    }

    return (
        <AnimatedStatNumber
            value={stat.value}
            suffix={topSuffix}
            delay={delay}
            active={active}
        />
    );
}

function CaseStudyStatsRow({
    stats,
    tightBottom = false,
}: {
    stats: CaseStudyStatItem[];
    /** Less padding below when a follow-up paragraph sits directly under the grid. */
    tightBottom?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.35 });

    const padding = tightBottom
        ? "pt-10 pb-4 sm:pt-14 sm:pb-5 md:pt-16 md:pb-6"
        : "py-10 sm:py-14 md:py-16";

    return (
        <div
            ref={ref}
            className={`grid w-full max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:gap-12 ${padding}`}
        >
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="stat-item flex min-w-0 flex-col gap-3 text-left"
                >
                    <p className="font-display text-4xl font-semibold leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl">
                        <StatHeadline
                            stat={stat}
                            delay={i * 0.12}
                            active={inView}
                        />
                    </p>
                    <p className="text-lg leading-relaxed text-foreground/85">
                        {formatInlineBold(stat.label)}
                    </p>
                </div>
            ))}
        </div>
    );
}

function renderCaseStudyBlocks(blocks: CaseStudyBlock[]): ReactNode[] {
    const out: ReactNode[] = [];
    let stringRun: string[] = [];
    let key = 0;

    const flushStrings = () => {
        if (stringRun.length === 0) return;
        const groups = groupParagraphRuns(stringRun);
        for (const group of groups) {
            out.push(
                <div
                    key={`cs-${key++}`}
                    className={group.numbered ? "space-y-1.5" : "space-y-5"}
                >
                    {group.items.map((para, i) => (
                        <p key={i}>{formatInlineBold(para)}</p>
                    ))}
                </div>,
            );
        }
        stringRun = [];
    };

    for (const block of blocks) {
        if (typeof block === "string") {
            stringRun.push(block);
        } else if ("vspace" in block && block.vspace === true) {
            flushStrings();
            out.push(
                <div
                    key={`cs-${key++}`}
                    className="h-3 shrink-0 md:h-4"
                    aria-hidden
                />,
            );
        } else if (
            "highlight" in block &&
            typeof block.highlight === "string" &&
            block.highlight.length > 0
        ) {
            flushStrings();
            out.push(
                <p
                    key={`cs-${key++}`}
                    className="max-w-3xl text-lg leading-relaxed"
                >
                    <span className="rounded-sm bg-accent px-0.5 py-0.5 font-semibold text-accent-foreground [box-decoration-break:clone] md:px-1 md:py-1 [&_strong]:text-accent-foreground">
                        {formatInlineBold(block.highlight)}
                    </span>
                </p>,
            );
        } else if (
            "image" in block &&
            block.image &&
            typeof block.image.src === "string" &&
            typeof block.image.alt === "string"
        ) {
            flushStrings();
            out.push(
                <CaseStudyEmbedImage
                    key={`cs-${key++}`}
                    src={block.image.src}
                    alt={block.image.alt}
                    objectPosition={block.image.objectPosition}
                    fit={block.image.fit}
                    lightbox={block.image.lightbox === true}
                />,
            );
        } else if (
            "video" in block &&
            block.video &&
            typeof block.video.src === "string"
        ) {
            flushStrings();
            const vidTitle =
                typeof block.video.title === "string" &&
                block.video.title.length > 0
                    ? block.video.title
                    : "Demonstration video";
            const poster =
                typeof block.video.poster === "string" &&
                block.video.poster.length > 0
                    ? block.video.poster
                    : undefined;
            out.push(
                <figure
                    key={`cs-${key++}`}
                    className="my-10 w-full max-w-5xl shrink-0 md:my-14"
                >
                    <video
                        className="mx-auto block h-auto max-h-[min(92vh,1040px)] w-[50%] max-w-none rounded-md border border-border bg-muted"
                        controls
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        poster={poster}
                        aria-label={vidTitle}
                    >
                        <source
                            src={block.video.src}
                            type="video/mp4"
                        />
                    </video>
                </figure>,
            );
        } else if ("ul" in block && Array.isArray(block.ul)) {
            flushStrings();
            out.push(
                <ul
                    key={`cs-${key++}`}
                    className="list-disc space-y-2 pl-6 marker:text-foreground/70"
                >
                    {block.ul.map((item: string, i: number) => (
                        <li key={i}>{formatInlineBold(item)}</li>
                    ))}
                </ul>,
            );
        } else if ("stats" in block && Array.isArray(block.stats)) {
            flushStrings();
            const after =
                "afterStats" in block &&
                typeof block.afterStats === "string" &&
                block.afterStats.length > 0
                    ? block.afterStats
                    : null;
            if (after) {
                out.push(
                    <div
                        key={`cs-${key++}`}
                        className="space-y-3"
                    >
                        <CaseStudyStatsRow
                            stats={block.stats}
                            tightBottom
                        />
                        <p className="max-w-3xl text-lg leading-relaxed text-foreground/85">
                            {formatInlineBold(after)}
                        </p>
                    </div>,
                );
            } else {
                out.push(
                    <CaseStudyStatsRow
                        key={`cs-${key++}`}
                        stats={block.stats}
                    />,
                );
            }
        }
    }
    flushStrings();

    return out;
}

function CaseStudySectionBody({
    sectionId,
    project,
}: {
    sectionId: string;
    project: Project;
}) {
    if (sectionId === "overview") {
        return (
            <div className="space-y-5 text-lg leading-relaxed text-foreground/85 max-w-3xl">
                {project.overview?.map((para: string, i: number) => (
                    <p key={i}>{formatInlineBold(para)}</p>
                ))}
            </div>
        );
    }

    const blocks = project.caseStudySections?.[sectionId];
    if (blocks?.length) {
        const useWideReadingColumn = blocks.some(
            (b: CaseStudyBlock) =>
                typeof b === "object" &&
                b !== null &&
                ("stats" in b || "image" in b || "video" in b),
        );
        return (
            <div
                className={`space-y-5 text-lg leading-relaxed text-foreground/85 ${
                    useWideReadingColumn ? "max-w-5xl" : "max-w-3xl"
                }`}
            >
                {renderCaseStudyBlocks(blocks)}
            </div>
        );
    }

    return (
        <p className="text-lg text-foreground/60 max-w-3xl">
            Content coming soon!
        </p>
    );
}

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
    const idx = projects.findIndex((p: Project) => p.slug === project.slug);
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

            {/* Intro visuals — up to four per project (`project.introVisuals`). Side nav reveals after this block scrolls past. */}
            <section
                id="intro-visuals"
                className="px-6 md:px-10 pb-24 md:pb-32"
            >
                <div className="mx-auto max-w-[1440px] grid gap-4 sm:grid-cols-2">
                    {[0, 1, 2, 3].map((i) => {
                        const tile = project.introVisuals?.[i];
                        return (
                            <div
                                key={i}
                                className={`aspect-[4/3] overflow-hidden rounded-md border border-border ${
                                    tile
                                        ? "bg-muted"
                                        : "flex items-center justify-center bg-secondary"
                                }`}
                            >
                                {tile ? (
                                    <img
                                        src={tile.src}
                                        alt={tile.alt}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                ) : (
                                    <span className="text-xs text-muted-foreground">
                                        Visual {i + 1}
                                    </span>
                                )}
                            </div>
                        );
                    })}
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
                            <CaseStudySectionBody
                                sectionId={s.id}
                                project={project}
                            />
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
