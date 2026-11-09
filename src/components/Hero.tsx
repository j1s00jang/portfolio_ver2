import {
    motion,
    useAnimation,
    useScroll,
    useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { openFullscreenWindow } from "@/lib/open-fullscreen";
import { CursorSpeechBubble } from "./CursorSpeechBubble";
import { LiveTimeTicker } from "./LiveTimeTicker";
import { VancouverWeather } from "./VancouverWeather";

const CAFE_TOAST_URL = "https://cafe-toast.vercel.app";
const CAFE_TOAST_BLURB =
    "Focus on your work at a virtual cafe with a timer and some ambient sounds. ☕️📖";

type ObjectStyle = {
    left: string;
    top: string;
    width: string;
    rotate?: number;
    zIndex?: number;
};

type HeroObjectDef = {
    id: string;
    src: string;
    alt: string;
    blurb: ReactNode;
    style: ObjectStyle;
    /** Tighter cluster for the mobile in-flow stage. */
    mobileStyle?: ObjectStyle;
};

const HERO_OBJECTS: HeroObjectDef[] = [
    {
        id: "dessert",
        src: "/hero/dessert.png",
        alt: "Dessert on a glass plate",
        blurb: (
            <>
                Fun fact: I graduated{" "}
                <span className="text-accent">baking school</span>. And, I still
                <span className="text-accent"> love making desserts</span> at
                home!
            </>
        ),
        style: { left: "48%", top: "6%", width: "24%", zIndex: 3 },
        mobileStyle: { left: "52%", top: "2%", width: "32%", zIndex: 3 },
    },
    {
        id: "coffee",
        src: "/hero/coffee.png",
        alt: "Cup of black coffee",
        blurb: (
            <>
                Only <span className="text-accent">black coffee</span>. Who else
                drinks sweet coffee anyway?
            </>
        ),
        style: { left: "10%", top: "10%", width: "32%", zIndex: 4 },
        mobileStyle: { left: "2%", top: "6%", width: "40%", zIndex: 4 },
    },
    {
        id: "book",
        src: "/hero/book.png",
        alt: "A book of this month",
        blurb: (
            <>
                Nov 2026, I'm reading{" "}
                <span className="text-accent">
                    The Buddha's Words: A New Interpretation
                </span>{" "}
                by Ryunosuke Koike.
            </>
        ),
        style: {
            left: "36%",
            top: "40%",
            width: "26%",
            rotate: 8,
            zIndex: 2,
        },
        mobileStyle: {
            left: "30%",
            top: "40%",
            width: "34%",
            rotate: 8,
            zIndex: 2,
        },
    },
    {
        id: "key",
        src: "/hero/key.png",
        alt: "Keys with a Toast charm",
        blurb: (
            <>
                Who's living with <span className="text-accent">Toast</span>?
            </>
        ),
        style: { left: "12%", top: "46%", width: "22%", zIndex: 5 },
        mobileStyle: { left: "4%", top: "52%", width: "28%", zIndex: 5 },
    },
    {
        id: "leaf",
        src: "/hero/leaf.png",
        alt: "Autumn maple leaf",
        blurb: (
            <>
                My favorite season, <span className="text-accent">Autumn</span>,
                my favorite holiday,{" "}
                <span className="text-accent">Halloween</span>!
            </>
        ),
        style: {
            left: "66%",
            top: "32%",
            width: "28%",
            rotate: -5,
            zIndex: 4,
        },
        mobileStyle: {
            left: "60%",
            top: "42%",
            width: "34%",
            rotate: -5,
            zIndex: 4,
        },
    },
];

function prefersFineHover() {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function CafeToastPlaygroundLink({ className = "" }: { className?: string }) {
    const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

    return (
        <>
            <a
                href={CAFE_TOAST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/85 transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 md:text-xs md:tracking-[0.2em] ${className}`}
                onClick={(e) => {
                    e.preventDefault();
                    openFullscreenWindow(CAFE_TOAST_URL);
                }}
                onMouseEnter={(e) => {
                    if (!prefersFineHover()) return;
                    setTip({ x: e.clientX, y: e.clientY });
                }}
                onMouseMove={(e) => {
                    if (!prefersFineHover()) return;
                    setTip({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => setTip(null)}
            >
                playground #1 <span className="text-accent">Cafe Toast</span>
            </a>
            {tip ? (
                <CursorSpeechBubble
                    x={tip.x}
                    y={tip.y}
                >
                    {CAFE_TOAST_BLURB}
                </CursorSpeechBubble>
            ) : null}
        </>
    );
}

function HeroScrollHint() {
    const controls = useAnimation();

    useEffect(() => {
        let active = true;

        async function runLoop() {
            await controls.set({ y: 0, opacity: 0 });
            await new Promise((resolve) => setTimeout(resolve, 900));

            while (active) {
                await controls.start({
                    y: 48,
                    opacity: 1,
                    transition: { duration: 2.1, ease: "easeInOut" },
                });
                await controls.start({
                    opacity: 0,
                    transition: { duration: 0.35, ease: "linear" },
                });
                controls.set({ y: 0, opacity: 0 });
                await new Promise((resolve) => setTimeout(resolve, 280));
            }
        }

        void runLoop();
        return () => {
            active = false;
        };
    }, [controls]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={controls}
            className="pointer-events-none absolute bottom-6 right-4 z-30 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 md:bottom-12 md:right-10 md:text-xs"
        >
            <span>Scroll</span>
            <ArrowDown
                className="shrink-0 text-foreground/40"
                size={16}
                strokeWidth={1.5}
                aria-hidden
            />
        </motion.div>
    );
}

function HeroGlassTip({ children }: { children: ReactNode }) {
    return (
        <div className="hero-tip rounded-lg border border-accent/70 bg-background/55 px-3.5 py-2.5 text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-accent/60 dark:bg-background/60 dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <p className="font-mono text-[10px] uppercase leading-snug tracking-[0.14em] md:text-[11px]">
                {children}
            </p>
        </div>
    );
}

function HeroObject({
    object,
    index,
    layout = "desktop",
    mobileTipActive = false,
    onMobileTipToggle,
}: {
    object: HeroObjectDef;
    index: number;
    layout?: "desktop" | "mobile";
    mobileTipActive?: boolean;
    onMobileTipToggle?: (id: string) => void;
}) {
    const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
    const style =
        layout === "mobile" && object.mobileStyle
            ? object.mobileStyle
            : object.style;
    const baseRotate = style.rotate ?? 0;
    const showGlow = layout === "mobile" ? mobileTipActive : Boolean(tip);

    return (
        <>
            <motion.button
                type="button"
                aria-label={object.alt}
                aria-expanded={layout === "mobile" ? mobileTipActive : undefined}
                initial={{ opacity: 0, y: 20, scale: 0.96, rotate: baseRotate }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: baseRotate }}
                transition={{
                    duration: 0.85,
                    delay: 0.2 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                    y: -12,
                    rotate: baseRotate + (index % 2 === 0 ? -3.5 : 3.5),
                    scale: 1.05,
                    transition: {
                        type: "spring",
                        stiffness: 320,
                        damping: 18,
                    },
                }}
                className="absolute origin-center cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
                style={{
                    left: style.left,
                    top: style.top,
                    width: style.width,
                    zIndex: style.zIndex ?? 2,
                }}
                onClick={() => {
                    if (layout !== "mobile") return;
                    onMobileTipToggle?.(object.id);
                }}
                onMouseEnter={(e) => {
                    if (layout === "mobile" || !prefersFineHover()) return;
                    setTip({ x: e.clientX, y: e.clientY });
                }}
                onMouseMove={(e) => {
                    if (layout === "mobile" || !prefersFineHover()) return;
                    setTip({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => {
                    if (layout === "mobile") return;
                    setTip(null);
                }}
            >
                <motion.span
                    className={`hero-object-glow block${showGlow ? " is-hovered" : ""}`}
                    animate={{ y: [0, index % 2 === 0 ? -7 : 6, 0] }}
                    transition={{
                        duration: 5.8 + index * 0.35,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <img
                        src={object.src}
                        alt=""
                        draggable={false}
                        className="block h-auto w-full select-none"
                    />
                </motion.span>
            </motion.button>
            {layout === "desktop" && tip ? (
                <CursorSpeechBubble
                    x={tip.x}
                    y={tip.y}
                >
                    {object.blurb}
                </CursorSpeechBubble>
            ) : null}
        </>
    );
}

function VancouverMeta({ className = "" }: { className?: string }) {
    return (
        <p
            className={`flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1.5 overflow-visible font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/80 md:gap-3 md:text-xs md:tracking-[0.2em] ${className}`}
        >
            <span className="shrink-0 text-accent">VANCOUVER</span>
            <span
                className="inline-block h-px w-5 shrink-0 self-center bg-foreground/40 md:w-8"
                aria-hidden
            />
            <span className="inline-flex min-h-[1.35em] items-center overflow-visible py-0.5">
                <VancouverWeather />
            </span>
            <span
                className="inline-block h-px w-5 shrink-0 self-center bg-foreground/40 md:w-8"
                aria-hidden
            />
            <span className="inline-flex min-h-[1.35em] items-center overflow-visible py-0.5">
                <LiveTimeTicker
                    timeZone="Etc/GMT+7"
                    tzLabel="PDT"
                />
            </span>
        </p>
    );
}

function GlassHeadline({
    children,
    className = "",
    opacity,
    y,
}: {
    children: ReactNode;
    className?: string;
    opacity: ReturnType<typeof useTransform<number, number>>;
    y: ReturnType<typeof useTransform<number, number>>;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
        >
            <motion.p
                style={{ opacity, y }}
                className={`font-display font-extrabold leading-[1.05] tracking-tight ${className}`}
            >
                {children}
            </motion.p>
        </motion.div>
    );
}

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [mobileTipId, setMobileTipId] = useState<string | null>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "35% start"],
    });
    const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const headlineY = useTransform(scrollYProgress, [0, 1], [0, -10]);
    const mobileTip = HERO_OBJECTS.find((object) => object.id === mobileTipId);

    function toggleMobileTip(id: string) {
        setMobileTipId((prev) => (prev === id ? null : id));
    }

    return (
        <section
            ref={sectionRef}
            className="hero-surface relative flex min-h-[100svh] flex-col overflow-hidden"
        >
            <div
                className="absolute inset-0 bg-[#f3eee6] bg-cover bg-center"
                style={{ backgroundImage: "url(/hero/bg.png)" }}
                aria-hidden
            />

            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent"
                aria-hidden
            />

            {/* Desktop objects — pinned mid-stage */}
            <div className="pointer-events-none absolute inset-x-0 top-[26%] z-10 hidden justify-center px-10 md:flex">
                <div className="pointer-events-auto relative aspect-[16/10] w-full max-w-6xl">
                    {HERO_OBJECTS.map((object, index) => (
                        <HeroObject
                            key={object.id}
                            object={object}
                            index={index}
                            layout="desktop"
                        />
                    ))}
                </div>
            </div>

            {/* Copy */}
            <div className="pointer-events-none relative z-20 mx-auto w-full max-w-[1440px] px-4 pt-20 md:px-10 md:pt-32">
                {/* Mobile: stacked, left-aligned — clear of objects */}
                <div className="pointer-events-auto flex flex-col gap-3 md:hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <VancouverMeta />
                    </motion.div>

                    <div className="flex flex-col gap-1.5">
                        <GlassHeadline
                            opacity={headlineOpacity}
                            y={headlineY}
                            className="text-[clamp(2.35rem,11vw,3rem)]"
                        >
                            <span className="hero-glass-ink">I </span>
                            <span className="hero-glass-ink-accent">design</span>
                        </GlassHeadline>
                        <GlassHeadline
                            opacity={headlineOpacity}
                            y={headlineY}
                            className="text-[clamp(2.35rem,11vw,3rem)]"
                        >
                            <span className="hero-glass-ink">to </span>
                            <span className="hero-glass-ink-accent">
                                solve problems
                            </span>
                        </GlassHeadline>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.22 }}
                    >
                        <CafeToastPlaygroundLink />
                    </motion.div>
                </div>

                {/* Desktop: split columns */}
                <div className="pointer-events-auto mb-4 hidden items-start justify-between gap-x-6 gap-y-4 md:mb-6 md:flex">
                    <div className="flex min-w-0 flex-col gap-3">
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <VancouverMeta />
                        </motion.div>
                        <GlassHeadline
                            opacity={headlineOpacity}
                            y={headlineY}
                            className="text-8xl"
                        >
                            <span className="hero-glass-ink">I </span>
                            <span className="hero-glass-ink-accent">design</span>
                        </GlassHeadline>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <CafeToastPlaygroundLink />
                        </motion.div>
                        <GlassHeadline
                            opacity={headlineOpacity}
                            y={headlineY}
                            className="text-right text-8xl"
                        >
                            <span className="hero-glass-ink">to </span>
                            <span className="hero-glass-ink-accent">
                                solve problems
                            </span>
                        </GlassHeadline>
                    </div>
                </div>
            </div>

            {/* Mobile objects — tip overlays above the stage so layout never shifts */}
            <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-1 pb-12 pt-1 md:hidden">
                <div
                    className="pointer-events-none absolute inset-x-0 top-[8%] z-30 flex justify-center px-4"
                    aria-live="polite"
                >
                    {mobileTip ? (
                        <motion.div
                            key={mobileTip.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="w-full max-w-[min(18rem,calc(100vw-2rem))]"
                        >
                            <HeroGlassTip>{mobileTip.blurb}</HeroGlassTip>
                        </motion.div>
                    ) : null}
                </div>

                <div className="pointer-events-auto relative aspect-[5/4] w-full max-w-[min(26rem,96vw)]">
                    {HERO_OBJECTS.map((object, index) => (
                        <HeroObject
                            key={`m-${object.id}`}
                            object={object}
                            index={index}
                            layout="mobile"
                            mobileTipActive={mobileTipId === object.id}
                            onMobileTipToggle={toggleMobileTip}
                        />
                    ))}
                </div>
            </div>

            <HeroScrollHint />

            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-b from-transparent via-background/50 to-background md:h-52"
                aria-hidden
            />
        </section>
    );
}
