import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Root, b as Trigger, P as Portal, O as Overlay, a as Content, T as Title, C as Close } from "../_libs/radix-ui__react-dialog.mjs";
import { a as TransformWrapper, T as TransformComponent } from "../_libs/react-zoom-pan-pinch.mjs";
import { N as Nav, c as cn } from "./Nav-B_DkzmrK.mjs";
import { R as Route, p as projects } from "./router-C24eZfjq.mjs";
import { a as ArrowLeft, c as ArrowUpRight, X } from "../_libs/lucide-react.mjs";
import { m as motion, u as useInView, a as animate } from "../_libs/framer-motion.mjs";
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
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const objectPositionClass = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  "top-left": "object-left-top"
};
function CaseStudyEmbedImage({
  src,
  alt,
  objectPosition = "center",
  fit = "cover",
  lightbox = false,
  embedVariant = "section"
}) {
  const posClass = objectPositionClass[objectPosition];
  const frameShellClass = "overflow-hidden rounded-md border border-border bg-muted aspect-[16/10] md:aspect-[21/10]";
  const frameWrapClass = fit === "contain" ? cn(frameShellClass, "flex items-center justify-center") : frameShellClass;
  const imgClass = fit === "contain" ? cn(
    "max-h-full max-w-full object-contain object-center",
    lightbox && "transition-transform duration-300 ease-out group-hover:scale-[1.015]"
  ) : cn(
    "h-full w-full object-cover",
    posClass,
    lightbox && "transition-transform duration-300 ease-out group-hover:scale-[1.015]"
  );
  const embedVariantClasses = embedVariant === "gridCell" ? "my-0 w-full min-w-0 max-w-none" : "my-10 w-full max-w-5xl md:my-14";
  const figureClassName = cn("shrink-0", embedVariantClasses);
  if (!lightbox) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("figure", { className: figureClassName, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-full", frameWrapClass), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt,
        className: imgClass,
        loading: "lazy",
        decoding: "async"
      }
    ) }) });
  }
  const previewButton = /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: "group block w-full cursor-zoom-in rounded-md bg-transparent p-0 text-left outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "aria-haspopup": "dialog",
      "aria-label": `Open fullscreen: ${alt}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-full", frameWrapClass), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src,
          alt: "",
          className: imgClass,
          loading: "lazy",
          decoding: "async",
          "aria-hidden": true
        }
      ) })
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("figure", { className: figureClassName, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Root, { modal: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { asChild: true, children: previewButton }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Portal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Overlay,
        {
          className: cn(
            "fixed inset-0 z-[100] bg-black/65 backdrop-blur-[2px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Content,
        {
          className: cn(
            "fixed inset-0 z-[100] flex flex-col outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          ),
          onCloseAutoFocus: (e) => e.preventDefault(),
          "aria-describedby": void 0,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "sr-only", children: alt }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Close,
              {
                className: "absolute right-5 top-5 z-[110] rounded-full border border-border bg-background/95 p-2.5 text-foreground shadow-md transition-colors hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring md:right-8 md:top-8",
                "aria-label": "Close preview",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5", strokeWidth: 1.75 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 flex-1 flex-col pt-14 md:pt-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative grid min-h-0 flex-1 place-items-center touch-none px-2 pb-2 md:px-4 md:pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[min(calc(100dvh-9rem),100%)] w-full max-w-[min(100vw-2rem,1920px)] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                TransformWrapper,
                {
                  initialScale: 1,
                  minScale: 0.35,
                  maxScale: 12,
                  centerOnInit: true,
                  centerZoomedOut: true,
                  wheel: {
                    step: 0.12,
                    wheelDisabled: false
                  },
                  pinch: {
                    step: 12
                  },
                  doubleClick: {
                    disabled: false,
                    mode: "reset"
                  },
                  panning: {
                    velocityDisabled: false
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TransformComponent,
                    {
                      wrapperClass: "flex h-full w-full items-center justify-center",
                      contentClass: "flex !h-full !w-full items-center justify-center [&>img]:mx-auto [&>img]:my-auto",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src,
                          alt,
                          className: "max-h-[min(calc(100dvh-9rem),90vh)] w-auto max-w-full select-none object-contain",
                          draggable: false
                        }
                      )
                    }
                  )
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pointer-events-none px-4 pb-3 text-center text-xs text-muted-foreground md:text-sm", children: "두 손가락으로 확대/축소 · 마우스 드래그로 이동 · 휠로 확대 · 더블클릭으로 초기화" })
            ] })
          ]
        }
      )
    ] })
  ] }) });
}
const scaffoldSections = [
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
    id: "learning-outcomes"
  }
];
function SectionNav({
  sections,
  revealAfterSelector,
  hideWhenPastSelector
}) {
  const hideSelector = hideWhenPastSelector?.trim() ?? "";
  const [scrollFactor, setScrollFactor] = reactExports.useState(0);
  const [nextOverlapEase, setNextOverlapEase] = reactExports.useState(1);
  const dockReveal = scrollFactor * nextOverlapEase;
  const [activeId, setActiveId] = reactExports.useState(sections[0]?.id ?? "");
  reactExports.useEffect(() => {
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
        threshold: Array.from({ length: 41 }, (_, i) => i / 40)
      }
    );
    observer.observe(endEl);
    return () => observer.disconnect();
  }, [hideSelector]);
  reactExports.useEffect(() => {
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
        body.offsetHeight
      );
      const scrollBottom = window.scrollY + ih;
      const atDocumentBottom = scrollBottom >= scrollHeight - Math.max(120, ih * 0.1);
      let factor = 0;
      if (!pastIntro) {
        factor = 0;
      } else if (!hideWhenPastSelector) {
        factor = 1;
      } else if (atDocumentBottom) {
        factor = 0;
      } else {
        const endEl = document.querySelector(hideWhenPastSelector);
        if (!endEl) {
          factor = 1;
        } else {
          const rect = endEl.getBoundingClientRect();
          const top = rect.top;
          const bottom = rect.bottom;
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
  reactExports.useEffect(() => {
    const elements = sections.map((s) => document.getElementById(s.id)).filter((el) => !!el);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting).sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        if (visibleEntries[0]) setActiveId(visibleEntries[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      "aria-label": "Section navigation",
      style: {
        opacity: dockReveal,
        transform: `translateY(-50%) translateX(${-18 * (1 - dockReveal)}px)`,
        pointerEvents: dockReveal > 0.08 ? "auto" : "none"
      },
      className: "group/nav fixed left-0 top-1/2 z-40 hidden w-fit max-w-full pl-6 pr-6 transition-[opacity,transform] duration-700 ease-in-out motion-reduce:transition-none lg:inline-block md:pl-10",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "w-fit space-y-3 font-mono text-xs uppercase tracking-[0.2em]", children: sections.map((s) => {
        const isActive = activeId === s.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `#${s.id}`,
            className: `group flex items-start gap-3 pe-8 leading-[1.5] py-1 -my-1 transition-colors duration-500 ${isActive ? "text-foreground" : "text-foreground/40 hover:text-foreground/80"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `mt-[0.55em] h-px transition-all duration-500 ease-out ${isActive ? "w-8 bg-accent" : "w-4 bg-foreground/30 group-hover/nav:w-3"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-accent transition-all duration-500 ease-out ${isActive ? "opacity-100" : "opacity-60 group-hover/nav:opacity-100"}`,
                  children: s.num
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block max-w-4 overflow-hidden shrink-0 transition-[max-width] duration-200 ease-out group-hover/nav:max-w-48 group-hover/nav:duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block min-w-[12rem] w-48 whitespace-normal transition-[transform,opacity] duration-500 ease-out -translate-x-6 opacity-0 group-hover/nav:translate-x-0 group-hover/nav:opacity-100 will-change-transform", children: s.label }) })
            ]
          }
        ) }, s.id);
      }) })
    }
  );
}
function formatInlineBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-foreground", children: part.slice(2, -2) }, i);
    }
    return part;
  });
}
function isNumberedBulletLine(para) {
  return /^\d+\.\s/.test(para) || /^\*\*\d+\.\s/.test(para);
}
function groupParagraphRuns(paragraphs) {
  const groups = [];
  for (const para of paragraphs) {
    const numbered = isNumberedBulletLine(para);
    const prev = groups[groups.length - 1];
    if (prev && prev.numbered === numbered) {
      prev.items.push(para);
    } else {
      groups.push({
        numbered,
        items: [para]
      });
    }
  }
  return groups;
}
function formatStatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
function AnimatedStatNumber({
  value,
  suffix,
  delay = 0,
  active
}) {
  const [text, setText] = reactExports.useState("0");
  reactExports.useEffect(() => {
    if (!active) return;
    const decimals = Number.isInteger(value) ? 0 : 1;
    const controls = animate(0, value, {
      delay,
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        const n = decimals === 0 ? Math.round(latest) : Math.round(latest * 10) / 10;
        setText(formatStatNumber(n));
      }
    });
    return () => controls.stop();
  }, [value, delay, active]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
    text,
    suffix
  ] });
}
function StatHeadline({
  stat,
  delay,
  active
}) {
  const hasSubline = stat.headlineBottom != null && stat.headlineBottom !== "";
  const topSuffix = hasSubline ? stat.suffix ?? "" : stat.suffix ?? "%";
  if (hasSubline) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col items-start gap-2 leading-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedStatNumber, { value: stat.value, suffix: topSuffix, delay, active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { className: "block", initial: {
        opacity: 0,
        y: 10
      }, animate: active ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 10
      }, transition: {
        duration: 0.5,
        delay: delay + 0.15,
        ease: [0.22, 1, 0.36, 1]
      }, children: stat.headlineBottom })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedStatNumber, { value: stat.value, suffix: topSuffix, delay, active });
}
function CaseStudyStatsRow({
  stats,
  tightBottom = false
}) {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.35
  });
  const padding = tightBottom ? "pt-10 pb-4 sm:pt-14 sm:pb-5 md:pt-16 md:pb-6" : "py-10 sm:py-14 md:py-16";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: `grid w-full max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:gap-12 ${padding}`, children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item flex min-w-0 flex-col gap-3 text-left", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-4xl font-semibold leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatHeadline, { stat, delay: i * 0.12, active: inView }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg leading-relaxed text-foreground/85", children: formatInlineBold(stat.label) })
  ] }, i)) });
}
function renderCaseStudyBlocks(blocks) {
  const out = [];
  let stringRun = [];
  let key = 0;
  const flushStrings = () => {
    if (stringRun.length === 0) return;
    const groups = groupParagraphRuns(stringRun);
    for (const group of groups) {
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: group.numbered ? "space-y-1.5" : "space-y-5", children: group.items.map((para, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatInlineBold(para) }, i)) }, `cs-${key++}`));
    }
    stringRun = [];
  };
  for (const block of blocks) {
    if (typeof block === "string") {
      stringRun.push(block);
    } else if ("vspace" in block && block.vspace === true) {
      flushStrings();
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 shrink-0 md:h-4", "aria-hidden": true }, `cs-${key++}`));
    } else if ("highlight" in block && typeof block.highlight === "string" && block.highlight.length > 0) {
      flushStrings();
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-lg leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-sm bg-accent px-0.5 py-0.5 font-semibold text-accent-foreground [box-decoration-break:clone] md:px-1 md:py-1 [&_strong]:text-accent-foreground", children: formatInlineBold(block.highlight) }) }, `cs-${key++}`));
    } else if ("image" in block && block.image && typeof block.image.src === "string" && typeof block.image.alt === "string") {
      flushStrings();
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudyEmbedImage, { src: block.image.src, alt: block.image.alt, objectPosition: block.image.objectPosition, fit: block.image.fit, lightbox: block.image.lightbox === true }, `cs-${key++}`));
    } else if ("imagePair" in block && block.imagePair) {
      flushStrings();
      const [left, right] = block.imagePair;
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-10 grid w-full max-w-5xl shrink-0 grid-cols-1 gap-4 sm:grid-cols-2 md:my-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudyEmbedImage, { embedVariant: "gridCell", src: left.src, alt: left.alt, objectPosition: left.objectPosition, fit: left.fit, lightbox: left.lightbox === true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudyEmbedImage, { embedVariant: "gridCell", src: right.src, alt: right.alt, objectPosition: right.objectPosition, fit: right.fit, lightbox: right.lightbox === true })
      ] }, `cs-${key++}`));
    } else if ("imageQuad" in block && block.imageQuad) {
      flushStrings();
      const rowKey = key++;
      const cells = block.imageQuad;
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-10 grid w-full max-w-5xl shrink-0 grid-cols-2 gap-3 sm:gap-4 md:my-14", children: cells.map((cell, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudyEmbedImage, { embedVariant: "gridCell", src: cell.src, alt: cell.alt, objectPosition: cell.objectPosition, fit: cell.fit, lightbox: cell.lightbox === true }, `cs-${rowKey}-c${i}`)) }, `cs-${rowKey}`));
    } else if ("video" in block && block.video && typeof block.video.src === "string") {
      flushStrings();
      const vidTitle = typeof block.video.title === "string" && block.video.title.length > 0 ? block.video.title : "Demonstration video";
      const poster = typeof block.video.poster === "string" && block.video.poster.length > 0 ? block.video.poster : void 0;
      let widthPct = 90;
      if (typeof block.video.widthPct === "number" && block.video.widthPct > 0 && block.video.widthPct <= 100) {
        widthPct = block.video.widthPct;
      }
      const maxHeightCss = typeof block.video.maxHeightCss === "string" && block.video.maxHeightCss.trim().length > 0 ? block.video.maxHeightCss.trim() : "min(92vh, 1040px)";
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("figure", { className: "my-10 w-full max-w-5xl shrink-0 md:my-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("video", { className: "mx-auto block h-auto max-w-none rounded-md border border-border bg-muted", controls: true, autoPlay: true, muted: true, playsInline: true, loop: true, preload: "auto", poster, "aria-label": vidTitle, style: {
        width: `${widthPct}%`,
        maxHeight: maxHeightCss
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: block.video.src, type: "video/mp4" }) }) }, `cs-${key++}`));
    } else if ("ul" in block && Array.isArray(block.ul)) {
      flushStrings();
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc space-y-2 pl-6 marker:text-foreground/70", children: block.ul.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: formatInlineBold(item) }, i)) }, `cs-${key++}`));
    } else if ("stats" in block && Array.isArray(block.stats)) {
      flushStrings();
      const after = "afterStats" in block && typeof block.afterStats === "string" && block.afterStats.length > 0 ? block.afterStats : null;
      if (after) {
        out.push(/* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudyStatsRow, { stats: block.stats, tightBottom: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-lg leading-relaxed text-foreground/85", children: formatInlineBold(after) })
        ] }, `cs-${key++}`));
      } else {
        out.push(/* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudyStatsRow, { stats: block.stats }, `cs-${key++}`));
      }
    }
  }
  flushStrings();
  return out;
}
function CaseStudySectionBody({
  sectionId,
  project
}) {
  if (sectionId === "overview") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 text-lg leading-relaxed text-foreground/85 max-w-3xl", children: project.overview?.map((para, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatInlineBold(para) }, i)) });
  }
  const blocks = project.caseStudySections?.[sectionId];
  if (blocks?.length) {
    const useWideReadingColumn = blocks.some((b) => typeof b === "object" && b !== null && ("stats" in b || "image" in b || "imagePair" in b || "imageQuad" in b || "video" in b));
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `space-y-5 text-lg leading-relaxed text-foreground/85 ${useWideReadingColumn ? "max-w-5xl" : "max-w-3xl"}`, children: renderCaseStudyBlocks(blocks) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-foreground/60 max-w-3xl", children: "Content coming soon!" });
}
function ProjectPage() {
  const project = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionNav, { sections: scaffoldSections, revealAfterSelector: "#intro-visuals", hideWhenPastSelector: "#next-project" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "px-6 md:px-10 pt-32 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1440px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", hash: "work", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " All work"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h1, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }, className: "font-display text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.95] tracking-tight", children: project.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, transition: {
        duration: 0.6,
        delay: 0.3
      }, className: "mt-6 max-w-2xl text-lg md:text-xl text-foreground/70", children: project.summary })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "intro-visuals", className: "px-6 md:px-10 pb-24 md:pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1440px] grid gap-4 sm:grid-cols-2", children: [0, 1, 2, 3].map((i) => {
      const tile = project.introVisuals?.[i];
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `aspect-[4/3] overflow-hidden rounded-md border border-border ${tile ? "bg-muted" : "flex items-center justify-center bg-secondary"}`, children: tile ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: tile.src, alt: tile.alt, className: "h-full w-full object-cover", loading: "lazy", decoding: "async" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        "Visual ",
        i + 1
      ] }) }, i);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 md:px-10 pb-24 md:pb-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1440px] lg:pl-64 space-y-24 md:space-y-32", children: scaffoldSections.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: s.id, className: "scroll-mt-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: s.num }),
        " ",
        "  ",
        s.label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-5xl font-medium tracking-tight mb-6", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudySectionBody, { sectionId: s.id, project })
    ] }, s.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "next-project", className: "border-t border-border/70 px-6 md:px-10 py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1440px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6", children: "Next project" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/work/$slug", params: {
        slug: next.slug
      }, className: "group flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-4xl md:text-7xl font-medium tracking-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent", children: next.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-6 w-6 transition-transform duration-500 group-hover:rotate-45 group-hover:text-accent", strokeWidth: 1.5 })
      ] })
    ] }) })
  ] });
}
export {
  ProjectPage as component
};
