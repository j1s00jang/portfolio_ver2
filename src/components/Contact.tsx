import { motion } from "framer-motion";
import { FileText, Linkedin, Mail, Instagram } from "lucide-react";

const email = "jisoo.design@icloud.com";

const links = [
    { label: "Email", href: `mailto:${email}`, icon: Mail, external: false },
    { label: "Resume", href: "/Jisoo_Jang_Resume.pdf", icon: FileText, external: true },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/jisoojang",
        icon: Linkedin,
        external: true,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/jisoojang.design",
        icon: Instagram,
        external: true,
    },
];

export function Contact() {
    return (
        <section
            id="contact"
            className="px-6 md:px-10 py-24 md:py-40 scroll-mt-20 border-t border-border/70"
        >
            <div className="mx-auto max-w-[1440px]">
                <div className="mb-14 flex items-baseline justify-between">
                    <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Contact
                    </h2>
                    <span className="text-xs text-muted-foreground">
                        I'd love to hear from you!
                    </span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="font-display text-2xl md:text-4xl font-medium tracking-tight text-foreground/60 mb-4">
                        Reach out to me!
                    </p>
                    <a
                        href={`mailto:${email}`}
                        className="group inline-block font-display text-[clamp(2.25rem,8vw,7rem)] font-semibold leading-none tracking-tight"
                    >
                        <span className="bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-[length:0%_2px] bg-no-repeat bg-[position:0_100%] transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px] group-hover:text-accent">
                            {email}
                        </span>
                    </a>
                </motion.div>

                <div className="mt-20 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                    {links.map((l, i) => {
                        const Icon = l.icon;
                        return (
                            <motion.a
                                key={l.label}
                                href={l.href}
                                target={l.external ? "_blank" : undefined}
                                rel={
                                    l.external
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                                className="group flex aspect-[5/4] flex-col justify-between rounded-md border border-border p-5 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                            >
                                <Icon
                                    className="h-5 w-5"
                                    strokeWidth={1.5}
                                />
                                <div className="flex items-end justify-between">
                                    <span className="font-display text-xl md:text-2xl font-medium tracking-tight">
                                        {l.label}
                                    </span>
                                    <span className="text-xs opacity-60 group-hover:opacity-100">
                                        ↗
                                    </span>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

                <footer className="mt-24 flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-t border-border/70 pt-8 text-xs text-muted-foreground">
                    <span>© {new Date().getFullYear()} Jisoo Jang.</span>
                    <span>Designed & built with care.</span>
                </footer>
            </div>
        </section>
    );
}
