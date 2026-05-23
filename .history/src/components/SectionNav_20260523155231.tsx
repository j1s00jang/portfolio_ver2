import { useEffect, useState } from "react";

export type Section = { num: string; label: string; id: string };

export const scaffoldSections: Section[] = [
    { num: "01", label: "Overview", id: "overview" },
    { num: "02", label: "Opportunities", id: "opportunities" },
    { num: "03", label: "User Research", id: "user-research" },
    { num: "04", label: "Findings & Starting Point", id: "findings" },
    { num: "05", label: "Brand Guidelines", id: "brand-guidelines" },
    { num: "06", label: "Lo-fis & Hi-fis", id: "lo-fis-hi-fis" },
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
     * When set: Next project 블록(`#next-project`)이 들어오면 페이드. 페이지 스크롤 바닥 ±몇 픽셀에서는 항상 숨김(맨 아래 걸림 방지).
     */
    hideWhenPastSelector?: string;
};

export function SectionNav({
    sections,
    revealAfterSelector,
    hideWhenPastSelector,
}: Props) {
    const hideSelector = hideWhenPastSelector?.trim() ?? "";

    /** 스크롤 기반 노출 계수 */
    const [scrollFactor, setScrollFactor] = useState(0);
    /** #next-project가 보일 때 1→0 (겹치면 네비를 확실히 낮춤) */
    const [nextOverlapEase, setNextOverlapEase] = useState(1);
    const dockReveal = scrollFactor * nextOverlapEase;

    const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

    // Next project 섹션과 뷰포트 겹침(IO) — 레이아웃 때문에 scrollHeight/rect만으로 안 꺼질 때 보정
    useEffect(() => {
        if (!hideSelector) {
            setNextOverlapEase(1);
            return;
        }
        const endEl = document.querySelector(hideSelector);
        if (!endEl) {
            setNextOverlapEase(1);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) {
                    setNextOverlapEase(1);
                    return;
                }

                let r = entry.intersectionRatio;
                if (r <= 1e-4 && entry.boundingClientRect.height > 0) {
                    const vh = window.innerHeight;
                    const t = entry.boundingClientRect.top;
                    const b = entry.boundingClientRect.bottom;
                    const vis = Math.max(0, Math.min(b, vh) - Math.max(0, t));
                    r = vis / Math.max(1, entry.boundingClientRect.height);
                }

                const ease = Math.max(0, 1 - Math.min(1, r * 4.5));
                setNextOverlapEase(ease);
            },
            {
                root: null,
                threshold: Array.from({ length: 41 }, (_, i) => i / 40),
            },
        );
        observer.observe(endEl);
        return () => observer.disconnect();
    }, [hideSelector]);

    // Reveal after intro passes; next 블록·문서 바닥 근처에서 페이드·슬라이드 아웃
    useEffect(() => {
        const revealEl = document.querySelector(revealAfterSelector);
        if (!revealEl) return;

        const onScroll = () => {
            const revealRect = revealEl.getBoundingClientRect();
            const pastIntro = revealRect.bottom <= 80;

            const ih = window.innerHeight;
            const docEl = document.documentElement;
            const body = document.body;
            const scrollHeight = Math.max(
                docEl.scrollHeight,
                body.scrollHeight,
                docEl.offsetHeight,
                body.offsetHeight,
            );
            const scrollBottom = window.scrollY + ih;
            const atDocumentBottom =
                scrollBottom >= scrollHeight - Math.max(120, ih * 0.1);

            let factor = 0;
            if (!pastIntro) {
                factor = 0;
            } else if (!hideWhenPastSelector) {
                factor = 1;
            } else if (atDocumentBottom) {
                // 페이지 끝엔 sentinel top이 뷰 중간에 걸린 채일 수 있어, 스크롤 바닥에서는 항상 숨김
                factor = 0;
            } else {
                const endEl = document.querySelector(hideWhenPastSelector);
                if (!endEl) {
                    factor = 1;
                } else {
                    const rect = endEl.getBoundingClientRect();
                    const top = rect.top;
                    const bottom = rect.bottom;
                    // 블록이 위로 많이 빠져나간 뒤(하단 근처)도 완전 숨김
                    const blockMostlyPassed = bottom < ih * 0.12;

                    const bandHi = ih * 0.78;
                    const bandLo = ih * 0.42;

                    if (top >= bandHi && !blockMostlyPassed) {
                        factor = 1;
                    } else if (top <= bandLo || blockMostlyPassed) {
                        factor = 0;
                    } else {
                        const u = (top - bandLo) / (bandHi - bandLo);
                        factor = u * u * (3 - 2 * u);
                    }
                }
            }

            setScrollFactor(factor);
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
            style={{
                opacity: dockReveal,
                transform: `translateY(-50%) translateX(${-18 * (1 - dockReveal)}px)`,
                pointerEvents: dockReveal > 0.08 ? "auto" : "none",
            }}
            className="group/nav fixed left-0 top-1/2 z-40 hidden w-fit max-w-full pl-6 pr-6 transition-[opacity,transform] duration-700 ease-in-out motion-reduce:transition-none lg:inline-block md:pl-10"
        >
            <ul className="w-fit space-y-3 font-mono text-xs uppercase tracking-[0.2em]">
                {sections.map((s) => {
                    const isActive = activeId === s.id;
                    return (
                        <li key={s.id}>
                            <a
                                href={`#${s.id}`}
                                className={`group flex items-start gap-3 pe-8 leading-[1.5] py-1 -my-1 transition-colors duration-500 ${
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
                                <span className="block max-w-4 overflow-hidden shrink-0 transition-[max-width] duration-200 ease-out group-hover/nav:max-w-48 group-hover/nav:duration-500">
                                    <span className="inline-block min-w-[12rem] w-48 whitespace-normal transition-[transform,opacity] duration-500 ease-out -translate-x-6 opacity-0 group-hover/nav:translate-x-0 group-hover/nav:opacity-100 will-change-transform">
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
