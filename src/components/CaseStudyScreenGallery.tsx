"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import type { ScreenGalleryItem } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

type Props = {
    screens: readonly ScreenGalleryItem[];
    sidebarTitle?: string;
    sidebar?: readonly string[];
    regionLabel?: string;
};

export function CaseStudyScreenGallery({
    screens,
    sidebarTitle,
    sidebar,
    regionLabel = "Product screens",
}: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    /** width / height — crops previews to the shortest screen. */
    const [previewAspect, setPreviewAspect] = useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;

        Promise.all(
            screens.map(
                (screen) =>
                    new Promise<{ w: number; h: number }>((resolve, reject) => {
                        const img = new Image();
                        img.onload = () =>
                            resolve({
                                w: img.naturalWidth,
                                h: img.naturalHeight,
                            });
                        img.onerror = reject;
                        img.src = screen.src;
                    }),
            ),
        )
            .then((dimensions) => {
                if (cancelled || dimensions.length === 0) return;
                const minHeightRatio = Math.min(
                    ...dimensions.map((d) => d.h / d.w),
                );
                setPreviewAspect(1 / minHeightRatio);
            })
            .catch(() => {
                if (!cancelled) setPreviewAspect(2880 / 1800);
            });

        return () => {
            cancelled = true;
        };
    }, [screens]);

    if (screens.length === 0) return null;

    const selected = screens[selectedIndex] ?? screens[0];

    return (
        <div
            className="my-10 w-full max-w-5xl shrink-0 md:my-14"
            role="region"
            aria-label={regionLabel}
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-10 md:gap-5">
                <aside className="flex flex-col gap-4 md:col-span-2 md:gap-6">
                    {sidebarTitle || (sidebar && sidebar.length > 0) ? (
                        <div className="space-y-3 text-base leading-relaxed text-foreground/85">
                            {sidebarTitle ? (
                                <p className="font-semibold text-foreground">
                                    {sidebarTitle}
                                </p>
                            ) : null}
                            {sidebar && sidebar.length > 0 ? (
                                <ul className="list-disc space-y-1.5 pl-4 marker:text-foreground/40">
                                    {sidebar.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    ) : null}

                    <nav aria-label="Screen list">
                    <ul className="flex flex-row gap-2 overflow-x-auto pb-1 md:flex-col md:gap-0 md:overflow-visible md:pb-0">
                        {screens.map((screen, index) => {
                            const isActive = index === selectedIndex;
                            return (
                                <li
                                    key={screen.src}
                                    className="shrink-0 md:shrink"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedIndex(index)
                                        }
                                        className={cn(
                                            "group flex w-full cursor-pointer items-start gap-2.5 rounded-md px-3 py-2.5 text-left transition-colors duration-300 md:gap-3 md:px-0 md:py-2",
                                            isActive
                                                ? "bg-muted/80 text-foreground md:bg-transparent"
                                                : "text-foreground/40 hover:text-foreground/65",
                                        )}
                                        aria-current={
                                            isActive ? "true" : undefined
                                        }
                                    >
                                        <span
                                            className="mt-[0.55em] hidden w-6 shrink-0 md:flex md:items-start"
                                            aria-hidden
                                        >
                                            <span
                                                className={cn(
                                                    "h-px transition-all duration-300",
                                                    isActive
                                                        ? "w-6 bg-accent"
                                                        : "w-3 bg-foreground/20 group-hover:w-4 group-hover:bg-foreground/30",
                                                )}
                                            />
                                        </span>
                                        <span className="font-mono text-[10px] uppercase leading-snug tracking-[0.18em] md:text-xs md:tracking-[0.2em]">
                                            {screen.navLines ? (
                                                screen.navLines.map(
                                                    (line, lineIndex) => (
                                                        <span
                                                            key={lineIndex}
                                                            className="block"
                                                        >
                                                            {line}
                                                        </span>
                                                    ),
                                                )
                                            ) : (
                                                screen.label
                                            )}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    </nav>
                </aside>

                <div className="md:col-span-8">
                    <DialogPrimitive.Root modal open={modalOpen} onOpenChange={setModalOpen}>
                        <DialogPrimitive.Trigger asChild>
                            <button
                                type="button"
                                className="group block w-full cursor-zoom-in rounded-md border border-border bg-muted p-0 text-left outline-none ring-offset-background transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                aria-label={`View fullscreen: ${selected.label}`}
                            >
                                <div
                                    className="overflow-hidden rounded-md bg-muted"
                                    style={
                                        previewAspect
                                            ? { aspectRatio: previewAspect }
                                            : { aspectRatio: "2880 / 1800" }
                                    }
                                >
                                    <img
                                        src={selected.src}
                                        alt={selected.alt}
                                        className="block h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.008]"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <p className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:text-xs md:tracking-[0.2em]">
                                    {selected.label}
                                    <span className="ml-2 text-foreground/40">
                                        · Click to expand
                                    </span>
                                </p>
                            </button>
                        </DialogPrimitive.Trigger>

                        <DialogPrimitive.Portal>
                            <DialogPrimitive.Overlay
                                className={cn(
                                    "fixed inset-0 z-[100] bg-black/65 backdrop-blur-[2px]",
                                    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                                )}
                            />
                            <DialogPrimitive.Content
                                className={cn(
                                    "fixed inset-0 z-[101] flex flex-col outline-none",
                                    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                                )}
                                onCloseAutoFocus={(e) => e.preventDefault()}
                                aria-describedby={undefined}
                            >
                                <DialogPrimitive.Title className="sr-only">
                                    {selected.alt}
                                </DialogPrimitive.Title>

                                <DialogPrimitive.Close
                                    className="absolute right-5 top-5 z-[110] rounded-full border border-border bg-background/95 p-2.5 text-foreground shadow-md transition-colors hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring md:right-8 md:top-8"
                                    aria-label="Close preview"
                                >
                                    <X
                                        className="h-5 w-5"
                                        strokeWidth={1.75}
                                    />
                                </DialogPrimitive.Close>

                                <div className="flex min-h-0 flex-1 flex-col pt-14 md:pt-16">
                                    <div className="relative flex min-h-0 flex-1 items-center justify-center touch-none px-3 pb-2 md:px-6 md:pb-4">
                                        <TransformWrapper
                                            key={selected.src}
                                            initialScale={1}
                                            minScale={0.35}
                                            maxScale={12}
                                            centerOnInit
                                            centerZoomedOut
                                            wheel={{ step: 0.12 }}
                                            pinch={{ step: 12 }}
                                            doubleClick={{ mode: "reset" }}
                                            panning={{ velocityDisabled: false }}
                                        >
                                            <TransformComponent
                                                wrapperClass="flex h-[min(85dvh,calc(100dvh-6rem))] w-full max-w-[min(95vw,1920px)] items-center justify-center"
                                                contentClass="flex !h-full !w-full items-center justify-center [&>img]:mx-auto [&>img]:my-auto"
                                            >
                                                <img
                                                    src={selected.src}
                                                    alt={selected.alt}
                                                    className="max-h-[min(85dvh,calc(100dvh-6rem))] w-auto max-w-[min(95vw,1920px)] select-none object-contain"
                                                    draggable={false}
                                                />
                                            </TransformComponent>
                                        </TransformWrapper>
                                    </div>
                                    <p className="pointer-events-none shrink-0 px-4 pb-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:text-xs md:tracking-[0.2em]">
                                        Pinch to zoom · Drag to pan ·
                                        Double-click to reset
                                    </p>
                                </div>
                            </DialogPrimitive.Content>
                        </DialogPrimitive.Portal>
                    </DialogPrimitive.Root>
                </div>
            </div>
        </div>
    );
}
