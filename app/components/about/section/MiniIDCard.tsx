"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MiniIDCardProps {
  name: string;
  role: string;
  stack: string[];
}

export default function MiniIDCard({ name, role, stack }: MiniIDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  const rotateX = useSpring(useTransform(localY, [-0.5, 0.5], [14, -14]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(localX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 200,
    damping: 22,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    localX.set((e.clientX - rect.left) / rect.width - 0.5);
    localY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    localX.set(0);
    localY.set(0);
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Rope */}
      <div className="flex flex-col items-center" style={{ height: 90 }}>
        <div
          className="w-3.5 h-3.5 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, #9ca3af, #4b5563)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
          }}
        />
        <svg
          width="50"
          height="78"
          viewBox="0 0 50 78"
          style={{ overflow: "visible", marginTop: -2 }}
        >
          <motion.path
            d="M 25 0 C 20 20, 30 42, 25 78"
            stroke="url(#rg2)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
          />
          {[14, 28, 44, 60, 74].map((y, i) => (
            <motion.ellipse
              key={i}
              cx="25"
              cy={y}
              rx="3.5"
              ry="1.2"
              stroke="#374151"
              strokeWidth="1"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.8 + i * 0.04 }}
            />
          ))}
          <defs>
            <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: 230,
          height: 320,
        }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.6 }}
      >
        <div
          className="absolute inset-0 rounded-[20px] overflow-hidden"
          style={{
            background:
              "linear-gradient(150deg, rgba(30,40,58,0.9) 0%, rgba(13,20,32,0.95) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
          }}
        >
          {/* Top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(31,41,55,0.85), rgba(17,24,39,0.75))",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
          />

          {/* Metal clip */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[44%] z-20">
            <div
              className="w-7 h-4 rounded"
              style={{
                background: "linear-gradient(180deg, #b0b8c8, #6b7280)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            />
          </div>

          <div className="relative h-full flex flex-col items-center pt-7 px-5 pb-5">
            {/* Avatar */}
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-dark-50 mb-2.5"
              style={{
                background: "linear-gradient(135deg, #2d3748, #1a2235)",
                border: "1.5px solid rgba(255,255,255,0.09)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 14,
                delay: 1,
              }}
            >
              {name.charAt(0)}
            </motion.div>

            <p className="text-[15px] font-bold text-dark-50 tracking-tight">
              {name}
            </p>
            <p className="text-[10px] text-dark-100/70 mt-0.5 mb-3 tracking-wide">
              {role}
            </p>

            <div className="w-full h-px bg-white/[0.05] mb-3" />

            <div className="flex flex-wrap justify-center gap-1.5 mb-3">
              {stack.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="px-2 py-0.5 rounded-full text-[9px] font-medium text-dark-100/80 border border-white/[0.06]"
                  style={{ background: "rgba(31,41,55,0.5)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.07 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="mt-auto w-full">
              <div className="w-full h-px bg-white/[0.04] mb-3" />

              {/* Social Icons */}
              <div className="flex justify-center gap-3 mb-3">
                {/* GitHub */}
                <a
                  href="https://github.com/inggarnp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.25] hover:bg-white/[0.08] transition-all duration-200"
                  title="GitHub"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5 text-dark-100/60 group-hover:text-dark-50 transition-colors duration-200"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/inggarnp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.25] hover:bg-white/[0.08] transition-all duration-200"
                  title="LinkedIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5 text-dark-100/60 group-hover:text-dark-50 transition-colors duration-200"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>

              <p className="text-center text-[8px] tracking-[0.2em] text-dark-100/20 uppercase">
                Portfolio 2026
              </p>
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div
          className="absolute -bottom-4 left-4 right-4 h-4 rounded-full pointer-events-none"
          style={{ background: "rgba(0,0,0,0.4)", filter: "blur(10px)" }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="text-[10px] text-dark-100/25 tracking-[0.18em] mt-4"
      >
        hover me ↕
      </motion.p>
    </div>
  );
}