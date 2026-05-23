import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { N as Nav } from "./Nav-B_DkzmrK.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { p as projects } from "./router-C24eZfjq.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { A as ArrowDown, c as ArrowUpRight, M as Mail, F as FileText, L as Linkedin, I as Instagram, C as Cloud, S as Sun, h as CloudSun, d as CloudFog, f as CloudRain, g as CloudSnow, e as CloudLightning } from "../_libs/lucide-react.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function SplitFlapDigit({ value, reducedMotion = false }) {
  const [displayed, setDisplayed] = reactExports.useState(value);
  const [previous, setPrevious] = reactExports.useState(value);
  const [flipping, setFlipping] = reactExports.useState(false);
  const timeoutRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (value === displayed) return;
    if (reducedMotion) {
      setDisplayed(value);
      return;
    }
    setPrevious(displayed);
    setFlipping(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setDisplayed(value);
      setFlipping(false);
    }, 120);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [value, displayed, reducedMotion]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "relative inline-block align-middle overflow-visible tabular-nums [transform-style:preserve-3d]",
      style: { width: "0.72em", height: "1.2em", perspective: "200px" },
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute inset-x-0 top-1/2 overflow-hidden",
            style: { height: "50%" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-0 -top-full flex items-center justify-center", style: { height: "200%" }, children: displayed })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute inset-x-0 top-0 overflow-hidden",
            style: { height: "50%" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-0 top-0 flex items-center justify-center", style: { height: "200%" }, children: displayed })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: flipping && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              className: "absolute inset-x-0 top-0 z-20 overflow-hidden",
              style: { height: "50%", transformOrigin: "bottom", backfaceVisibility: "hidden" },
              initial: { rotateX: 0 },
              animate: { rotateX: -90 },
              transition: { duration: 0.12, ease: [0.4, 0, 1, 1] },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-0 top-0 flex items-center justify-center", style: { height: "200%" }, children: previous })
            },
            `top-${previous}-out`
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              className: "absolute inset-x-0 top-1/2 z-20 overflow-hidden",
              style: { height: "50%", transformOrigin: "top", backfaceVisibility: "hidden" },
              initial: { rotateX: 90 },
              animate: { rotateX: 0 },
              transition: { duration: 0.12, delay: 0.12, ease: [0, 0, 0.2, 1] },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-0 -top-full flex items-center justify-center", style: { height: "200%" }, children: value })
            },
            `bot-${value}-in`
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: value })
      ]
    }
  );
}
const ZERO = {
  h1: "0",
  h2: "0",
  m1: "0",
  m2: "0",
  s1: "0",
  s2: "0",
  tz: ""
};
function getTimeParts(timeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short"
  });
  const parts = formatter.formatToParts(/* @__PURE__ */ new Date());
  const get = (type) => parts.find((p) => p.type === type)?.value ?? "00";
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
    tz
  };
}
function LiveTimeTicker({ timeZone }) {
  const [mounted, setMounted] = reactExports.useState(false);
  const [parts, setParts] = reactExports.useState(ZERO);
  const [reducedMotion, setReducedMotion] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  reactExports.useEffect(() => {
    setMounted(true);
    setParts(getTimeParts(timeZone));
    const interval = reducedMotion ? 6e4 : 1e3;
    const id = window.setInterval(
      () => setParts(getTimeParts(timeZone)),
      interval
    );
    return () => window.clearInterval(id);
  }, [timeZone, reducedMotion]);
  const display = mounted ? parts : ZERO;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-3 overflow-visible whitespace-nowrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center overflow-visible font-mono leading-none text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SplitFlapDigit, { value: display.h1, reducedMotion }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SplitFlapDigit, { value: display.h2, reducedMotion }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-[0.1em]", children: ":" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SplitFlapDigit, { value: display.m1, reducedMotion }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SplitFlapDigit, { value: display.m2, reducedMotion }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-[0.1em]", children: ":" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SplitFlapDigit, { value: display.s1, reducedMotion }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SplitFlapDigit, { value: display.s2, reducedMotion })
    ] }),
    display.tz && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: display.tz })
  ] });
}
const VANCOUVER_LAT = 49.2827;
const VANCOUVER_LON = -123.1207;
function iconForWmoCode(code) {
  const p = {
    className: "h-3.5 w-3.5 shrink-0 text-accent",
    strokeWidth: 1.5
  };
  if (code === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { ...p, "aria-hidden": true });
  if (code === 1) return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudSun, { ...p, "aria-hidden": true });
  if (code === 2) return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudSun, { ...p, "aria-hidden": true });
  if (code === 3) return /* @__PURE__ */ jsxRuntimeExports.jsx(Cloud, { ...p, "aria-hidden": true });
  if (code === 45 || code === 48) return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudFog, { ...p, "aria-hidden": true });
  if (code >= 51 && code <= 67) return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudRain, { ...p, "aria-hidden": true });
  if (code >= 71 && code <= 77) return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudSnow, { ...p, "aria-hidden": true });
  if (code >= 80 && code <= 82) return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudRain, { ...p, "aria-hidden": true });
  if (code >= 95) return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudLightning, { ...p, "aria-hidden": true });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Cloud, { ...p, "aria-hidden": true });
}
function VancouverWeather() {
  const [data, setData] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const url = new URL("https://api.open-meteo.com/v1/forecast");
        url.searchParams.set("latitude", String(VANCOUVER_LAT));
        url.searchParams.set("longitude", String(VANCOUVER_LON));
        url.searchParams.set("current", "weather_code");
        url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min");
        url.searchParams.set("timezone", "America/Vancouver");
        url.searchParams.set("forecast_days", "1");
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("weather");
        const json = await res.json();
        if (cancelled) return;
        setData({
          max: json.daily.temperature_2m_max[0],
          min: json.daily.temperature_2m_min[0],
          code: json.current.weather_code
        });
      } catch {
        if (!cancelled) setData(null);
      }
    }
    load();
    const interval = window.setInterval(load, 30 * 60 * 1e3);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);
  if (data === void 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "inline-flex items-center gap-1.5 text-foreground opacity-50",
        "aria-hidden": true,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cloud, { className: "h-3.5 w-3.5 shrink-0 text-accent", strokeWidth: 1.5 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: "—" })
        ]
      }
    );
  }
  if (data === null) {
    return null;
  }
  const hi = Math.round(data.max);
  const lo = Math.round(data.min);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "inline-flex items-center gap-1.5 text-foreground",
      title: `Vancouver today: high ${hi}°C, low ${lo}°C`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sr-only", children: [
          "Vancouver weather today: high ",
          hi,
          " degrees Celsius, low ",
          lo,
          " degrees Celsius."
        ] }),
        iconForWmoCode(data.code),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums tracking-normal normal-case", "aria-hidden": true, children: [
          hi,
          "° ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "/" }),
          " ",
          lo,
          "°"
        ] })
      ]
    }
  );
}
function Hero() {
  const lines = ["Design", "with", "reason."];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative flex min-h-screen items-end px-6 md:px-10 pb-16 pt-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[1440px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.p,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.1 },
        className: "relative z-10 mb-10 flex flex-wrap items-center gap-3 overflow-visible font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-accent", children: "VANCOUVER" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-block h-px w-8 shrink-0 self-center bg-foreground/40",
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex min-h-[1.35em] items-center overflow-visible py-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VancouverWeather, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-block h-px w-8 shrink-0 self-center bg-foreground/40",
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex min-h-[1.35em] items-center overflow-visible py-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveTimeTicker, { timeZone: "America/Vancouver" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(3.5rem,12vw,12rem)] font-semibold leading-[0.9] tracking-tight", children: lines.map((word, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "block overflow-hidden pb-[0.15em] -mb-[0.15em]",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            initial: { y: "110%" },
            animate: { y: 0 },
            transition: {
              duration: 0.9,
              delay: 0.15 + i * 0.12,
              ease: [0.22, 1, 0.36, 1]
            },
            className: "block",
            children: (word === "reason." ? "reason." : word).split("").map((char, j) => {
              const isReasonLetter = word === "reason." && char !== ".";
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  className: `inline-block ${isReasonLetter ? "text-accent italic font-display" : ""}`,
                  whileHover: { rotateY: 360 },
                  transition: {
                    duration: 0.8,
                    ease: [0.42, 0, 0.58, 1]
                  },
                  style: {
                    transformOrigin: "50% 50%",
                    transformStyle: "preserve-3d"
                  },
                  children: char
                },
                j
              );
            })
          }
        )
      },
      word
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.75,
          delay: 1,
          ease: [0.22, 1, 0.36, 1]
        },
        className: "mt-12 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Scroll" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ArrowDown,
            {
              className: "shrink-0 text-foreground/40",
              size: 16,
              strokeWidth: 1.5,
              "aria-hidden": true
            }
          )
        ]
      }
    )
  ] }) });
}
function WorkList() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "work",
      className: "px-6 md:px-10 py-24 md:py-40 scroll-mt-20",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1440px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14 flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Work" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground tabular-nums uppercase tracking-[0.15em]", children: [
            String(projects.length).padStart(2, "0"),
            " Projects"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "border-t border-border/70", children: projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.li,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-80px" },
            transition: {
              duration: 0.6,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1]
            },
            className: "border-b border-border/70",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/work/$slug",
                params: { slug: p.slug },
                className: "group block py-7 md:py-9",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-6 md:gap-10 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground tabular-nums w-8 shrink-0", children: [
                        "0",
                        i + 1
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl md:text-6xl font-medium tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:text-accent", children: p.title })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex flex-1 items-center justify-end gap-10", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: p.role }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground tabular-nums w-44 text-right", children: p.year }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ArrowUpRight,
                        {
                          className: "h-5 w-5 transition-all duration-500 ease-out group-hover:rotate-45 group-hover:text-accent",
                          strokeWidth: 1.5
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "md:hidden mt-3 ml-14 text-sm text-muted-foreground", children: [
                    p.year,
                    " · ",
                    p.role
                  ] })
                ]
              }
            )
          },
          p.slug
        )) })
      ] })
    }
  );
}
const skills = [
  "Prototyping",
  "Wireframing",
  "Design & colour systems",
  "Responsive UI",
  "Interaction design",
  "Usability testing",
  "Accessibility (WCAG)",
  "Packaging design",
  "Typography"
];
const tools = [
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Adobe After Effects",
  "Lovable",
  "Stitch",
  "Base44"
];
const soft = [
  "Adaptability",
  "Time management",
  "Clear communicator",
  "Cross-functional collaborator",
  "Conflict resolution",
  "Detail-oriented",
  "Strong prioritization",
  "Bilingual (EN/KR)"
];
function Group({ title, items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-wrap gap-2", children: items.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "li",
      {
        className: "rounded-full border border-border bg-transparent px-3 py-1.5 text-sm text-foreground/80 transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-accent-foreground",
        children: s
      },
      s
    )) })
  ] });
}
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "about",
      className: "px-6 md:px-10 py-24 md:py-40 scroll-mt-20 border-t border-border/70",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1440px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14 flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "About" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Jisoo Jang" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-16 md:grid-cols-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.7 },
              className: "md:col-span-7",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight", children: [
                "I design products with",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-accent", children: "reason" }),
                ". I believe good design is effortless — it works naturally, gets out of the way, and lets people get on with their lives."
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.7, delay: 0.1 },
              className: "md:col-span-5 md:pt-4 space-y-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { title: "Skills", items: skills }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { title: "Tools", items: tools }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { title: "Soft skills", items: soft })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
