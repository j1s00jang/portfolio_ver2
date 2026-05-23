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
            "**75%** → 'I don't know where to find information about grant.'",
            "**55.6%** → 'I don't know what's available.'",
            "**28%** → 'Changed my career path because of financial struggles.'",
            "The results showed that missed deadlines are not only about eligibility, but also about the difficulty of finding and applying for grants. Eventually, that could lead to giving up their careers.",
            "The research insights were synthesized into a user persona to guide the design process. This persona represents a skilled tradesperson who faces challenges in finding and applying for grants due to scattered information and time constraints.",
        ],
        findings: [
            "Four insights shaped a clear expectation: financial resources should be easy to find, simple to understand, and quick to act on.",
            "**Key Findings:**",
            "**1. Minimal friction:** Reduce steps and repeated input where possible.",
            "**2. Clear guidance:** Show key information and requirements clearly and easy to follow.",
            "**3. Mobile-first clarity:** Help users scan key details quickly on a small screen.",
            "**4. Writing essays support:** Support writing essays draftwith AI help.",
            "Day-to-day routines and real-world constraints were considered early, including work schedules and on-the-go use. Key scenarios were mapped into simple journeys, then translated into a set of context rules to guide feature decisions and layout priorities—keeping the core flow focused on eligibility, clear steps, and deadline visibility.",
        ],
        "brand-guidelines": [
            "Scaffold logo created from the letter “S” and stacked block shapes to represent a strong foundation. Ultimately, Scaffold’s goal is to help tradespeople find financial support to continue their career path.",
            "**Purple:** Creates a calm, confident anchor that supports focus and brand recognition.",
            "**Orange:** Communicate a strong connection and support for the user.",
            "Typography follows the same principle: one typeface supports a strong hierarchy for titles and labels, while a highly legible typeface is used for longer content to reduce reading fatigue on small screens.",
        ],
        "lo-fis-hi-fis": ["**Lo-Fis:**", "**Hi-Fis:**"],
        "key-features": [
            "Grant information needed to be easy to read at a glance without missing critical details. Scaffold focused on three core features that reduce friction and help users act on opportunities faster.",
            "**Scan-friendly grant cards:** A card-based layout highlights the grant name, deadline, and eligibility at a glance. Each card also includes the organization’s logo to support quick recognition. This structure helps users quickly identify eligible grants in British Columbia, Canada, while staying flexible enough to scale across different needs and contexts.",
            "**Voice input for profile setup:** Users can build a profile with voice input on the go. The AI captures key details even with unclear speech. The profile can be reused across applications and helps filter eligible grants on the dashboard.",
            "**AI-assisted writing essays and web supplement:** Since writing essays on a phone is inconvenient, a web supplement supports drafting on a larger screen. It also offers AI help to generate a first draft using the saved profile details for faster, more consistent submissions.",
        ],
        "print-design": [
            "The brochure layout was designed to grab attention with Scaffold’s bold logo and a concise slogan. A subtle grid pattern in the background references scaffolding and reinforces the visual identity.",
            "The business card uses the same colour palette to maintain brand consistency. Soft curved edges create a distinctive, approachable look, helping the card stand out while staying aligned with the overall brand.",
            "This work highlighted the real-world differences between **RGB** and **CMYK**. Multiple rounds of print testing helped refine the colour palette and improve consistency from screen to print.",
            "It also reinforced the value of strong grid systems in print design—supporting clearer hierarchy, alignment, and spacing across both the brochure and business card layouts.",
        ],
        "product-storytelling": [
            "Scaffold’s promotional video was created to showcase strong product storytelling from insight to narrative. The concept was built from a research-backed moment: **a skilled tradeswoman was able to keep her career path without giving up because of financial struggles.**",
            "A complete storyboard and script were developed independently to translate that insight into a clear, emotionally grounded story angle. The final video premiered on pitch day in front of 300 attendees to introduce the app concept and reinforce Scaffold’s core message: Resources exist, Roadblocks don’t have to.",
        ],
    },
    tags: ["UX/UI Design", "Research", "IA", "Product Design", "AI UX"],
};
