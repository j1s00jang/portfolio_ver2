"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

function figmaEmbedSrc(shareUrl: string) {
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(shareUrl)}`;
}

export type FigmaEmbedTab = {
    label: string;
    url: string;
};

export function CaseStudyFigmaEmbed({
    url,
    title = "Figma board",
    heightCss = "min(72vh, 720px)",
    tabs,
}: {
    url: string;
    title?: string;
    heightCss?: string;
    tabs?: readonly FigmaEmbedTab[];
}) {
    const resolvedTabs: FigmaEmbedTab[] =
        tabs && tabs.length > 0 ? [...tabs] : [{ label: "View", url }];

    const [activeIndex, setActiveIndex] = useState(0);
    const active = resolvedTabs[activeIndex] ?? resolvedTabs[0];

    return (
        <figure className="my-10 w-full max-w-5xl shrink-0 md:my-14">
            <div className="relative overflow-hidden rounded-md border border-border bg-muted">
                {resolvedTabs.length > 1 ? (
                    <div
                        className="absolute right-3 top-3 z-10 flex flex-wrap justify-end gap-1"
                        role="tablist"
                        aria-label={`${title} views`}
                    >
                        {resolvedTabs.map((tab, i) => (
                            <button
                                key={tab.label}
                                type="button"
                                role="tab"
                                aria-selected={i === activeIndex}
                                aria-controls={`figma-panel-${tab.label}`}
                                onClick={() => setActiveIndex(i)}
                                className={cn(
                                    "rounded-sm border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] backdrop-blur-sm transition-colors",
                                    i === activeIndex
                                        ? "border-accent bg-accent text-accent-foreground"
                                        : "border-border/80 bg-background/90 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                ) : null}

                <div style={{ height: heightCss }}>
                    <iframe
                        key={active.url}
                        id={`figma-panel-${active.label}`}
                        src={figmaEmbedSrc(active.url)}
                        title={`${title} — ${active.label}`}
                        className="h-full w-full border-0"
                        allowFullScreen
                    />
                </div>
            </div>
        </figure>
    );
}
