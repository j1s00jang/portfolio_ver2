"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { FlavorCarouselSlide } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

type Props = {
    slides: readonly FlavorCarouselSlide[];
};

function slideRole(
    index: number,
    selectedIndex: number,
    count: number,
): "active" | "adjacent" | "other" {
    if (index === selectedIndex) return "active";
    const prev = (selectedIndex - 1 + count) % count;
    const next = (selectedIndex + 1) % count;
    if (index === prev || index === next) return "adjacent";
    return "other";
}

export function CaseStudyFlavorCarousel({ slides }: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        containScroll: false,
    });

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    if (slides.length === 0) return null;

    return (
        <div
            className="relative my-10 w-full max-w-5xl md:my-14"
            aria-roledescription="carousel"
            aria-label="Fizzypop flavour labels and mockups"
        >
            <div ref={emblaRef} className="overflow-hidden">
                <div className="-ml-8 flex touch-pan-y md:-ml-12">
                    {slides.map((slide, index) => {
                        const role = slideRole(
                            index,
                            selectedIndex,
                            slides.length,
                        );

                        return (
                            <div
                                key={slide.flavor}
                                className={cn(
                                    "min-w-0 shrink-0 basis-[52%] pl-8 transition-opacity duration-500 ease-out md:basis-[50%] md:pl-12",
                                    role === "active" && "opacity-100",
                                    role === "adjacent" && "opacity-40",
                                    role === "other" && "opacity-25",
                                )}
                            >
                                <div
                                    role="group"
                                    aria-roledescription="slide"
                                    className={cn(
                                        "w-full",
                                        role !== "active" && "cursor-pointer",
                                    )}
                                    onClick={() => {
                                        if (role !== "active") {
                                            emblaApi?.scrollTo(index);
                                        }
                                    }}
                                    aria-label={`${slide.flavor} flavour`}
                                    aria-current={
                                        role === "active" ? true : undefined
                                    }
                                >
                                    <figure className="flex w-full flex-col gap-3 md:gap-4">
                                        <img
                                            src={slide.label.src}
                                            alt={slide.label.alt}
                                            className="block h-auto w-full object-contain"
                                            loading="lazy"
                                            decoding="async"
                                            draggable={false}
                                        />
                                        <img
                                            src={slide.productMockup.src}
                                            alt={slide.productMockup.alt}
                                            className="block h-auto w-full object-contain"
                                            loading="lazy"
                                            decoding="async"
                                            draggable={false}
                                        />
                                        <figcaption
                                            className={cn(
                                                "text-center font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-500",
                                                role === "active"
                                                    ? "text-accent"
                                                    : "text-muted-foreground",
                                            )}
                                        >
                                            {slide.flavor}
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {slides.length > 1 ? (
                <>
                    <button
                        type="button"
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-colors hover:text-accent md:h-10 md:w-10"
                        aria-label="Previous flavour"
                    >
                        <ChevronLeft
                            className="h-5 w-5"
                            strokeWidth={1.5}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-colors hover:text-accent md:h-10 md:w-10"
                        aria-label="Next flavour"
                    >
                        <ChevronRight
                            className="h-5 w-5"
                            strokeWidth={1.5}
                        />
                    </button>
                </>
            ) : null}
        </div>
    );
}
