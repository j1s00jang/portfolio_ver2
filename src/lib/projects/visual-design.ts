import type { Project } from "./types";

export const visualDesign: Project = {
    slug: "visual-design",
    title: "Visual Design",
    year: "2025",
    role: "Branding, Interaction, Editorial Design",
    summary:
        "Selected visual work spanning branding, layout, typography, and information hierarchy — created not only for visual impact, but for clarity.",
    introVisuals: [
        {
            src: "/VisualDesign/01_fizzypop_visual01.png",
            alt: "Fizzypop branding and packaging design — overview visual 1",
        },
        {
            src: "/VisualDesign/02_fizzypop_visual02.png",
            alt: "Fizzypop branding and packaging design — overview visual 2",
        },
        {
            src: "/VisualDesign/03_firstCat_visual01.png",
            alt: "Hello, My First Cat! interaction design — overview visual",
        },
        {
            src: "/VisualDesign/04_brochure_visual01.png",
            alt: "Christmas Travel Brochure editorial design — overview visual",
        },
    ],
    caseStudySections: {
        "fizzypop-overview": [
            "**Branding / Packaging / Label design / Illustration**",
            { vspace: true },
            "Fizzypop is **an all-natural, real-fruit infused sparkling water** available in three refreshing flavours. Made with **zero sugar** and **no artificial sweeteners**, it delivers a clean, light taste that's easy to enjoy anytime. Whether you're relaxing at the beach, spending time with friends, or simply taking a break from your day.** Fizzypop brings a refreshing burst of flavour wherever life takes you.**",
        ],
        "fizzypop-process": [
            "Fizzypop started with the idea of creating a fruit-flavoured sparkling water brand that feels refreshing, light, and guilt-free. The visual direction was inspired by nature, using soft but lively colours to communicate freshness.",
            "The brand targets health-conscious young adults who looks for a healthier alternative to soda, while still enjoying a fun and flavourful drink. ",
            { vspace: true },
            {
                image: {
                    src: "/VisualDesign/05_fizzypop_logo.png",
                    alt: "Fizzypop wordmark and logo",
                    lightbox: true,
                    fit: "contain",
                    frame: "intrinsic",
                    displayScale: 0.8,
                },
            },
            {
                ul: [
                    "**Typography:** The 'fizzypop' wordmark uses bold, rounded letterforms to reflect youthful nature of the brand. The 'Eight One' font was used for the body text, it's softly curved and reflects the simplicity of the brand.",
                ],
            },
            { vspace: true },
            {
                image: {
                    src: "/VisualDesign/06_fizzypop_typography.webp",
                    alt: "Fizzypop typography — wordmark and body type specimens",
                    lightbox: true,
                    fit: "contain",
                    frame: "hug",
                },
            },
            {
                ul: [
                    "**Colour:** The colour palette was inspired by the nature and the fruit, with each flavour background represented through a distinct colour story: **clear water for vine tomato, a summer's day for blood orange, and a tropical sunset sky for concord grape.** Together, the colours create a playful product family while keeping the overall look clean and approachable.",
                ],
            },
            { vspace: true },
            {
                imageTriple: [
                    {
                        src: "/VisualDesign/07_fizzypop_tomato_drawing.png",
                        alt: "Fizzypop vine tomato flavour — fruit illustration",
                        lightbox: true,
                        fit: "contain",
                    },
                    {
                        src: "/VisualDesign/08_fizzypop_orange_drawing.png",
                        alt: "Fizzypop blood orange flavour — fruit illustration",
                        lightbox: true,
                        fit: "contain",
                    },
                    {
                        src: "/VisualDesign/09_fizzypop_grape_drawing.png",
                        alt: "Fizzypop concord grape flavour — fruit illustration",
                        lightbox: true,
                        fit: "contain",
                    },
                ],
            },
            {
                ul: [
                    "**Illustrations:** The custom fruit illustrations created to emphasize the use of real ingredients while giving the brand aesthetic and memorable visual identity. The label system also includes required packaging information such as ingredients, nutrition facts, barcode, and fluid volume, arranged to maintain both visual balance and practical readability.",
                ],
            },
        ],
        "fizzypop-final-outcome": [
            {
                flavorCarousel: {
                    slides: [
                        {
                            flavor: "Tomato",
                            label: {
                                src: "/VisualDesign/10_fizzypop_tomato_label.jpg",
                                alt: "Fizzypop vine tomato flavour label",
                            },
                            productMockup: {
                                src: "/VisualDesign/13_fizzypop_tomato_mockup.png",
                                alt: "Fizzypop vine tomato can mockup",
                            },
                        },
                        {
                            flavor: "Blood Orange",
                            label: {
                                src: "/VisualDesign/11_fizzypop_orange_label.jpg",
                                alt: "Fizzypop blood orange flavour label",
                            },
                            productMockup: {
                                src: "/VisualDesign/14_fizzypop_orange_mockup.png",
                                alt: "Fizzypop blood orange can mockup",
                            },
                        },
                        {
                            flavor: "Concord Grape",
                            label: {
                                src: "/VisualDesign/12_fizzypop_grape_label.jpg",
                                alt: "Fizzypop concord grape flavour label",
                            },
                            productMockup: {
                                src: "/VisualDesign/15_fizzypop_grape_mockup.png",
                                alt: "Fizzypop concord grape can mockup",
                            },
                        },
                    ],
                },
            },
        ],
        "first-cat-overview": [
            "**Interaction design / Illustration / Educational Design / Scenario-based Learning**",
            { vspace: true },
            "**Hello, My First Cat!** is a playful, scenario-based learning tutorial designed to help first-time cat owners better understand their new furry friend. Every scenario is inspired by real experiences and situations that often confuse new cat parents. With the fun interactive elements and decision-making moments, users learn and understand the cat’s body language through explanations of what the behaviour actually means.",
        ],
        "first-cat-process": [
            "**Learning through playing a tutorial:** This project was designed for new cat owners to make learning about basic cat behaviour in a fun, playful and enjoyable tutorial. A game-like user experience was created to encourage curiosity and reduce the confusion often felt by first-time cat owners.",
            { vspace: true },
            {
                imageQuad: [
                    {
                        src: "/VisualDesign/16_hellocat_bg01.png",
                        alt: "Hello, My First Cat! tutorial — background scene 1",
                        lightbox: true,
                    },
                    {
                        src: "/VisualDesign/17_hellocat_bg02.png",
                        alt: "Hello, My First Cat! tutorial — background scene 2",
                        lightbox: true,
                    },
                    {
                        src: "/VisualDesign/18_hellocat_bg03.png",
                        alt: "Hello, My First Cat! tutorial — background scene 3",
                        lightbox: true,
                    },
                    {
                        src: "/VisualDesign/19_hellocat_bg04.png",
                        alt: "Hello, My First Cat! tutorial — background scene 4",
                        lightbox: true,
                    },
                ],
            },
            { vspace: true },
            {
                ul: [
                    "**Visual Directions:** The visual language uses friendly and cute illustrations, soft colours, and interactive scenarios to create an emotionally engaging experience. By placing users in realistic situations and asking them to make choices, the tutorial encourages active participation and helps users better remember and understand feline body language.",
                ],
            },
            {
                imageRow4: [
                    {
                        src: "/VisualDesign/20_hellocat_cat01.png",
                        alt: "Hello, My First Cat! — cat character 1",
                        lightbox: true,
                        fit: "contain",
                    },
                    {
                        src: "/VisualDesign/21_hellocat_cat02.png",
                        alt: "Hello, My First Cat! — cat character 2",
                        lightbox: true,
                        fit: "contain",
                    },
                    {
                        src: "/VisualDesign/22_hellocat_cat03.png",
                        alt: "Hello, My First Cat! — cat character 3",
                        lightbox: true,
                        fit: "contain",
                    },
                    {
                        src: "/VisualDesign/23_hellocat_cat04.png",
                        alt: "Hello, My First Cat! — cat character 4",
                        lightbox: true,
                        fit: "contain",
                    },
                ],
            },
            {
                ul: [
                    "The cat characters were created by observing cats’ behaviours in real life and the fur colour chosen by real cats as well. All background objects were illustrated from real cat products, while the plants reflect research on cat-friendly, cat-safe species. To keep the content clear and easy to read, a high readability typeface was used in the explanation.",
                ],
            },
            { vspace: true },
            {
                imageTriple: [
                    {
                        src: "/VisualDesign/24_hellocat_button01.png",
                        alt: "Hello, My First Cat! — interactive button state 1",
                        lightbox: true,
                        fit: "contain",
                    },
                    {
                        src: "/VisualDesign/25_hellocat_button02.png",
                        alt: "Hello, My First Cat! — interactive button state 2",
                        lightbox: true,
                        fit: "contain",
                    },
                    {
                        src: "/VisualDesign/26_hellocat_button03.png",
                        alt: "Hello, My First Cat! — interactive button state 3",
                        lightbox: true,
                        fit: "contain",
                    },
                ],
            },
            {
                ul: [
                    "**Interaction Design:** Instead of static pages, interactive hover states were applied to every clickable button, including the cat’s illustrations in each scenario. Every choice button provides an immediate visual explanation to encourage active learning rather than passive reading. The user can go back to the previous scenario and choose a different choice to read and learn each choice’s explanation. Created a ‘go back to main page’ button and placed every page to make the user feel escaped or start from the beginning. ",
                ],
            },
            { vspace: true },
            {
                ul: [
                    "**Information Design:** Behaviour explanations were intentionally kept concise and paired with illustrations to help users quickly connect body language cues with their meanings. All explanations were researched from a trusted vet website or reliable online resources. The contents were written in easy wording to be understood easily.",
                ],
            },
        ],
        "first-cat-final-outcome": [
            {
                figma: {
                    url: "https://www.figma.com/proto/eMqTulTEWvaUaudlk26b3F/Design3-CP05-Hello--My-First-Cat-?node-id=98-104",
                    title: "Hello, My First Cat! interactive prototype",
                    aspectRatio: "812 / 500",
                    scaling: "scale-down-width",
                    contentScaling: "fixed",
                    deviceFrame: false,
                    footer: false,
                    hotspotHints: false,
                },
            },
        ],
        "travel-brochure-overview": [
            "**Editorial design / Information hierarchy / Layout design**",
            { vspace: true },
            "**Christmas Travel Brochure** is a travel brochure designed to help travelers plan their Christmas travel. The brochure is designed to be a fun and engaging way for travelers to plan their Christmas travel.",
        ],
        "travel-brochure-process": [
            "**Travel brochure design:** This project was designed for travelers to make planning their Christmas travel in a fun, playful and enjoyable way. A game-like user experience was created to encourage curiosity and reduce the confusion often felt by travelers.",
        ],
        "travel-brochure-final-outcome": ["Coming soon..."],
    },
    tags: ["Visual Design", "Brand", "Typography"],
};
