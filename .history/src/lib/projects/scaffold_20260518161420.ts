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
            "Early user research was conducted through visiting a construction site and reaching out to skilled tradespeople through referrals and personal networks. The findings helped clarify the project’s direction and supported what to focus on.",
            "**Missing Grant Deadlines, Giving up on Grants? Why?:**",
            "- 75% → 'I don't know where to find information about grant.'",
            "- 55.6% → 'I don't know what's available.'",
            "- 28% → 'Changed my career path because of financial struggles.'",
            "The results showed that missed deadlines are not only about eligibility, but also about the difficulty of finding and applying for grants. Eventually, that could lead to giving up their careers.",
        ],
        findings: [
            "We found that tradespeople are often overwhelmed by the amount of information they need to find and apply for grants. They are also often frustrated by the process of finding and applying for grants.",
        ],
    },
    tags: ["UX/UI Design", "Research", "IA", "Product Design", "AI UX"],
};
