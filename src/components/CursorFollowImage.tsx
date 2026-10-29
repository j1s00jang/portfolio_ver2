"use client";

import { createPortal } from "react-dom";

const TIP_SIZE_PX = 128;
const TIP_GAP_PX = 16;

type Props = {
    x: number;
    y: number;
    src: string;
    alt: string;
};

export function CursorFollowImage({ x, y, src, alt }: Props) {
    const placeLeft =
        x + TIP_GAP_PX + TIP_SIZE_PX > window.innerWidth - 12;

    return createPortal(
        <div
            role="tooltip"
            className="pointer-events-none fixed z-[100] overflow-hidden rounded-md border border-border bg-muted shadow-sm"
            style={{
                width: TIP_SIZE_PX,
                height: TIP_SIZE_PX,
                left: placeLeft ? x - TIP_GAP_PX : x + TIP_GAP_PX,
                top: y + 18,
                transform: placeLeft ? "translateX(-100%)" : undefined,
            }}
        >
            <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover"
                draggable={false}
            />
        </div>,
        document.body,
    );
}
