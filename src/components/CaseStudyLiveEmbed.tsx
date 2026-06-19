"use client";

import { useEffect, useRef, useState } from "react";

export type LiveEmbedScaling = "fit-width" | "fixed";

type Props = {
    url: string;
    title?: string;
    heightCss?: string;
    aspectRatio?: string;
    scaling?: LiveEmbedScaling;
    /** Reference viewport width for `fit-width` scaling. */
    designWidth?: number;
    /** Reference viewport height for `fit-width` scaling. */
    designHeight?: number;
};

export function CaseStudyLiveEmbed({
    url,
    title = "Live prototype",
    heightCss = "min(75vh, 820px)",
    aspectRatio,
    scaling = "fit-width",
    designWidth = 1440,
    designHeight = 900,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const fillsFrame = Boolean(aspectRatio?.trim());

    useEffect(() => {
        if (scaling !== "fit-width") return;
        const el = containerRef.current;
        if (!el) return;

        const update = () => {
            setScale(el.clientWidth / designWidth);
        };

        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, [scaling, designWidth]);

    return (
        <figure className="my-10 w-full max-w-5xl shrink-0 md:my-14">
            <div className="overflow-hidden rounded-md border border-border bg-muted">
                {scaling === "fit-width" ? (
                    <div
                        ref={containerRef}
                        className="relative w-full overflow-hidden"
                        style={{ height: designHeight * scale }}
                    >
                        <iframe
                            src={url}
                            title={title}
                            className="absolute left-0 top-0 border-0"
                            style={{
                                width: designWidth,
                                height: designHeight,
                                transform: `scale(${scale})`,
                                transformOrigin: "top left",
                            }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                ) : (
                    <div
                        className="flex w-full"
                        style={
                            fillsFrame
                                ? { aspectRatio: aspectRatio!.trim() }
                                : { height: heightCss }
                        }
                    >
                        <iframe
                            src={url}
                            title={title}
                            className="h-full w-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                )}
            </div>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:text-xs md:tracking-[0.2em]">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-accent"
                >
                    + Click here to open in a new tab 🔗
                </a>
            </figcaption>
        </figure>
    );
}
