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
            "**Branding / Packaging / Label Design / Illustration**",
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
            "**Interaction Design / Illustration / Educational Design / Scenario-based Learning**",
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
                    aspectRatio: "810 / 500",
                    scaling: "scale-down-width",
                    contentScaling: "fixed",
                    deviceFrame: false,
                    footer: false,
                    hotspotHints: false,
                },
            },
        ],
        "travel-brochure-overview": [
            "**Editorial Design / Information Hierarchy / Layout System / Visual Storytelling**",
            { vspace: true },
            "**Follow the light of Weihnachten** (*The German word for Christmas) is an editorial travel brochure project that curates a holiday travel experience through a magazine-inspired reading experience. The concept invites readers to explore the charm of European Christmas markets, following an itinerary from from Berlin, Germany, to Vienna, Austria.",
            "Inspired by the expeience of browsing Christmas Markets in the evening, theidea of **following the light** was created. Star-guided paths were incoporated into the map design to visualize the journey and chrsitmas lights were used every itinerary day throughout the brochure. Travel information was organized using a consistent layout system, carefully considering information hierarchy, typography and readability.",
            "Through visual storytelling, the brochure transforms conceptual travel package into a visually engaging experience, allowing readers to feel as through they are travelling the Christmas markets as they turn each page. ",
        ],
        "travel-brochure-process": [
            "The brochure was designed to capture the warmth and excitement of the holiday season while presenting travel information in a clear and visually engaging way. For the user's engaging and readability, the content was organized into digestible sections with a strong visual hierarchy.",
            "A magazine-inspired approach was used to balance imagery, typography, and white space, allowing readers to naturally scan information and enjoy the experience of exploring the brochure.",
            { vspace: true },
            {
                imageGrid2_211: [
                    {
                        src: "/VisualDesign/27_brochure_asset01.png",
                        alt: "Christmas Travel Brochure — design process asset 1",
                        lightbox: true,
                        fit: "cover",
                    },
                    {
                        src: "/VisualDesign/28_brochure_asset02.webp",
                        alt: "Christmas Travel Brochure — design process asset 2",
                        lightbox: true,
                        fit: "contain",
                    },
                    {
                        src: "/VisualDesign/29_brochure_asset03.png",
                        alt: "Christmas Travel Brochure — design process asset 3",
                        lightbox: true,
                        fit: "cover",
                    },
                    {
                        src: "/VisualDesign/30_brochure_asset04.jpg",
                        alt: "Christmas Travel Brochure — design process asset 4",
                        lightbox: true,
                        fit: "cover",
                    },
                    {
                        src: "/VisualDesign/31_brochure_asset05.png",
                        alt: "Christmas Travel Brochure — design process asset 5",
                        lightbox: true,
                        fit: "cover",
                    },
                ],
            },
            {
                ul: [
                    "**Layout System**: A modular grid system was used to create a consistent layout across pages. Each section was designed to be visually distinct while maintaining a cohesive visual language. The use of white space and modular elements allowed for easy navigation and readability.",
                    "**Information Hierarchy**: The travel information was organized using a consistent layout system, carefully considering information hierarchy, typography and readability.",
                    "**Visual Storytelling**: The brochure transforms conceptual travel package into a visually engaging experience, allowing readers to feel as through they are travelling the Christmas markets as they turn each page.",
                ],
            },
        ],
        "travel-brochure-final-outcome": [
            {
                flipbook: {
                    title: "Follow the light of Weihnachten — brochure",
                    pages: [
                        {
                            src: "/VisualDesign/flipbook/christmas_travel_brochure01.png",
                            alt: "Christmas Travel Brochure — page 1",
                        },
                        {
                            src: "/VisualDesign/flipbook/christmas_travel_brochure012.png",
                            alt: "Christmas Travel Brochure — page 2",
                        },
                        {
                            src: "/VisualDesign/flipbook/christmas_travel_brochure013.png",
                            alt: "Christmas Travel Brochure — page 3",
                        },
                        {
                            src: "/VisualDesign/flipbook/christmas_travel_brochure014.png",
                            alt: "Christmas Travel Brochure — page 4",
                        },
                        {
                            src: "/VisualDesign/flipbook/christmas_travel_brochure015.png",
                            alt: "Christmas Travel Brochure — page 5",
                        },
                        {
                            src: "/VisualDesign/flipbook/christmas_travel_brochure016.png",
                            alt: "Christmas Travel Brochure — page 6",
                        },
                        {
                            src: "/VisualDesign/flipbook/christmas_travel_brochure017.png",
                            alt: "Christmas Travel Brochure — page 7",
                        },
                        {
                            src: "/VisualDesign/flipbook/christmas_travel_brochure018.png",
                            alt: "Christmas Travel Brochure — page 8",
                        },
                        {
                            src: "/VisualDesign/flipbook/christmas_travel_brochure019.png",
                            alt: "Christmas Travel Brochure — page 9",
                        },
                        {
                            src: "/VisualDesign/flipbook/christmas_travel_brochure0110.png",
                            alt: "Christmas Travel Brochure — page 10",
                        },
                        {
                            src: "/VisualDesign/flipbook/christmas_travel_brochure0111.png",
                            alt: "Christmas Travel Brochure — page 11",
                        },
                        {
                            src: "/VisualDesign/flipbook/christmas_travel_brochure0112.png",
                            alt: "Christmas Travel Brochure — page 12",
                        },
                    ],
                },
            },
        ],
    },
    tags: ["Visual Design", "Brand", "Typography"],
};
