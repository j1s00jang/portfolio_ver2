export type Project = {
    slug: string;
    title: string;
    year: string;
    role: string;
    summary: string;
    overview?: string[];
    tags?: string[];
};

export const projects: Project[] = [
    {
        slug: "project-pulse",
        title: "ProjectPulse",
        year: "Apr 2026 — May 2026",
        role: "UX/UI Designer",
        summary:
            "End-to-end product experience — research through UI for a structured workflow and clarity at every step.",
        overview: [
            "ProjectPulse organizes complex project activity into a clear, scannable system so teams can see status and next actions without digging through tools.",
            "I owned UX/UI: mapping core flows, refining the interface hierarchy, and tightening patterns so the product feels consistent from onboarding to delivery.",
        ],
        tags: ["Product Design", "UX", "UI"],
    },
    {
        slug: "scaffold",
        title: "Scaffold",
        year: "Sept 2025 — Dec 2025",
        role: "UX/UI Designer, UX Researcher",
        summary:
            "AI-assisted, all-in-one financial resource platform that consolidates grant information for tradespeople.",
        overview: [
            "Tradespeople lose income and time hunting through fragmented government and private grant programs. Scaffold consolidates the landscape into one searchable, AI-assisted workspace.",
            "I led research, IA, and the end-to-end interface — from eligibility quiz to application tracker — making complex financial language feel approachable.",
        ],
        tags: ["Research", "IA", "Product Design", "AI UX"],
    },
    {
        slug: "montro",
        title: "Montro",
        year: "Jan 2025 — May 2025",
        role: "UX/UI Designer, UX Researcher",
        summary:
            "Gamified expense-tracking app that builds spending & saving goals and reward milestones.",
        overview: [
            "Money apps are usually punishing. Montro reframes budgeting as a game with milestones, streaks, and small rewards that make consistent saving feel achievable.",
            "I designed the goal system, reward loop, and the daily logging flow with a focus on motivation without manipulation.",
        ],
        tags: ["Mobile", "Gamification", "Product Design"],
    },
    {
        slug: "visual-design",
        title: "Visual Design",
        year: "2025",
        role: "Graphic Designer",
        summary:
            "Selected visual work spanning layout, type, and colour — built for clarity and shelf presence.",
        overview: [
            "A mix of self-initiated and client-facing pieces focused on strong hierarchy, restraint, and memorable detail.",
            "Case studies for individual deliverables can be added as this section grows.",
        ],
        tags: ["Visual Design", "Brand", "Typography"],
    },
];

export const getProject = (slug: string) =>
    projects.find((p) => p.slug === slug);
