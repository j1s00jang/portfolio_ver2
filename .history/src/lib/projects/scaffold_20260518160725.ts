import type { Project } from "./types";

export const scaffold: Project = {
    slug: "scaffold",
    title: "Scaffold",
    year: "Sept 2025 — Dec 2025",
    role: "UX/UI Designer, UX Researcher",
    summary:
        "AI-assisted, all-in-one financial resource platform that consolidates grant information for tradespeople.",
    overview: [
        "**Scaffold is an AI-assisted, all-in-one financial resource platform** that helps skilled tradespeople find eligible grants to advance their careers without financial struggles. Funding information is scattered, outdated, and time-consuming to evaluate.",
        "**Scaffold filters all eligible grants to apply easily and quickly** based on the user’s profile created in the early stage. With a web supplement, users complete an essay with the help of assistant AI.",
    ],
    caseStudySections: {
        opportunities: [
            "A key challenge was reducing friction in the application process while keeping content clear and easy to navigate on a small screen. The key focus was to make grant information simpler to find, easier to understand, and faster to act on, so fewer deadlines and funding options will be missed.",
            "**High-level goals were to:**",
            "1. Show eligible resources in one place to reduce website-hopping.",
            "2. Make information easy to scan on mobile so as not to miss the deadline.",
            "3. Reduce repetitive typing to lower frustration and speed up applications.",
        ],
        "user-research": [
            "We conducted user research to understand the needs of tradespeople. We interviewed 10 tradespeople to understand their needs and pain points.",
            "We also conducted a competitive analysis to understand the market and the competition.",
        ],
        findings: [
            "We found that tradespeople are often overwhelmed by the amount of information they need to find and apply for grants.",
            "We also found that tradespeople are often frustrated by the process of finding and applying for grants.",
        ],
    },
    tags: ["UX/UI Design", "Research", "IA", "Product Design", "AI UX"],
};
