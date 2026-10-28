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
};

export function CursorSpeechBubble({ x, y, children }: Props) {
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
            <div className="rounded-lg bg-[var(--background-dark)] px-3.5 py-2.5 text-[var(--background-light)] shadow-sm dark:bg-[var(--background-light)] dark:text-[var(--background-dark)]">
                <p className="font-sans text-sm leading-snug tracking-normal normal-case">
                    {children}
                </p>
            </div>
        </div>,
        document.body,
    );
}
