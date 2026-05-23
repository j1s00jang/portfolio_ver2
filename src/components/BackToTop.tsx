import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-center justify-center gap-0.5 h-12 w-12 rounded-full bg-foreground text-background shadow-lg transition-all duration-500 ease-out hover:scale-110 hover:bg-accent ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-3.5 w-3.5" strokeWidth={2} />
      <span className="font-mono text-[9px] tracking-[0.12em]">TOP</span>
    </button>
  );
}
