"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import TechLogo from "./TechLogo";

interface ElegantCardProps {
  photoSrc: string;
  techStack: { name: string; color: string }[];
}

export default function ElegantCard({ photoSrc, techStack }: ElegantCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [pixels, setPixels] = useState<boolean[]>(() => new Array(100).fill(false));
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x, y, opacity: 1 });
  };
  const handleMouseLeave = () => setGlare((g) => ({ ...g, opacity: 0 }));

  const clearTimers = () => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  };

  const animate = useCallback((show: boolean) => {
    clearTimers();
    const order = Array.from({ length: 100 }, (_, i) => i).sort(
      () => Math.random() - 0.5,
    );
    order.forEach((idx, step) => {
      const id = setTimeout(() => {
        setPixels((prev) => {
          const next = [...prev];
          next[idx] = show;
          return next;
        });
      }, step * (300 / 100));
      timerRefs.current.push(id);
    });
  }, []);

  const handleEnter = () => {
    setHovered(true);
    animate(true);
  };
  const handleLeave = () => {
    animate(false);
    setTimeout(() => setHovered(false), 320);
  };

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{ aspectRatio: "3/4", width: "100%" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { handleEnter(); }}
      onMouseLeave={() => { handleMouseLeave(); handleLeave(); }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-30 transition-all duration-500"
        style={{
          boxShadow:
            glare.opacity > 0
              ? "0 0 0 1px rgba(229,231,235,0.35), 0 0 30px rgba(229,231,235,0.12), 0 0 60px rgba(229,231,235,0.06)"
              : "0 0 0 1px rgba(156,163,175,0.12)",
        }}
      />

      {/* Glare spotlight overlay */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none z-20 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glare.opacity * 0.7,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 35%, transparent 70%)`,
        }}
      />

      {/* Top edge glint */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
        }}
      />

      {/* Photo layer */}
      <div className="absolute inset-0">
        <Image
          src={photoSrc}
          alt="Inggar"
          fill
          className="object-cover object-top"
          priority
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to top, rgba(2,6,23,0.9) 0%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-semibold tracking-wide">
              Inggar Nugraha Putra
            </p>
            <p className="text-white/50 text-xs mt-0.5">Junior Developer</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
        </div>
      </div>

      {/* Tech Stack hover layer */}
      <div
        className="absolute inset-0 transition-opacity duration-200 z-10"
        style={{ opacity: hovered ? 1 : 0, background: "rgba(2,6,23,0.94)" }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-5">
          <div className="text-center">
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-1">
              Tech Stack
            </p>
            <div className="w-8 h-px mx-auto" style={{ background: "rgba(229,231,235,0.2)" }} />
          </div>
          <div className="grid grid-cols-3 gap-3 w-full">
            {techStack.map((t) => (
              <div
                key={t.name}
                className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl transition-colors"
                style={{
                  background: "rgba(31,41,55,0.6)",
                  border: "1px solid rgba(156,163,175,0.08)",
                }}
              >
                <TechLogo name={t.name} size={26} />
                <span className="text-[9px] font-medium tracking-wide text-white/70">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-white/20 text-[9px] tracking-widest uppercase">& more</p>
        </div>
      </div>

      {/* Pixel transition overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gridTemplateRows: "repeat(10, 1fr)",
        }}
      >
        {pixels.map((filled, i) => (
          <div
            key={i}
            style={{
              backgroundColor: filled ? "#e5e7eb" : "transparent",
              transition: "background-color 0.07s ease",
              opacity: filled ? 0.09 : 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}