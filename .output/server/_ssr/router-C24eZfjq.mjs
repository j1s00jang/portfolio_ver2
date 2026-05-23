import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { E as notFound } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { b as ArrowUp } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const appCss = "/assets/styles-C7lVrY8a.css";
const ThemeContext = reactExports.createContext({ theme: "light", toggle: () => {
} });
function ThemeProvider({ children }) {
  const [theme, setTheme] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);
  reactExports.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ThemeContext.Provider,
    {
      value: { theme, toggle: () => setTheme((t) => t === "dark" ? "light" : "dark") },
      children
    }
  );
}
const useTheme = () => reactExports.useContext(ThemeContext);
function BackToTop() {
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handleClick,
      "aria-label": "Back to top",
      className: `fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-center justify-center gap-0.5 h-12 w-12 rounded-full bg-foreground text-background shadow-lg transition-all duration-500 ease-out hover:scale-110 hover:bg-accent ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3.5 w-3.5", strokeWidth: 2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] tracking-[0.12em]", children: "TOP" })
      ]
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$2 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$2.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackToTop, {})
  ] }) });
}
const $$splitComponentImporter$1 = () => import("./index-BQYCXXIK.mjs");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Jisoo Jang — Product Designer"
    }, {
      name: "description",
      content: "Portfolio of Jisoo Jang, a product designer crafting calm, considered interfaces."
    }, {
      property: "og:title",
      content: "Jisoo Jang — Product Designer"
    }, {
      property: "og:description",
      content: "Selected work in product, UX, and graphic design."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const montro = {
  slug: "montro",
  title: "Montro",
  year: "Jan 2025 — May 2025",
  role: "UX/UI Designer, UX Researcher",
  summary: "Gamified expense-tracking app that builds spending & saving goals and reward milestones.",
  overview: [
    "Money apps are usually punishing. Montro reframes budgeting as a game with milestones, streaks, and small rewards that make consistent saving feel achievable.",
    "I designed the goal system, reward loop, and the daily logging flow with a focus on motivation without manipulation."
  ],
  tags: ["Mobile", "Gamification", "Product Design"]
};
const projectPulse = {
  slug: "project-pulse",
  title: "ProjectPulse",
  year: "Apr 2026 — May 2026",
  role: "UX/UI Designer",
  summary: "End-to-end product experience — research through UI for a structured workflow and clarity at every step.",
  overview: [
    "ProjectPulse organizes complex project activity into a clear, scannable system so teams can see status and next actions without digging through tools.",
    "I owned UX/UI: mapping core flows, refining the interface hierarchy, and tightening patterns so the product feels consistent from onboarding to delivery."
  ],
  tags: ["Product Design", "UX", "UI"]
};
const scaffold = {
  slug: "scaffold",
  title: "Scaffold",
  year: "Sept 2025 — Dec 2025",
  role: "UX/UI Designer, UX Researcher",
  summary: "AI-assisted, all-in-one financial resource platform that consolidates grant information for tradespeople.",
  introVisuals: [
    {
      src: "/Scaffold/01_visual01.png",
      alt: "Scaffold project overview visual 1"
    },
    {
      src: "/Scaffold/02_visual02.png",
      alt: "Scaffold project overview visual 2"
    },
    {
      src: "/Scaffold/03_visual03.png",
      alt: "Scaffold project overview visual 3"
    },
    {
      src: "/Scaffold/04_visual04.png",
      alt: "Scaffold project overview visual 4"
    }
  ],
  overview: [
    "**Scaffold is an AI-assisted, all-in-one financial resource platform** that helps skilled tradespeople find eligible grants to advance their careers without financial struggles. Funding information is scattered, outdated, and time-consuming to evaluate.",
    "**Scaffold filters all eligible grants to apply easily and quickly** based on the user’s profile created in the early stage. With a web supplement, users complete an essay with the help of assistant AI."
  ],
  caseStudySections: {
    opportunities: [
      "A key challenge was reducing friction in the application process while keeping content clear and easy to navigate on a small screen. The key focus was to make grant information simpler to find, easier to understand, and faster to act on, so fewer deadlines and funding options will be missed.",
      "**High-level goals were to:**",
      "1. Show eligible resources in one place to reduce website-hopping.",
      "2. Make information easy to scan on mobile so as not to miss the deadline.",
      "3. Reduce repetitive typing to lower frustration and speed up applications."
    ],
    "user-research": [
      "Early user research was conducted through visiting a construction site and reaching out to skilled tradespeople through referrals and personal networks. The findings helped clarify the project’s direction and supported what to focus on.",
      "**Missing Grant Deadlines, Giving up on Grants? Why?:**",
      {
        stats: [
          {
            value: 75,
            label: "Don't know where to find information about grants"
          },
          {
            value: 55.6,
            label: "Don't know what's available"
          },
          {
            value: 28,
            label: "Changed my career path because of financial struggles"
          }
        ]
      },
      "The results showed that missed deadlines are not only about eligibility, but also about the difficulty of finding and applying for grants. Eventually, that could lead to giving up their careers.",
      {
        image: {
          src: "/Scaffold/05_research.webp",
          alt: "Chart summarizing early user research: grant information barriers and outcomes"
        }
      },
      "The research insights were synthesized into a user persona to guide the design process. This persona represents a skilled tradesperson who faces challenges in finding and applying for grants due to scattered information and time constraints.",
      {
        image: {
          src: "/Scaffold/06_personas.webp",
          alt: "User persona representing a skilled tradesperson navigating grant opportunities",
          objectPosition: "top",
          lightbox: true
        }
      }
    ],
    findings: [
      "Four insights shaped a clear expectation: financial resources should be easy to find, simple to understand, and quick to act on.",
      "**Key Findings:**",
      "**1. Minimal friction:** Reduce steps and repeated input where possible.",
      "**2. Clear guidance:** Show key information and requirements clearly and easy to follow.",
      "**3. Mobile-first clarity:** Help users scan key details quickly on a small screen.",
      "**4. Writing essays support:** Support writing essays draftwith AI help.",
      "Day-to-day routines and real-world constraints were considered early, including work schedules and on-the-go use. Key scenarios were mapped into simple journeys, then translated into a set of context rules to guide feature decisions and layout priorities—keeping the core flow focused on eligibility, clear steps, and deadline visibility.",
      {
        image: {
          src: "/Scaffold/07_user_flow.webp",
          alt: "User flow diagram mapping key scenarios from eligibility to deadline visibility",
          objectPosition: "top-left",
          lightbox: true
        }
      }
    ],
    "brand-guidelines": [
      {
        image: {
          src: "/Scaffold/08_brand_guidelines.webp",
          alt: "Scaffold brand guidelines: logo, colours, and typography hierarchy",
          lightbox: true
        }
      },
      "Scaffold logo created from the letter **S** and stacked block shapes **to represent a strong foundation.**",
      {
        ul: [
          "**Purple:** Creates a calm, confident anchor that supports focus and brand recognition.",
          "**Orange:** Communicate a strong connection and support for the user."
        ]
      },
      "Typography follows the same principle: one typeface supports a strong hierarchy for titles and labels, while a highly legible typeface is used for longer content to reduce reading fatigue on small screens."
    ],
    "lo-fis-hi-fis": [
      "**Lo-Fis:**",
      {
        image: {
          src: "/Scaffold/09_lofis.webp",
          alt: "Scaffold mobile lo-fidelity wireframes",
          lightbox: true
        }
      },
      "**Hi-Fis:**",
      {
        image: {
          src: "/Scaffold/10_hifis.webp",
          alt: "Scaffold mobile hi-fidelity screens",
          lightbox: true
        }
      }
    ],
    "key-features": [
      "Grant information needed to be easy to read at a glance without missing critical details. Scaffold focused on three core features that reduce friction and help users act on opportunities faster.",
      "**1. Scan-friendly grant cards:** A card-based layout highlights the grant name, deadline, and eligibility at a glance. Each card also includes the organization’s logo to support quick recognition. This structure helps users quickly identify eligible grants in British Columbia, Canada, while staying flexible enough to scale across different needs and contexts.",
      {
        video: {
          src: "/Scaffold/11_feature01.mp4",
          title: "Grant card layout and scanning on mobile — feature demo"
        }
      },
      "**2. Voice input for profile setup:** Users can build a profile with voice input on the go. The AI captures key details even with unclear speech. The profile can be reused across applications and helps filter eligible grants on the dashboard.",
      {
        video: {
          src: "/Scaffold/12_feature02.mp4",
          title: "Voice input for profile setup — feature demo"
        }
      },
      "**3. AI-assisted writing essays and web supplement:** Since writing essays on a phone is inconvenient, a web supplement supports drafting on a larger screen. It also offers AI help to generate a first draft using the saved profile details for faster, more consistent submissions.",
      {
        video: {
          src: "/Scaffold/13_feature03.mp4",
          title: "AI-assisted essay drafting and web supplement — feature demo",
          widthPct: 100,
          maxHeightCss: "min(76vh, 860px)"
        }
      }
    ],
    "print-design": [
      "The brochure layout was designed to grab attention with Scaffold’s bold logo and a concise slogan. A subtle grid pattern in the background references scaffolding and reinforces the visual identity.",
      "The business card uses the same colour palette to maintain brand consistency. Soft curved edges create a distinctive, approachable look, helping the card stand out while staying aligned with the overall brand.",
      {
        image: {
          src: "/Scaffold/14_print.png",
          alt: "Scaffold brochure and business card — print collateral",
          lightbox: true
        }
      },
      "This work highlighted the real-world differences between **RGB** and **CMYK**. Multiple rounds of print testing helped refine the colour palette and improve consistency from screen to print.",
      "It also reinforced the value of strong grid systems in print design—supporting clearer hierarchy, alignment, and spacing across both the brochure and business card layouts."
    ],
    "product-storytelling": [
      "Scaffold’s promotional video was created to showcase strong product storytelling from insight to narrative. The concept was built from a research-backed moment: **a skilled tradeswoman was able to keep her career path without giving up because of financial struggles.**",
      "A complete storyboard and script were developed independently to translate that insight into a clear, emotionally grounded story angle. The final video premiered on pitch day in front of 300 attendees to introduce the app concept and reinforce Scaffold’s core message:",
      "**Resources exist, Roadblocks don't have to.**",
      {
        image: {
          src: "/Scaffold/15_storytelling01.webp",
          alt: "Promotional video storyboard frames for Scaffold",
          lightbox: true
        }
      },
      {
        imagePair: [
          {
            src: "/Scaffold/16_storytelling02.png",
            alt: "Behind the scenes",
            lightbox: true
          },
          {
            src: "/Scaffold/17_storytelling03.jpg",
            alt: "Filming at the hallway",
            lightbox: true
          }
        ]
      }
    ],
    "promotional-video": [
      {
        video: {
          src: "/Scaffold/18_promo_vid.mp4",
          title: "Scaffold promotional video — pitch reel",
          widthPct: 100,
          maxHeightCss: "min(92vh, 1040px)"
        }
      }
    ],
    "learning-outcomes": [
      {
        stats: [
          {
            value: 3,
            headlineBottom: "rd place",
            label: "BCIT D3/FSWD x ConnectHER innovation showcase"
          },
          {
            value: 3,
            headlineBottom: "minutes",
            label: "Re-applying eligible grants with Scaffold app"
          },
          {
            value: 86.6,
            suffix: "%",
            headlineBottom: "faster",
            label: "From 112 min to 15 min (timed usability test, n=5)"
          }
        ],
        afterStats: "Traditional workflow average 112 min (Scenario:Google search → eligibility review → application drafting). With Scaffold average is 15 min, including creating a profile and applying eligible grants. It took average **3m** to re-applying eligible grants, excluding essay writing."
      },
      "(Usability Testing Doc)",
      { vspace: true },
      "Presentation day photos",
      {
        imageQuad: [
          {
            src: "/Scaffold/19_showcase01.jpg",
            alt: "BCIT showcase — Scaffold presentation booth, photo 1",
            lightbox: true
          },
          {
            src: "/Scaffold/20_showcase02.jpeg",
            alt: "BCIT showcase — Scaffold presentation booth, photo 2",
            lightbox: true
          },
          {
            src: "/Scaffold/21_showcase03.jpeg",
            alt: "BCIT showcase — Scaffold presentation booth, photo 3",
            lightbox: true
          },
          {
            src: "/Scaffold/22_showcase04.jpeg",
            alt: "BCIT showcase — Scaffold presentation booth, photo 4",
            lightbox: true
          }
        ]
      },
      "**What I learned from Scaffold project:**",
      "**1. Team collaboration and communication:** Working with 6 team members from all different perspectives to deliver a project from start to finish. This project isn't just an assignment, but a great opportunity to learn and grow as a versatile team.",
      "**2. Research-to-product thinking:** to gain real-user's struggles, visit construction sites and listen what they get through. And, turning the insight into a product to keep their career path without giving up because of financial struggles.",
      "**3. End-to-end UX execution:** create clear IA, wireframes, UI system, prototype and finally, a live demo.",
      "**4. Storytelling:** pitching a product with a storyboard and promotional video.",
      "**5. Iteration discipline:** test → adjust → incorporate feedback → improve.",
      { vspace: true },
      "**Scaffold's next steps** are to expand into more grants and regions, and to add more features, such as keeping personal documents secure in the app so users can apply directly from the app and track the process. Scaffold's core proposition will always be to help tradespeople find financial support, **because no one should pause or stop a career path due to a lack of accessible financial support.**",
      "**Resources exist, Roadblocks don't have to**."
    ]
  },
  tags: ["UX/UI Design", "Research", "IA", "Product Design", "AI UX"]
};
const visualDesign = {
  slug: "visual-design",
  title: "Visual Design",
  year: "2025",
  role: "Graphic Designer",
  summary: "Selected visual work spanning layout, type, and colour — built for clarity and shelf presence.",
  overview: [
    "A mix of self-initiated and client-facing pieces focused on strong hierarchy, restraint, and memorable detail.",
    "Case studies for individual deliverables can be added as this section grows."
  ],
  tags: ["Visual Design", "Brand", "Typography"]
};
const projects = [
  projectPulse,
  scaffold,
  montro,
  visualDesign
];
const getProject = (slug) => projects.find((p) => p.slug === slug);
const $$splitComponentImporter = () => import("./work._slug-eJBVe6Gm.mjs");
const $$splitErrorComponentImporter = () => import("./work._slug-BmjK-aFe.mjs");
const $$splitNotFoundComponentImporter = () => import("./work._slug-B5EgjYwI.mjs");
const Route = createFileRoute("/work/$slug")({
  loader: ({
    params
  }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: `${loaderData?.title ?? "Project"} — Jisoo Jang`
    }, {
      name: "description",
      content: loaderData?.summary ?? ""
    }, {
      property: "og:title",
      content: `${loaderData?.title ?? "Project"} — Jisoo Jang`
    }, {
      property: "og:description",
      content: loaderData?.summary ?? ""
    }]
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const WorkSlugRoute = Route.update({
  id: "/work/$slug",
  path: "/work/$slug",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  WorkSlugRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  projects as p,
  router as r,
  useTheme as u
};