const email = "jisoo.design@icloud.com";
const links = [
  { label: "Email", href: `mailto:${email}`, icon: Mail, external: false },
  { label: "Resume", href: "/Jisoo_Jang_Resume.pdf", icon: FileText, external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jisoojang",
    icon: Linkedin,
    external: true
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jisoojang.design",
    icon: Instagram,
    external: true
  }
];
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "contact",
      className: "px-6 md:px-10 py-24 md:py-40 scroll-mt-20 border-t border-border/70",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1440px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14 flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "I'd love to hear from you!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-80px" },
            transition: { duration: 0.7 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl md:text-4xl font-medium tracking-tight text-foreground/60 mb-4", children: "Reach out to me!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `mailto:${email}`,
                  className: "group inline-block font-display text-[clamp(2.25rem,8vw,7rem)] font-semibold leading-none tracking-tight",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-[length:0%_2px] bg-no-repeat bg-[position:0_100%] transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px] group-hover:text-accent", children: email })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4", children: links.map((l, i) => {
          const Icon = l.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.a,
            {
              href: l.href,
              target: l.external ? "_blank" : void 0,
              rel: l.external ? "noopener noreferrer" : void 0,
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: i * 0.06 },
              className: "group flex aspect-[5/4] flex-col justify-between rounded-md border border-border p-5 transition-colors hover:border-foreground hover:bg-foreground hover:text-background",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    className: "h-5 w-5",
                    strokeWidth: 1.5
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl md:text-2xl font-medium tracking-tight", children: l.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-60 group-hover:opacity-100", children: "↗" })
                ] })
              ]
            },
            l.label
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-24 flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-t border-border/70 pt-8 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " Jisoo Jang."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Designed & built with care." })
        ] })
      ] })
    }
  );
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WorkList, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {})
  ] });
}
export {
  Index as component
};
