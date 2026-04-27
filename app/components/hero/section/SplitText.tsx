import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
}: SplitTextProps) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split(" ").map((word, wi) => (
        <span
          key={wi}
          className="inline-block overflow-hidden pb-2 mr-[0.25em]"
          style={{ marginBottom: "-0.5rem" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.75,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + wi * 0.1,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}