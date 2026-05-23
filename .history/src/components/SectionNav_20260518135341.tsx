import { useEffect, useState } from "react";

export type Section = { num: string; label: string; id: string };

export const scaffoldSections: Section[] = [
    { num: "01", label: "Overview", id: "overview" },
    { num: "02", label: "Opportunities", id: "opportunities" },
    { num: "03", label: "User Research", id: "user-research" },
    { num: "04", label: "Findings & Starting Point", id: "findings" },
    { num: "05", label: "Lo-fis", id: "lo-fis" },
    { num: "06", label: "Hi-fis", id: "hi-fis" },
    { num: "07", label: "Key Features", id: "key-features" },
    { num: "08", label: "Print Design", id: "print-design" },
    { num: "09", label: "Product Storytelling", id: "product-storytelling" },
    { num: "10", label: "Promotional Video", id: "promotional-video" },
    {
        num: "11",
        label: "Learning Outcomes & Next Steps",
        id: "learning-outcomes",
    },
];

type Props = {
    sections: Section[];
    /** CSS selector for an element; nav appears once its bottom scrolls above the viewport top. */
    revealAfterSelector: string;
    /**
     * When set, nav slides back out once this element’s top rises past the viewport midline
     * (avoids overlapping fixed side nav with footer / end-of-page content).
     */
    hideWhenPastSelector?: string;
};

export function SectionNav({
    sections,
    revealAfterSelector,
    hideWhenPastSelector,
}: Props) {
    const [visible, setVisible] = useState(false);
    const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

    // Reveal after intro passes; hide again when end/footer reaches the vertical middle
    useEffect(() => {
        const revealEl = document.querySelector(revealAfterSelector);
        if (!revealEl) return;

        const onScroll = () => {
            const revealRect = revealEl.getBoundingClientRect();
            const pastIntro = revealRect.bottom <= 80;

            let pastEnd = false;
            if (hideWhenPastSelector) {
                const endEl = document.querySelector(hideWhenPastSelector);
                if (endEl) {
                    const top = endEl.getBoundingClientRect().top;
                    const midBand = window.innerHeight * 0.5 + 48;
                    pastEnd = top < midBand;
                }
            }

            setVisible(pastIntro && !pastEnd);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [revealAfterSelector, hideWhenPastSelector]);

    // Track active section
    useEffect(() => {
        const elements = sections
            .map((s) => document.getElementById(s.id))
            .filter((el): el is HTMLElement => !!el);
        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top,
                    );
                if (visibleEntries[0]) setActiveId(visibleEntries[0].target.id);
            },
            { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
        );
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sections]);

    return (
        <nav
            aria-label="Section navigation"
            className={`group/nav fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block pl-6 md:pl-10 pr-6 transition-all duration-700 ${
                visible
                    ? "opacity-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 -translate-x-4 pointer-events-none"
            }`}
        >
            <ul className="space-y-3 font-mono text-xs uppercase tracking-[0.2em]">
                {sections.map((s) => {
                    const isActive = activeId === s.id;
                    return (
                        <li key={s.id}>
                            <a
                                href={`#${s.id}`}
                                className={`group flex items-start gap-3 leading-[1.5] transition-colors duration-500 ${
                                    isActive
                                        ? "text-foreground"
                                        : "text-foreground/40 hover:text-foreground/80"
                                }`}
                            >
                                <span
                                    className={`mt-[0.55em] h-px transition-all duration-500 ease-out ${
                                        isActive
                                            ? "w-8 bg-accent"
                                            : "w-4 bg-foreground/30 group-hover/nav:w-3"
                                    }`}
                                />
                                <span
                                    className={`text-accent transition-all duration-500 ease-out ${
                                        isActive
                                            ? "opacity-100"
                                            : "opacity-60 group-hover/nav:opacity-100"
                                    }`}
                                >
                                    {s.num}
                                </span>
                                <span className="overflow-hidden inline-block w-48">
                                    <span className="block transition-[transform,opacity] duration-500 ease-out -translate-x-6 opacity-0 group-hover/nav:translate-x-0 group-hover/nav:opacity-100 will-change-transform">
                                        {s.label}
                                    </span>
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
