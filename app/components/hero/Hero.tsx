"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ShinyText from "./section/ShinyText";
import SplitText from "./section/SplitText";
import RotatingText from "./section/RotatingText";
import CVModal from "./section/CVModal";
import ElegantCard from "./section/ElegantCard";
import ParticleField from "./section/ParticleField";

const techStack = [
  { name: "Go", color: "#00ADD8" },
  { name: "Next.js", color: "#ffffff" },
  { name: "React", color: "#61DAFB" },
  { name: "Laravel", color: "#FF2D20" },
  { name: "GitHub", color: "#ffffff" },
  { name: "Tailwind", color: "#06B6D4" },
];

export default function Hero() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const handleExplore = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        @keyframes shiny-sweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      {cvModalOpen && <CVModal onClose={() => setCvModalOpen(false)} />}

      <section
        id="home"
        className="min-h-screen bg-dark-400 flex items-center justify-center relative overflow-hidden px-6 md:px-12 lg:px-20"
      >
        {/* Particle background */}
        <div className="absolute inset-0">
          <ParticleField />
        </div>

        {/* Ambient glow orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(156,163,175,0.05) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(229,231,235,0.03) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* 2-Column Layout */}
        <div className="relative z-10 w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-24">
          {/* LEFT: Text */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-dark-100/20 bg-dark-300/50 text-sm backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                <ShinyText text="Available for opportunities" />
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark-50 mb-4 leading-[1.2] tracking-tight">
              <SplitText text="Halo, saya" delay={0.3} />
              <br />
              <ShinyText>
                <SplitText text="Inggar Nugraha Putra" delay={0.55} />
              </ShinyText>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="text-xl md:text-2xl font-light text-dark-100 mb-6 h-8 flex items-center gap-2"
            >
              <span className="text-dark-50/40">—</span>
              <RotatingText texts={["Web Developer", "Junior Developer"]} />
              <span className="text-dark-50/40">—</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15 }}
              className="text-dark-100 text-base md:text-lg mb-10 leading-relaxed max-w-md"
            >
              Memiliki semangat belajar tinggi, mampu beradaptasi dengan teknologi
              baru, dan siap berkontribusi dalam tim untuk mengembangkan solusi
              digital yang efektif.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button onClick={handleExplore} className="btn-primary group">
                <span>Explore More</span>
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button onClick={() => setCvModalOpen(true)} className="btn-secondary">
                Download CV
              </button>
            </motion.div>
          </div>

          {/* RIGHT: Elegant Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="flex-shrink-0 w-[240px] md:w-[260px] lg:w-[290px] flex flex-col items-center"
          >
            <ElegantCard photoSrc="/assets/images/me.png" techStack={techStack} />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="text-center text-dark-100/25 text-[10px] mt-3 tracking-widest uppercase"
            >
              hover the card ✦
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <svg
            className="w-6 h-6 text-dark-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>
    </>
  );
}