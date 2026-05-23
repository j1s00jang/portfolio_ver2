import { motion } from "framer-motion";

const skills = [
  "Prototyping",
  "Wireframing",
  "Design & colour systems",
  "Responsive UI",
  "Interaction design",
  "Usability testing",
  "Accessibility (WCAG)",
  "Packaging design",
  "Typography",
];

const tools = [
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Adobe After Effects",
  "Lovable",
  "Stitch",
  "Base44",
];

const soft = [
  "Adaptability",
  "Time management",
  "Clear communicator",
  "Cross-functional collaborator",
  "Conflict resolution",
  "Detail-oriented",
  "Strong prioritization",
  "Bilingual (EN/KR)",
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
          <span className="text-xs text-muted-foreground">Jisoo Jang</span>
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
              I design products with{" "}
              <span className="italic text-accent">reason</span>. I believe good
              design is effortless — it works naturally, gets out of the way,
              and lets people get on with their lives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-5 md:pt-4 space-y-10"
          >
            <Group title="Skills" items={skills} />
            <Group title="Tools" items={tools} />
            <Group title="Soft skills" items={soft} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
