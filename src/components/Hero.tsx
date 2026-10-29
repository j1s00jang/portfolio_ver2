import { motion, useAnimation } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { openFullscreenWindow } from "@/lib/open-fullscreen";
import { CursorSpeechBubble } from "./CursorSpeechBubble";
import { LiveTimeTicker } from "./LiveTimeTicker";
import { VancouverWeather } from "./VancouverWeather";

const CAFE_TOAST_URL = "https://cafe-toast.vercel.app";
const CAFE_TOAST_BLURB =
    "Focus on your work at a virtual cafe with a timer and some ambient sounds. ☕️📖";

type HeroObjectDef = {
    id: string;
    src: string;
    alt: string;
    blurb: ReactNode;
    /** Position / size as % of the stage */
    style: {
        left: string;
        top: string;
        width: string;
        rotate?: number;
        zIndex?: number;
    };
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
        style: { left: "44%", top: "1%", width: "28%", zIndex: 3 },
    },
    {
        id: "coffee",
        src: "/hero/coffee.png",
        alt: "Cup of black coffee",
        blurb: (
            <>
                Only drink <span className="text-accent">black coffee</span>.
                Who else drinks sweet coffee anyway?
            </>
        ),
        style: { left: "11%", top: "12%", width: "32%", zIndex: 4 },
    },
    {
        id: "book",
        src: "/hero/book.png",
        alt: "A book of this month",
        blurb: (
            <>
                Join my book club. This month, I'm reading{" "}
                <span className="text-accent">Frankenstein</span> by Mary
                Shelley.
            </>
        ),
        style: {
            left: "40%",
            top: "39%",
            width: "26%",
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
        style: { left: "14%", top: "55%", width: "22%", zIndex: 5 },
    },
    {
        id: "leaf",
        src: "/hero/leaf.png",
        alt: "Autumn maple leaf",
        blurb: (
            <>
                Crisp air, colourful leaves, and{" "}
                <span className="text-accent">Halloween</span>!
            </>
        ),
        style: {
            left: "70%",
            top: "42%",
            width: "30%",
            rotate: -5,
            zIndex: 4,
        },
    },
];

function CafeToastPlaygroundLink() {
    const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

    return (
        <>
            <a
                href={CAFE_TOAST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative shrink-0 text-foreground/85 transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
                onClick={(e) => {
                    e.preventDefault();
                    openFullscreenWindow(CAFE_TOAST_URL);
                }}
                onMouseEnter={(e) => setTip({ x: e.clientX, y: e.clientY })}
                onMouseMove={(e) => setTip({ x: e.clientX, y: e.clientY })}
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
            className="pointer-events-none absolute bottom-8 right-6 z-30 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/70 md:bottom-12 md:right-10"
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

function HeroObject({
    object,
    index,
}: {
    object: HeroObjectDef;
    index: number;
}) {
    const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
    const baseRotate = object.style.rotate ?? 0;

    return (
        <>
            <motion.button
                type="button"
                aria-label={object.alt}
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
                    transition: { type: "spring", stiffness: 320, damping: 18 },
                }}
                className="absolute origin-center cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
                style={{
                    left: object.style.left,
                    top: object.style.top,
                    width: object.style.width,
                    zIndex: object.style.zIndex ?? 2,
                }}
                onMouseEnter={(e) => setTip({ x: e.clientX, y: e.clientY })}
                onMouseMove={(e) => setTip({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setTip(null)}
            >
                <motion.span
                    className={`hero-object-glow block${tip ? " is-hovered" : ""}`}
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
            {tip ? (
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

export function Hero() {
    return (
        <section className="relative min-h-[100svh] overflow-hidden">
            <div
                className="absolute inset-0 bg-[#f3eee6] bg-cover bg-center"
                style={{ backgroundImage: "url(/hero/bg.png)" }}
                aria-hidden
            />

            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent"
                aria-hidden
            />

            <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-6 pb-24 pt-28 md:px-10 md:pb-28 md:pt-32">
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative z-20 mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 overflow-visible font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 md:mb-6"
                >
                    <span className="flex min-w-0 flex-wrap items-center gap-3">
                        <span className="shrink-0 text-accent">VANCOUVER</span>
                        <span
                            className="inline-block h-px w-8 shrink-0 self-center bg-foreground/40"
                            aria-hidden
                        />
                        <span className="inline-flex min-h-[1.35em] items-center overflow-visible py-0.5">
                            <VancouverWeather />
                        </span>
                        <span
                            className="inline-block h-px w-8 shrink-0 self-center bg-foreground/40"
                            aria-hidden
                        />
                        <span className="inline-flex min-h-[1.35em] items-center overflow-visible py-0.5">
                            <LiveTimeTicker
                                timeZone="Etc/GMT+7"
                                tzLabel="PDT"
                            />
                        </span>
                    </span>

                    <CafeToastPlaygroundLink />
                </motion.p>

                <div className="relative mx-auto w-full max-w-5xl flex-1">
                    <div className="relative aspect-[16/10] w-full min-h-[24rem] sm:min-h-[30rem] md:min-h-0">
                        {HERO_OBJECTS.map((object, index) => (
                            <HeroObject
                                key={object.id}
                                object={object}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <HeroScrollHint />

            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-b from-transparent via-background/50 to-background md:h-52"
                aria-hidden
            />
        </section>
    );
}
