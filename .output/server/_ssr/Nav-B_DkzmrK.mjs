import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { u as useTheme } from "./router-C24eZfjq.mjs";
import { S as Sun, i as Moon } from "../_libs/lucide-react.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: toggle,
      "aria-label": "Toggle theme",
      className: "group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-foreground",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 shrink text-right", children: isDark ? "LIGHT" : "DARK" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 transition-[background-color,border-color,color] duration-200 [&_svg]:transition-colors",
              !isDark && "group-hover:border-white group-hover:bg-[oklch(0.18_0.005_80)] [&_svg]:text-foreground group-hover:[&_svg]:text-white",
              isDark && "group-hover:border-[oklch(0.262_0_0)] group-hover:bg-[oklch(0.978_0.008_80)] [&_svg]:text-foreground group-hover:[&_svg]:text-[oklch(0.262_0_0)]"
            ),
            children: isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { size: 14, strokeWidth: 1.75, className: "shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 14, strokeWidth: 1.75, className: "shrink-0" })
          }
        )
      ]
    }
  );
}
const items = [
  { num: "01", label: "WORK", href: "#work" },
  { num: "02", label: "ABOUT", href: "#about" },
  { num: "03", label: "CONTACT", href: "#contact" }
];
function Nav() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const { location } = useRouterState();
  const onHome = location.pathname === "/";
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md bg-background/75 border-b border-border/60" : "bg-transparent"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "font-mono text-xs font-medium uppercase tracking-[0.2em] hover:text-accent transition-colors",
            children: [
              "JISOO JANG",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-muted-foreground font-normal hidden sm:inline", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "—" }),
                " PRODUCT DESIGNER"
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex items-center gap-7 font-mono text-xs uppercase tracking-[0.2em]", children: items.map(
          (it) => onHome ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: it.href,
              className: "relative text-foreground/80 hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: it.num }),
                " ",
                it.label
              ]
            },
            it.label
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              hash: it.href.slice(1),
              className: "text-foreground/80 hover:text-foreground transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: it.num }),
                " ",
                it.label
              ]
            },
            it.label
          )
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}) })
      ] })
    }
  );
}
export {
  Nav as N,
  cn as c
};
