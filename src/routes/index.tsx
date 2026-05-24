import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WorkList } from "@/components/WorkList";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "Jisoo Jang" },
            {
                name: "description",
                content: "Jisoo Jang's portfolio.",
            },
            { property: "og:title", content: "Jisoo Jang — Product Designer" },
            {
                property: "og:description",
                content: "Product Design, UX/UI Design, Graphic Design.",
            },
        ],
    }),
    component: Index,
});

function Index() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Nav />
            <Hero />
            <WorkList />
            <About />
            <Contact />
        </main>
    );
}
