"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export type FigmaPrototypeScaling =
    | "scale-down"
    | "contain"
    | "min-zoom"
    | "scale-down-width"
    | "fit-width"
    | "free";

export type FigmaEmbedTab = {
    label: string;
    url: string;
};

type FigmaEmbedOptions = {
    scaling?: FigmaPrototypeScaling;
    contentScaling?: "fixed" | "responsive";
    deviceFrame?: boolean;
    footer?: boolean;
    hotspotHints?: boolean;
};

function buildFigmaEmbedSrc(
    shareUrl: string,
    opts?: FigmaEmbedOptions,
): string {
    try {
        const url = new URL(shareUrl);
        url.searchParams.delete("t");
        url.searchParams.delete("m");

        if (url.pathname.includes("/proto/")) {
            url.searchParams.set("scaling", opts?.scaling ?? "scale-down-width");
            url.searchParams.set(
                "content-scaling",
                opts?.contentScaling ?? "fixed",
            );
            url.searchParams.set(
                "device-frame",
                opts?.deviceFrame === true ? "true" : "false",
            );
            url.searchParams.set(
                "footer",
                opts?.footer === true ? "true" : "false",
            );
            url.searchParams.set(
                "hotspot-hints",
                opts?.hotspotHints === true ? "true" : "false",
            );
        }

        return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url.toString())}`;
    } catch {
        return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(shareUrl)}`;
    }
}

export function CaseStudyFigmaEmbed({
    url,
    title = "Figma board",
    heightCss = "min(72vh, 720px)",
    aspectRatio,
    tabs,
    scaling,
    contentScaling,
    deviceFrame,
    footer,
    hotspotHints,
}: {
    url: string;
    title?: string;
    /** Fixed height for boards. Ignored when `aspectRatio` is set. */
    heightCss?: string;
    /** Match the Figma frame ratio so the prototype fills the embed box. */
    aspectRatio?: string;
    tabs?: readonly FigmaEmbedTab[];
    scaling?: FigmaPrototypeScaling;
    contentScaling?: "fixed" | "responsive";
    deviceFrame?: boolean;
    footer?: boolean;
    hotspotHints?: boolean;
}) {
    const embedOpts: FigmaEmbedOptions = {
        scaling,
        contentScaling,
        deviceFrame,
        footer,
        hotspotHints,
    };

    const resolvedTabs: FigmaEmbedTab[] =
        tabs && tabs.length > 0 ? [...tabs] : [{ label: "View", url }];

    const [activeIndex, setActiveIndex] = useState(0);
    const active = resolvedTabs[activeIndex] ?? resolvedTabs[0];
    const fillsFrame = Boolean(aspectRatio?.trim());

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

                <div
                    className="flex w-full"
                    style={
                        fillsFrame
                            ? { aspectRatio: aspectRatio!.trim() }
                            : { height: heightCss }
                    }
                >
                    <iframe
                        key={active.url}
                        id={`figma-panel-${active.label}`}
                        src={buildFigmaEmbedSrc(active.url, embedOpts)}
                        title={`${title} — ${active.label}`}
                        className="h-full w-full border-0"
                        allowFullScreen
                    />
                </div>
            </div>
        </figure>
    );
}
