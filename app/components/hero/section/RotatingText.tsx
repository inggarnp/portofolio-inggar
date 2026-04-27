"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
}

export default function RotatingText({ texts }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % texts.length), 2200);
    return () => clearInterval(t);
  }, [texts.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="inline-block"
      >
        {texts[index]}
      </motion.span>
    </AnimatePresence>
  );
}