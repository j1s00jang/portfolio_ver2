"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { cn } from "@/lib/utils";

const objectPositionClass = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  "top-left": "object-left-top",
} as const;

export function CaseStudyEmbedImage({
  src,
  alt,
  objectPosition = "center",
  fit = "cover",
  lightbox = false,
  embedVariant = "section",
}: {
  src: string;
  alt: string;
  objectPosition?: keyof typeof objectPositionClass;
  /** `contain`: full image centred in frame; `cover`: crop-filled (default). */
  fit?: "cover" | "contain";
  lightbox?: boolean;
  /** `gridCell`: no outer section margin — use inside `imagePair` row. */
  embedVariant?: "section" | "gridCell";
}) {
  const posClass = objectPositionClass[objectPosition];

  const frameShellClass =
    "overflow-hidden rounded-md border border-border bg-muted aspect-[16/10] md:aspect-[21/10]";

  /** Contain-fit: centre in frame via flex so the bitmap doesn’t cling to edges. */
  const frameWrapClass =
    fit === "contain"
      ? cn(frameShellClass, "flex items-center justify-center")
      : frameShellClass;

  const imgClass =
    fit === "contain"
      ? cn(
          "max-h-full max-w-full object-contain object-center",
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
      ? "my-0 w-full min-w-0 max-w-none"
      : "my-10 w-full max-w-5xl md:my-14";

  const figureClassName = cn("shrink-0", embedVariantClasses);

  if (!lightbox) {
    return (
      <figure className={figureClassName}>
        <div className={cn("w-full", frameWrapClass)}>
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
      className="group block w-full cursor-zoom-in rounded-md bg-transparent p-0 text-left outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-haspopup="dialog"
      aria-label={`Open fullscreen: ${alt}`}
    >
      <div className={cn("w-full", frameWrapClass)}>
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
        <DialogPrimitive.Trigger asChild>{previewButton}</DialogPrimitive.Trigger>

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
            <DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>

            <DialogPrimitive.Close
              className="absolute right-5 top-5 z-[110] rounded-full border border-border bg-background/95 p-2.5 text-foreground shadow-md transition-colors hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring md:right-8 md:top-8"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
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
                Pinch to zoom · Drag to pan · Scroll to zoom · Double-click to reset
              </p>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

    </figure>
  );
}
