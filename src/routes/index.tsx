import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WorkList } from "@/components/WorkList";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jisoo Jang — Product Designer" },
      {
        name: "description",
        content:
          "Portfolio of Jisoo Jang, a product designer crafting calm, considered interfaces.",
      },
      { property: "og:title", content: "Jisoo Jang — Product Designer" },
      {
        property: "og:description",
        content: "Selected work in product, UX, and graphic design.",
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
