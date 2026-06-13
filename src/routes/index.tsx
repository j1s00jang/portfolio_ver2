import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
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
    const { location } = useRouterState();

    useEffect(() => {
        if (location.hash !== "work") return;

        const scrollToWork = () => {
            document
                .getElementById("work")
                ?.scrollIntoView({ block: "start" });
        };

        // Run after scroll restoration so #work wins when returning from a project.
        const id = window.setTimeout(scrollToWork, 50);
        return () => window.clearTimeout(id);
    }, [location.hash]);

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
