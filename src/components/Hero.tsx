import { motion, useAnimation } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { openFullscreenWindow } from "@/lib/open-fullscreen";
import { LiveTimeTicker } from "./LiveTimeTicker";
import { VancouverWeather } from "./VancouverWeather";

const CAFE_TOAST_URL = "https://cafe-toast.vercel.app";
const CAFE_TOAST_BLURB =
    "Focus on your work at a virtual cafe with pomodoro timer and some ambient sounds.";
/** Approx bubble width (max-w-[15rem]) + cursor offset; used to flip when near the right edge. */
const TIP_WIDTH_PX = 240;
const TIP_GAP_PX = 16;

const headlineLines = ["Design", "with"] as const;
const reasonLine = "reason.";
const reasonDelay = 0.15 + 2 * 0.12;

function ReasonLetters() {
    return reasonLine.split("").map((char, j) => {
        const isReasonLetter = char !== ".";
        return (
            <motion.span
                key={j}
                className={`inline-block ${isReasonLetter ? "text-accent italic font-display" : ""}`}
                whileHover={{ rotateY: 360 }}
                transition={{
                    duration: 0.8,
                    ease: [0.42, 0, 0.58, 1],
                }}
                style={{
                    transformOrigin: "50% 50%",
                    transformStyle: "preserve-3d",
                }}
            >
                {char}
            </motion.span>
        );
    });
}

function CafeToastPlaygroundLink() {
    const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

    const placeLeft =
        tip !== null && tip.x + TIP_GAP_PX + TIP_WIDTH_PX > window.innerWidth - 12;

    return (
        <>
            <a
                href={CAFE_TOAST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative shrink-0 text-foreground/80 transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
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
            {tip
                ? createPortal(
                      <div
                          role="tooltip"
                          className="pointer-events-none fixed z-[100] w-[min(15rem,calc(100vw-1.5rem))]"
                          style={{
                              left: placeLeft
                                  ? tip.x - TIP_GAP_PX
                                  : tip.x + TIP_GAP_PX,
                              top: tip.y + 18,
                              transform: placeLeft
                                  ? "translateX(-100%)"
                                  : undefined,
                          }}
                      >
                          <div className="relative rounded-lg bg-[var(--background-dark)] px-3.5 py-2.5 text-[var(--background-light)] shadow-sm dark:bg-[var(--background-light)] dark:text-[var(--background-dark)]">
                              <span
                                  aria-hidden
                                  className={`absolute -top-[6px] h-0 w-0 border-x-[6px] border-b-[6px] border-x-transparent border-b-[var(--background-dark)] dark:border-b-[var(--background-light)] ${
                                      placeLeft ? "right-3" : "left-3"
                                  }`}
                              />
                              <p className="relative font-mono text-[10px] uppercase leading-snug tracking-[0.16em]">
                                  {CAFE_TOAST_BLURB}
                              </p>
                          </div>
                      </div>,
                      document.body,
                  )
                : null}
        </>
    );
}

function HeroScrollHint() {
    const controls = useAnimation();

    useEffect(() => {
        let active = true;

        async function runLoop() {
            await controls.set({ y: 0, opacity: 0 });
            await new Promise((resolve) =>
                setTimeout(resolve, (reasonDelay + 0.5) * 1000),
            );

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
            className="absolute right-0 bottom-0 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
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

export function Hero() {
    return (
        <section className="relative flex min-h-screen items-end px-6 md:px-10 pb-16 pt-32">
            <div className="mx-auto w-full max-w-[1440px]">
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative z-10 mb-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 overflow-visible font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
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
                            <LiveTimeTicker timeZone="America/Vancouver" />
                        </span>
                    </span>

                    <CafeToastPlaygroundLink />
                </motion.p>

                <h1 className="relative overflow-visible pb-20 font-display text-[clamp(3.5rem,12vw,12rem)] font-semibold leading-[0.9] tracking-tight">
                    {headlineLines.map((word, i) => (
                        <span
                            key={word}
                            className="block overflow-hidden pb-[0.15em] -mb-[0.15em]"
                        >
                            <motion.span
                                initial={{ y: "110%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 0.9,
                                    delay: 0.15 + i * 0.12,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="block"
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}

                    <span className="relative block overflow-visible pb-[0.15em] -mb-[0.15em]">
                        <span className="block overflow-hidden">
                            <motion.span
                                initial={{ y: "110%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 0.9,
                                    delay: reasonDelay,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="block"
                            >
                                <ReasonLetters />
                            </motion.span>
                        </span>

                        <HeroScrollHint />
                    </span>
                </h1>
            </div>
        </section>
    );
}
