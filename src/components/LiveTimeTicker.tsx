import { useEffect, useState } from "react";
import { SplitFlapDigit } from "./SplitFlapDigit";

interface LiveTimeTickerProps {
  timeZone: string;
}

interface TimeParts {
  h1: string;
  h2: string;
  m1: string;
  m2: string;
  s1: string;
  s2: string;
  tz: string;
}

const ZERO: TimeParts = {
  h1: "0",
  h2: "0",
  m1: "0",
  m2: "0",
  s1: "0",
  s2: "0",
  tz: "",
};

function getTimeParts(timeZone: string): TimeParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
  const parts = formatter.formatToParts(new Date());
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "00";
  let hour = get("hour");
  if (hour === "24") hour = "00";
  const minute = get("minute");
  const second = get("second");
  const tz = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  return {
    h1: hour[0],
    h2: hour[1],
    m1: minute[0],
    m2: minute[1],
    s1: second[0],
    s2: second[1],
    tz,
  };
}

/** Split-flap clock + timezone only (use with city label + dividers in the parent row). */
export function LiveTimeTicker({ timeZone }: LiveTimeTickerProps) {
  const [mounted, setMounted] = useState(false);
  const [parts, setParts] = useState<TimeParts>(ZERO);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setMounted(true);
    setParts(getTimeParts(timeZone));
    const interval = reducedMotion ? 60_000 : 1_000;
    const id = window.setInterval(
      () => setParts(getTimeParts(timeZone)),
      interval,
    );
    return () => window.clearInterval(id);
  }, [timeZone, reducedMotion]);

  const display = mounted ? parts : ZERO;

  return (
    <span className="inline-flex items-center gap-3 overflow-visible whitespace-nowrap">
      <span className="inline-flex items-center overflow-visible font-mono leading-none text-foreground">
        <SplitFlapDigit value={display.h1} reducedMotion={reducedMotion} />
        <SplitFlapDigit value={display.h2} reducedMotion={reducedMotion} />
        <span className="px-[0.1em]">:</span>
        <SplitFlapDigit value={display.m1} reducedMotion={reducedMotion} />
        <SplitFlapDigit value={display.m2} reducedMotion={reducedMotion} />
        <span className="px-[0.1em]">:</span>
        <SplitFlapDigit value={display.s1} reducedMotion={reducedMotion} />
        <SplitFlapDigit value={display.s2} reducedMotion={reducedMotion} />
      </span>
      {display.tz && <span className="text-accent">{display.tz}</span>}
    </span>
  );
}
