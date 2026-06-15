"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type CSSProperties } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { cn } from "@/lib/utils";

const objectPositionClass = {
    center: "object-center",
    top: "object-top",
    bottom: "object-bottom",
    "top-left": "object-left-top",
} as const;

const slotAspectClass = {
    wide: "aspect-[16/10] md:aspect-[21/10]",
    /** Shorter than `wide` — brochure spreads, hero strips. */
    banner: "aspect-[21/8] md:aspect-[3/1]",
    portrait: "aspect-[3/4]",
    tall: "aspect-[2/3] md:aspect-[3/5]",
    /** ~80% of `tall` cell height (same width). */
    compact: "aspect-[5/6] md:aspect-[3/4]",
    /** No fixed aspect — fills stretched grid row (pair with `items-stretch`). */
    rowFill: "",
} as const;

export function CaseStudyEmbedImage({
    src,
    alt,
    objectPosition = "center",
    fit = "cover",
    frame = "slot",
    displayScale,
    slotAspect = "wide",
    lightbox = false,
    embedVariant = "section",
}: {
    src: string;
    alt: string;
    objectPosition?: keyof typeof objectPositionClass;
    /** `contain`: full image centred in frame; `cover`: crop-filled (default). */
    fit?: "cover" | "contain";
    /** `hug`: full-width wrap; `intrinsic`: natural file size, no upscale. */
    frame?: "slot" | "hug" | "intrinsic";
    /** Scales intrinsic width after load (e.g. `0.8` = 80% of file size). */
    displayScale?: number;
    slotAspect?: "wide" | "banner" | "portrait" | "tall" | "compact" | "rowFill";
    lightbox?: boolean;
    /** `gridCell`: no outer section margin — use inside `imagePair` row. */
    embedVariant?: "section" | "gridCell";
}) {
    const posClass = objectPositionClass[objectPosition];
    const fillsRow = slotAspect === "rowFill";
    const stretchInGrid =
        fillsRow || (fit === "contain" && embedVariant === "gridCell");
    const intrinsicFrame = frame === "intrinsic" && fit === "contain";
    const hugFrame = frame === "hug" && fit === "contain";
    const intrinsicScale =
        intrinsicFrame &&
        displayScale != null &&
        displayScale > 0 &&
        displayScale !== 1;
    const scaleWrapStyle: CSSProperties | undefined = intrinsicScale
        ? { zoom: displayScale }
        : undefined;

    const frameShellClass = intrinsicFrame
        ? "overflow-hidden rounded-md border border-border bg-muted w-fit max-w-full"
        : hugFrame
          ? "overflow-hidden rounded-md border border-border bg-muted w-full"
          : fillsRow
            ? "h-full min-h-0 w-full overflow-hidden rounded-md border border-border bg-muted"
            : cn(
                  "overflow-hidden rounded-md border border-border bg-muted",
                  slotAspectClass[slotAspect],
              );

    /** Contain-fit: centre in frame via flex so the bitmap doesn’t cling to edges. */
    const frameWrapClass =
        intrinsicFrame || hugFrame
            ? frameShellClass
            : fit === "contain"
              ? cn(frameShellClass, "flex h-full w-full items-center justify-center")
              : frameShellClass;

    const imgClass = intrinsicFrame
        ? cn(
              "block h-auto w-auto max-w-full",
              lightbox &&
                  "transition-transform duration-300 ease-out group-hover:scale-[1.015]",
          )
        : hugFrame
          ? cn(
                "block h-auto w-full max-w-full",
                lightbox &&
                    "transition-transform duration-300 ease-out group-hover:scale-[1.015]",
            )
          : fit === "contain"
            ? cn(
                  intrinsicFrame || hugFrame
                      ? "max-h-full max-w-full object-contain object-center"
                      : "h-full w-full object-contain object-center",
                  lightbox &&
                      "transition-transform duration-300 ease-out group-hover:scale-[1.015]",
              )
            : cn(
                  "h-full w-full object-cover",
                  posClass,
                  lightbox &&
                      "transition-transform duration-300 ease-out group-hover:scale-[1.015]",
              );

    const embedVariantClasses =
        embedVariant === "gridCell"
            ? cn(
                  "my-0 min-h-0 w-full min-w-0 max-w-none",
                  stretchInGrid && "flex flex-1 flex-col",
              )
            : intrinsicFrame
              ? "my-10 w-fit max-w-full md:my-14"
              : "my-10 w-full max-w-5xl md:my-14";

    const figureClassName = cn(
        "shrink-0",
        embedVariantClasses,
        stretchInGrid && "flex min-h-0 flex-1 flex-col",
    );

    if (!lightbox) {
        return (
            <figure className={figureClassName}>
                <div
                    className={cn(
                        intrinsicFrame ? "w-fit max-w-full" : "w-full",
                        stretchInGrid && "min-h-0 flex-1",
                        frameWrapClass,
                    )}
                    style={scaleWrapStyle}
                >
                    <img
                        src={src}
                        alt={alt}
                        className={imgClass}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </figure>
        );
    }

    const previewButton = (
        <button
            type="button"
            className={cn(
                "group block cursor-zoom-in rounded-md bg-transparent p-0 text-left outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                intrinsicFrame ? "w-fit max-w-full" : "w-full",
                stretchInGrid && "flex min-h-0 flex-1 flex-col",
            )}
            aria-haspopup="dialog"
            aria-label={`Open fullscreen: ${alt}`}
        >
            <div
                className={cn(
                    intrinsicFrame ? "w-fit max-w-full" : "w-full",
                    stretchInGrid && "min-h-0 flex-1",
                    frameWrapClass,
                )}
                style={scaleWrapStyle}
            >
                <img
                    src={src}
                    alt=""
                    className={imgClass}
                    loading="lazy"
                    decoding="async"
                    aria-hidden
                />
            </div>
        </button>
    );

    return (
        <figure className={figureClassName}>
            <DialogPrimitive.Root modal>
                <DialogPrimitive.Trigger asChild>
                    {previewButton}
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
                            "fixed inset-0 z-[100] flex flex-col outline-none",
                            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                        )}
                        onCloseAutoFocus={(e) => e.preventDefault()}
                        aria-describedby={undefined}
                    >
                        <DialogPrimitive.Title className="sr-only">
                            {alt}
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
                            {/* Center the zoom surface in remaining viewport (excluding close + footer hint). */}
                            <div className="relative grid min-h-0 flex-1 place-items-center touch-none px-2 pb-2 md:px-4 md:pb-4">
                                <div className="flex h-[min(calc(100dvh-9rem),100%)] w-full max-w-[min(100vw-2rem,1920px)] items-center justify-center">
                                    <TransformWrapper
                                        initialScale={1}
                                        minScale={0.35}
                                        maxScale={12}
                                        centerOnInit
                                        centerZoomedOut
                                        wheel={{
                                            step: 0.12,
                                            wheelDisabled: false,
                                        }}
                                        pinch={{
                                            step: 12,
                                        }}
                                        doubleClick={{
                                            disabled: false,
                                            mode: "reset",
                                        }}
                                        panning={{
                                            velocityDisabled: false,
                                        }}
                                    >
                                        <TransformComponent
                                            wrapperClass="flex h-full w-full items-center justify-center"
                                            contentClass="flex !h-full !w-full items-center justify-center [&>img]:mx-auto [&>img]:my-auto"
                                        >
                                            <img
                                                src={src}
                                                alt={alt}
                                                className="max-h-[min(calc(100dvh-9rem),90vh)] w-auto max-w-full select-none object-contain"
                                                draggable={false}
                                            />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </div>
                            </div>
                            <p className="pointer-events-none px-4 pb-3 text-center text-xs text-muted-foreground md:text-sm">
                                Pinch to zoom · Drag to pan · Scroll to zoom ·
                                Double-click to reset
                            </p>
                        </div>
                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
        </figure>
    );
}
