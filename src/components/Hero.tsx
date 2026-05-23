import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { LiveTimeTicker } from "./LiveTimeTicker";
import { VancouverWeather } from "./VancouverWeather";

export function Hero() {
  const lines = ["Design", "with", "reason."];

  return (
    <section className="relative flex min-h-screen items-end px-6 md:px-10 pb-16 pt-32">
      <div className="mx-auto w-full max-w-[1440px]">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 mb-10 flex flex-wrap items-center gap-3 overflow-visible font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
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
                    const isReasonLetter = word === "reason." && char !== ".";
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
                  })}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span>Scroll</span>
          <ArrowDown
            className="shrink-0 text-foreground/40"
            size={16}
            strokeWidth={1.5}
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
