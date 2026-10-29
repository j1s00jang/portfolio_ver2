import { motion } from "framer-motion";
import { useState } from "react";
import { CursorFollowImage } from "./CursorFollowImage";

const JISOO_PHOTO_SRC = "/about/jisoo.png";
const TOAST_PHOTO_SRC = "/about/toast.png";
const COFFEE_PHOTO_SRC = "/about/coffee.png";
const AUTUMN_PHOTO_SRC = "/about/autumn.png";
const DESSERT_PHOTO_SRC = "/about/dessert.png";

const skills = [
    "User experience design",
    "User interface design",
    "Product design",
    "Prototyping",
    "Wireframing",
    "Information architecture",
    "Design systems",
    "Responsive design",
    "Workflow optimization",
    "Usability testing",
    "User research",
    "Accessibility (WCAG)",
    "Typography",
    "HTML/CSS",
    "JavaScript",
    "React.js",
    "Google analytics",
    "SEO",
    "Contents strategy",
];

const tools = [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe InDesign",
    "Adobe After Effects",
    "Figma",
    "Framer",
    "Lovable",
    "Stitch",
    "Blender (3D)",
    "Visual Studio Code",
    "Jira",
    "Trello",
    "Notion",
];

const soft = [
    "Cross-functional collaborator",
    "Adaptability",
    "Flexibility",
    "Teamwork",
    "Efficient time management",
    "Clear communicator",
    "Conflict resolution",
    "Detail-oriented mindset",
    "Strong prioritization skills",
    "Fluent in English and Korean",
    "Conversational in Japanese",
];

function Group({ title, items }: { title: string; items: string[] }) {
    return (
        <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
                {title}
            </h3>
            <ul className="flex flex-wrap gap-2">
                {items.map((s) => (
                    <li
                        key={s}
                        className="rounded-full border border-border bg-transparent px-3 py-1.5 text-sm text-foreground/80 transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                    >
                        {s}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function PhotoHoverPhrase({
    children,
    src,
    alt,
}: {
    children: string;
    src: string;
    alt: string;
}) {
    const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

    return (
        <>
            <span
                className="relative cursor-default underline decoration-accent/40 decoration-2 underline-offset-[0.18em] transition-colors hover:text-accent hover:decoration-accent"
                onMouseEnter={(e) => setTip({ x: e.clientX, y: e.clientY })}
                onMouseMove={(e) => setTip({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setTip(null)}
            >
                {children}
            </span>
            {tip ? (
                <CursorFollowImage
                    x={tip.x}
                    y={tip.y}
                    src={src}
                    alt={alt}
                />
            ) : null}
        </>
    );
}

export function About() {
    return (
        <section
            id="about"
            className="px-6 md:px-10 py-24 md:py-40 scroll-mt-20 border-t border-border/70"
        >
            <div className="mx-auto max-w-[1440px]">
                <div className="mb-14 flex items-baseline justify-between">
                    <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        About
                    </h2>
                    <span className="text-xs text-muted-foreground">
                        What I can do in a nutshell
                    </span>
                </div>

                <div className="grid gap-16 md:grid-cols-12">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                        className="md:col-span-7"
                    >
                        <p className="font-display text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight">
                            Hi, I'm{" "}
                            <PhotoHoverPhrase
                                src={JISOO_PHOTO_SRC}
                                alt="Jisoo"
                            >
                                Jisoo
                            </PhotoHoverPhrase>
                            ! A mom of{" "}
                            <PhotoHoverPhrase
                                src={TOAST_PHOTO_SRC}
                                alt="I'm Toast. I'm the world's cutest cat."
                            >
                                the world's cutest cat
                            </PhotoHoverPhrase>
                            ,{" "}
                            <PhotoHoverPhrase
                                src={COFFEE_PHOTO_SRC}
                                alt="Coffee"
                            >
                                coffee drinker
                            </PhotoHoverPhrase>
                            ,{" "}
                            <PhotoHoverPhrase
                                src={AUTUMN_PHOTO_SRC}
                                alt="Fall season"
                            >
                                fall season lover
                            </PhotoHoverPhrase>
                            , and occasionally{" "}
                            <PhotoHoverPhrase
                                src={DESSERT_PHOTO_SRC}
                                alt="Dessert"
                            >
                                a dessert maker
                            </PhotoHoverPhrase>
                            . 🐾☕️🍮
                            <br />
                            <br />
                            As a designer, I love to design products with{" "}
                            <span className="italic text-accent">reason</span>.
                            I believe good design is effortless. It works
                            naturally, gets out of the way, and lets people get
                            on with their lives.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="md:col-span-5 md:pt-4 space-y-10"
                    >
                        <Group
                            title="Skills"
                            items={skills}
                        />
                        <Group
                            title="Tools"
                            items={tools}
                        />
                        <Group
                            title="Soft skills"
                            items={soft}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
