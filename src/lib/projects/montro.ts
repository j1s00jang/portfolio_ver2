import type { Project } from "./types";

export const montro: Project = {
    slug: "montro",
    title: "Montro",
    year: "Jan 2025 — May 2025",
    role: "Product Design, UX/UI Design, User Research",
    summary:
        "Gamified expense-tracking app that builds spending & saving goals and reward milestones.",
    introVisuals: [
        {
            src: "/Montro/01_visual01.png",
            alt: "Montro project overview visual 1",
        },
        {
            src: "/Montro/02_visual02.png",
            alt: "Montro project overview visual 2",
        },
        {
            src: "/Montro/03_visual03.png",
            alt: "Montro project overview visual 3",
        },
        {
            src: "/Montro/04_visual04.png",
            alt: "Montro project overview visual 4",
        },
    ],
    overview: [
        "**Montro is a gamified expense-tracking app** designed to help people build consistent spending habits. The final goal is **building long-term tracking expenses, healthy financial habits,** featuring clear goals, progress feedback, and rewards. To reduce logging fatigue, Montro turns daily logging into a quick, motivating routine, so users can stay aware of their spending without feeling overwhelmed.",
    ],
    caseStudySections: {
        opportunities: [
            "**Montro started with why young generations (Late 10s - Early 20s) struggle to build expense-tracking habits.** From the research, many participants aware of the importance of tracking, however, they described expense logging as tedious and easy to abandon; tracking expenses could be easily discouraged by manual typing and getting lost on track. This gap created an opportunity to redesign expense tracking as a low-effort routine supported by habit-building cues and rewards.",
        ],
        "user-research": [
            "Survey results from 10 participants pointed out that expense tracking often relies on familiar, long-standing routines such as writing down in a notebook or memo app rather than dedicated apps. The main barriers were **low sustained motivation, bothersome from opening an app for every purchase, and the friction that manual entry is tedious.** Some free expense tracking apps in the market were described as discouraging due to distracting ads, cluttered, overly complex layouts, and no motivation.",
            {
                image: {
                    src: "/Montro/05_research.png",
                    alt: "Survey and user research summary for Montro expense-tracking study",
                    objectPosition: "top",
                    lightbox: true,
                },
            },
            "**Montro's approach to tackle this struggle:**",
            "**1. Easy to log expenses:** Make it quick and easy to log expenses without having to open an app for every purchase.",
            "**2. Guidance for saving goals and spending limits:** Set specific saving goals and spending limits to help users stay on track with financial guidance.",
            "**3. Motivational streaks & rewards:** Create a sense of achievement by offering rewards for logging expenses and meeting goals.",
        ],
        findings: [
            "The insights showed that the young generation understands that expense tracking is important, but staying consistent is hard because there is no motivation. And, **Logging habits take time to build.** To help users form a long-term habit, logging must be quick and easy, and the app should motivate them with progress updates and small rewards.",
            "Two user personas were created to ensure Montro’s design strategy.",
            {
                image: {
                    src: "/Montro/06_personas.png",
                    alt: "Montro user personas guiding product and UX decisions",
                    objectPosition: "top",
                    lightbox: true,
                },
            },
            "Montro’s information architecture was built around the main user journeys and the key features needed for simple daily tracking.",
            {
                figma: {
                    url: "https://www.figma.com/board/xwDzoST1o0eezu4KX5mNIn/User-Flow?node-id=0-1",
                    title: "Montro information architecture and user flow",
                    tabs: [
                        {
                            label: "Information Architecture",
                            url: "https://www.figma.com/board/xwDzoST1o0eezu4KX5mNIn/User-Flow?node-id=0-1",
                        },
                        {
                            label: "Features",
                            url: "https://www.figma.com/board/xwDzoST1o0eezu4KX5mNIn/User-Flow?node-id=1-143",
                        },
                        {
                            label: "User Flow",
                            url: "https://www.figma.com/board/xwDzoST1o0eezu4KX5mNIn/User-Flow?node-id=1-144",
                        },
                    ],
                },
            },
        ],
        "brand-guidelines": [
            "The visual concept is a playful, fun, gamified experience with a bright neon green and dark purple palette to create positive vibes. The low-fidelity wireframes were created to quickly explore layout, features and flow. Then, high-fidelity mockups were created to refine the visual style and interactions. The design system was built around a clear hierarchy, strong contrast, and simplified layouts to make financial information easy to read without overwhelming users.",
            {
                image: {
                    src: "/Montro/07_brand_guidelines.png",
                    alt: "Montro brand guidelines — logo sketch and style guide",
                    objectPosition: "top",
                    lightbox: true,
                },
            },
        ],
        "lo-fis-hi-fis": [
            "**Lo-Fis:**",
            {
                image: {
                    src: "/Montro/08_lofis.png",
                    alt: "Montro mobile lo-fidelity wireframes",
                    lightbox: true,
                },
            },
            "**Hi-Fis:**",
            {
                image: {
                    src: "/Montro/09_hifis.png",
                    alt: "Montro mobile hi-fidelity screens",
                    lightbox: true,
                },
            },
        ],
        "key-features": [
            "**1. Fast expense logging:** Small purchases often didn’t feel worth the effort to log. A quick logging and receipt-scan feature lets users capture an expense with a photo upload, while manual entry is available when there’s no receipt.",
            {
                video: {
                    src: "/Montro/10_feature01.mp4",
                    title: "Quick expense logging — feature demo",
                },
            },
            "**2. Guided budget setup:** Budgeting starts with simple, age-based suggestions informed by financial research, with full customization to match personal goals and saving preferences.",
            {
                video: {
                    src: "/Montro/11_feature02.mp4",
                    title: "Saving goals and reward milestones — feature demo",
                },
            },
            "**3. Rewards for motivation:** To support habit-building and motivate users to keep logging, completing a goal triggers a motivational moment. Users earn reward points for reaching goals and can redeem them for gift cards. ",
        ],
        "promotional-video": [
            {
                video: {
                    src: "/Montro/12_promo_vid.mp4",
                    title: "Montro promotional video",
                },
            },
        ],
        "learning-outcomes": [
            "From exploring references, building mood boards, pivoting visual direction and communicating with full-stack developers. This project taught me how a simple idea can be developed into an app. It was not just designing from scratch; it’s actually figuring out what they need, such as researching young users and understanding the frictions. The Montro project strengthened design-system thinking by defining information hierarchy and a consistent UI for data-heavy screens. Collaborating with 8 students, including full-stack development students, was a valuable experience to improve effective communication and cross-functional collaboration.",
            "Montro’s next steps are **connecting with all Canadian banks' apps in high-level information security to make logging in easier, more comfortable, and expanding the age range to mid-aged users as well.**",
        ],
    },
    tags: ["Mobile", "UX/UI Design", "UX Research", "Product Design"],
};
