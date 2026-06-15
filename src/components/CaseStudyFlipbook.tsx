"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import HTMLFlipBook from "react-pageflip";

import type { FlipbookPage } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

type Props = {
    pages: readonly FlipbookPage[];
    title?: string;
};

/** StPageFlip page — ref required by react-pageflip. */
const FlipPage = forwardRef<
    HTMLDivElement,
    { page: FlipbookPage; hard?: boolean }
>(function FlipPage({ page, hard }, ref) {
    return (
        <div
            ref={ref}
            className={cn(
                "h-full w-full overflow-hidden rounded-[4px] bg-transparent shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
                hard && "shadow-[0_6px_20px_rgba(0,0,0,0.18)]",
            )}
            data-density={hard ? "hard" : "soft"}
        >
            <img
                src={page.src}
                alt={page.alt}
                className="block h-full w-full select-none object-cover"
                draggable={false}
            />
        </div>
    );
});

type PageFlipApi = {
    flipNext: (corner?: "top" | "bottom") => void;
    flipPrev: (corner?: "top" | "bottom") => void;
    getCurrentPageIndex: () => number;
    getPageCount: () => number;
};

type FlipBookHandle = {
    pageFlip: () => PageFlipApi;
};

const PAGE_WIDTH = 400;
const PAGE_HEIGHT = Math.round((PAGE_WIDTH * 3300) / 2400);

function pageStatusLabel(
    pages: readonly FlipbookPage[],
    index: number,
): string {
    if (index <= 0) return "Cover";
    if (index >= pages.length - 1) return "Back cover";
    return `Page ${index + 1} / ${pages.length}`;
}

export function CaseStudyFlipbook({
    pages,
    title = "Brochure flipbook",
}: Props) {
    const bookRef = useRef<FlipBookHandle>(null);
    const [mounted, setMounted] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        for (const page of pages) {
            const img = new Image();
            img.src = page.src;
        }
    }, [pages]);

    const onFlip = useCallback((event: { data: number }) => {
        setPageIndex(event.data);
    }, []);

    const flipNext = useCallback(() => {
        bookRef.current?.pageFlip().flipNext();
    }, []);

    const flipPrev = useCallback(() => {
        bookRef.current?.pageFlip().flipPrev();
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") flipNext();
            if (event.key === "ArrowLeft") flipPrev();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [flipNext, flipPrev]);

    if (pages.length === 0) return null;

    const canGoPrev = pageIndex > 0;
    const canGoNext = pageIndex < pages.length - 1;
    const isCoverView = pageIndex === 0;

    return (
        <div
            className="relative my-10 w-full max-w-5xl md:my-14"
            role="region"
            aria-label={title}
        >
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
                {mounted ? (
                    <HTMLFlipBook
                        ref={bookRef}
                        width={PAGE_WIDTH}
                        height={PAGE_HEIGHT}
                        size="stretch"
                        minWidth={280}
                        maxWidth={720}
                        minHeight={380}
                        maxHeight={990}
                        drawShadow
                        flippingTime={1000}
                        usePortrait
                        maxShadowOpacity={0.55}
                        showCover
                        mobileScrollSupport
                        useMouseEvents
                        showPageCorners
                        swipeDistance={30}
                        className="mx-auto"
                        onFlip={onFlip}
                    >
                        {pages.map((page, index) => (
                            <FlipPage
                                key={page.src}
                                page={page}
                                hard={
                                    index === 0 ||
                                    index === pages.length - 1
                                }
                            />
                        ))}
                    </HTMLFlipBook>
                ) : (
                    <div
                        className="w-full max-w-[720px] rounded-md border border-border bg-muted shadow-[0_24px_48px_-12px_rgba(0,0,0,0.28)]"
                        style={{ aspectRatio: "4800 / 3300" }}
                        aria-hidden
                    />
                )}

                <div className="mt-4 flex w-full max-w-[720px] items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={flipPrev}
                        disabled={!canGoPrev}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 md:h-10 md:w-10"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                    </button>

                    <p
                        className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
                        aria-live="polite"
                    >
                        {pageStatusLabel(pages, pageIndex)}
                    </p>

                    <button
                        type="button"
                        onClick={flipNext}
                        disabled={!canGoNext}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 md:h-10 md:w-10"
                        aria-label="Next page"
                    >
                        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                </div>

                <p className="mt-2 text-center text-xs text-muted-foreground">
                    {isCoverView
                        ? "Drag the corner or click to open the brochure"
                        : "Drag, click the edges, or use arrow keys to flip"}
                </p>
            </div>
        </div>
    );
}
