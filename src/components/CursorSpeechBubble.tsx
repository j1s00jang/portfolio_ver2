"use client";

import type { ReactNode } from "react";
import { createPortal } from "react-dom";

/** Approx bubble width; used to flip when near the right edge. */
const TIP_WIDTH_PX = 288;
const TIP_GAP_PX = 16;

type Props = {
    x: number;
    y: number;
    children: ReactNode;
    /** `glass` = Hero mono tip; `solid` = readable Work tip (Almarai). */
    variant?: "glass" | "solid";
};

export function CursorSpeechBubble({
    x,
    y,
    children,
    variant = "glass",
}: Props) {
    const placeLeft = x + TIP_GAP_PX + TIP_WIDTH_PX > window.innerWidth - 12;

    return createPortal(
        <div
            role="tooltip"
            className="pointer-events-none fixed z-[100] w-[min(18rem,calc(100vw-1.5rem))]"
            style={{
                left: placeLeft ? x - TIP_GAP_PX : x + TIP_GAP_PX,
                top: y + 18,
                transform: placeLeft ? "translateX(-100%)" : undefined,
            }}
        >
            {variant === "solid" ? (
                <div className="rounded-lg bg-[var(--background-dark)] px-3.5 py-2.5 text-[var(--background-light)] shadow-sm dark:bg-[var(--background-light)] dark:text-[var(--background-dark)]">
                    <p className="font-sans text-sm leading-snug tracking-normal normal-case">
                        {children}
                    </p>
                </div>
            ) : (
                <div className="rounded-lg border border-accent/70 bg-background/55 px-3.5 py-2.5 text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-accent/60 dark:bg-background/60 dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                    <p className="font-mono text-[10px] uppercase leading-snug tracking-[0.14em] md:text-[11px]">
                        {children}
                    </p>
                </div>
            )}
        </div>,
        document.body,
    );
}
