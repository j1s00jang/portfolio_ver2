import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplitFlapDigitProps {
  value: string;
  reducedMotion?: boolean;
}

export function SplitFlapDigit({ value, reducedMotion = false }: SplitFlapDigitProps) {
  const [displayed, setDisplayed] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (value === displayed) return;
    if (reducedMotion) {
      setDisplayed(value);
      return;
    }
    setPrevious(displayed);
    setFlipping(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setDisplayed(value);
      setFlipping(false);
    }, 120);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [value, displayed, reducedMotion]);

  return (
    <span
      className="relative inline-block align-middle overflow-visible tabular-nums [transform-style:preserve-3d]"
      style={{ width: "0.72em", height: "1.2em", perspective: "200px" }}
      aria-hidden="true"
    >
      {/* Static bottom half — shows current displayed value */}
      <span
        className="absolute inset-x-0 top-1/2 overflow-hidden"
        style={{ height: "50%" }}
      >
        <span className="absolute inset-x-0 -top-full flex items-center justify-center" style={{ height: "200%" }}>
          {displayed}
        </span>
      </span>
      {/* Static top half — shows current displayed value */}
      <span
        className="absolute inset-x-0 top-0 overflow-hidden"
        style={{ height: "50%" }}
      >
        <span className="absolute inset-x-0 top-0 flex items-center justify-center" style={{ height: "200%" }}>
          {displayed}
        </span>
      </span>

      <AnimatePresence>
        {flipping && (
          <>
            {/* Top half of previous value falls down */}
            <motion.span
              key={`top-${previous}-out`}
              className="absolute inset-x-0 top-0 z-20 overflow-hidden"
              style={{ height: "50%", transformOrigin: "bottom", backfaceVisibility: "hidden" }}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: -90 }}
              transition={{ duration: 0.12, ease: [0.4, 0, 1, 1] }}
            >
              <span className="absolute inset-x-0 top-0 flex items-center justify-center" style={{ height: "200%" }}>
                {previous}
              </span>
            </motion.span>
            {/* Bottom half of new value flaps down from middle */}
            <motion.span
              key={`bot-${value}-in`}
              className="absolute inset-x-0 top-1/2 z-20 overflow-hidden"
              style={{ height: "50%", transformOrigin: "top", backfaceVisibility: "hidden" }}
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
              transition={{ duration: 0.12, delay: 0.12, ease: [0, 0, 0.2, 1] }}
            >
              <span className="absolute inset-x-0 -top-full flex items-center justify-center" style={{ height: "200%" }}>
                {value}
              </span>
            </motion.span>
          </>
        )}
      </AnimatePresence>

      {/* Screen-reader value */}
      <span className="sr-only">{value}</span>
    </span>
  );
}
