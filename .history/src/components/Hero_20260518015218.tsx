import { motion } from "framer-motion";
import { LiveTimeTicker } from "./LiveTimeTicker";

export function Hero() {
    const lines = ["Design", "with", "reason."];

    return (
        <section className="relative flex min-h-screen items-end px-6 md:px-10 pb-16 pt-32">
            <div className="mx-auto w-full max-w-[1440px]">
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative z-10 mb-10 flex items-center gap-3 overflow-visible font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
                >
                    <span className="inline-block h-px w-8 shrink-0 bg-foreground/40" />
                    <span className="inline-flex min-h-[1.35em] items-center overflow-visible py-0.5">
                        <LiveTimeTicker
                            location="Vancouver"
                            timeZone="America/Vancouver"
                        />
                    </span>
                </motion.p>

                <h1 className="font-display text-[clamp(3.5rem,12vw,12rem)] font-semibold leading-[0.9] tracking-tight">
                    {lines.map((word, i) => (
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
                                {(word === "reason." ? "reason." : word)
                                    .split("")
                                    .map((char, j) => {
                                        const isReasonLetter =
                                            word === "reason." && char !== ".";
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
                                                    transformStyle:
                                                        "preserve-3d",
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        );
                                    })}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                >
                    <p className="max-w-md text-base text-foreground/70 leading-relaxed">
                        Hello, I'm Jisoo! Welcome to my space.
                    </p>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        <span>Scroll</span>
                        <span className="inline-block h-px w-10 bg-foreground/40" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
