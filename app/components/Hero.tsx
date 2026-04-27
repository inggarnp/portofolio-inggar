"use client";

import React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── ShinyText ────────────────────────────────────────────────────────────────
function ShinyText({
  text,
  children,
  className = "",
}: {
  text?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, #9ca3af 0%, #e5e7eb 25%, #ffffff 45%, #e5e7eb 60%, #9ca3af 100%)",
        backgroundSize: "250% auto",
        animation: "shiny-sweep 3s linear infinite",
      }}
    >
      {children ?? text}
    </span>
  );
}

// ─── SplitText ────────────────────────────────────────────────────────────────
function SplitText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
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

// ─── RotatingText ─────────────────────────────────────────────────────────────
function RotatingText({ texts }: { texts: string[] }) {
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

// ─── CV Modal ─────────────────────────────────────────────────────────────────
type CVLang = "id" | "en";
type CVFormat = "pdf" | "docx" | "png";

const CV_LINKS: Record<CVLang, Record<CVFormat, string>> = {
  id: {
    pdf: "/cv/CV_Inggar_ID.pdf",
    docx: "/cv/CV_Inggar_ID.docx",
    png: "/cv/CV_Inggar_ID.png",
  },
  en: {
    pdf: "/cv/CV_Inggar_EN.pdf",
    docx: "/cv/CV_Inggar_EN.docx",
    png: "/cv/CV_Inggar_EN.png",
  },
};

function CVModal({ onClose }: { onClose: () => void }) {
  const [lang, setLang] = useState<CVLang | null>(null);
  const [format, setFormat] = useState<CVFormat | null>(null);

  const handleDownload = () => {
    if (!lang || !format) return;
    const url = CV_LINKS[lang][format];
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop() || "CV_Inggar";
    a.click();
  };

  const langOptions: { value: CVLang; label: string; flag: string }[] = [
    { value: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
    { value: "en", label: "English", flag: "🇬🇧" },
  ];
  const formatOptions: { value: CVFormat; label: string; desc: string }[] = [
    { value: "pdf", label: "PDF", desc: "Best for sending" },
    { value: "docx", label: "DOCX", desc: "Editable format" },
    { value: "png", label: "PNG", desc: "Image format" },
  ];

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md rounded-2xl p-6 z-10"
          style={{
            background: "rgba(17,24,39,0.95)",
            border: "1px solid rgba(156,163,175,0.15)",
            boxShadow:
              "0 0 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-dark-50">
                Download CV
              </h2>
              <p className="text-xs text-dark-100 mt-0.5">
                Pilih bahasa & format yang kamu inginkan
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-dark-100 hover:text-dark-50 hover:bg-dark-200/50 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Step 1: Language */}
          <div className="mb-5">
            <p className="text-xs font-medium text-dark-100 tracking-widest uppercase mb-3">
              1 · Pilih Bahasa
            </p>
            <div className="grid grid-cols-2 gap-3">
              {langOptions.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLang(l.value)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-left"
                  style={{
                    background:
                      lang === l.value
                        ? "rgba(156,163,175,0.12)"
                        : "rgba(31,41,55,0.5)",
                    borderColor:
                      lang === l.value
                        ? "rgba(229,231,235,0.4)"
                        : "rgba(156,163,175,0.1)",
                    boxShadow:
                      lang === l.value
                        ? "0 0 16px rgba(229,231,235,0.08)"
                        : "none",
                  }}
                >
                  <span className="text-2xl">{l.flag}</span>
                  <span className="text-sm font-medium text-dark-50">
                    {l.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Format */}
          <div className="mb-6">
            <p className="text-xs font-medium text-dark-100 tracking-widest uppercase mb-3">
              2 · Pilih Format
            </p>
            <div className="grid grid-cols-3 gap-3">
              {formatOptions.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFormat(f.value)}
                  className="flex flex-col items-center gap-1 px-3 py-3 rounded-xl border transition-all duration-200"
                  style={{
                    background:
                      format === f.value
                        ? "rgba(156,163,175,0.12)"
                        : "rgba(31,41,55,0.5)",
                    borderColor:
                      format === f.value
                        ? "rgba(229,231,235,0.4)"
                        : "rgba(156,163,175,0.1)",
                    boxShadow:
                      format === f.value
                        ? "0 0 16px rgba(229,231,235,0.08)"
                        : "none",
                  }}
                >
                  <span className="text-sm font-bold text-dark-50">
                    {f.label}
                  </span>
                  <span className="text-[10px] text-dark-100">{f.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Download button */}
          <button
            onClick={handleDownload}
            disabled={!lang || !format}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300"
            style={{
              background:
                !lang || !format
                  ? "rgba(31,41,55,0.6)"
                  : "rgba(229,231,235,0.9)",
              color: !lang || !format ? "rgba(156,163,175,0.4)" : "#020617",
              cursor: !lang || !format ? "not-allowed" : "pointer",
              boxShadow:
                !lang || !format ? "none" : "0 0 20px rgba(229,231,235,0.15)",
            }}
          >
            {lang && format
              ? `Download ${lang.toUpperCase()} · ${format.toUpperCase()}`
              : "Pilih opsi di atas"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── SVG Tech Logos ───────────────────────────────────────────────────────────
const TechLogo = ({ name, size = 28 }: { name: string; size?: number }) => {
  const logos: Record<string, JSX.Element> = {
    React: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="#61DAFB">
        <circle cx="12" cy="11.998" r="2.1" />
        <path
          d="M12 7.867c-4.763 0-8.627 1.842-8.627 4.131 0 2.29 3.864 4.132 8.627 4.132s8.627-1.842 8.627-4.132c0-2.289-3.864-4.131-8.627-4.131zm0 6.9c-3.842 0-7.263-1.452-7.263-2.769 0-1.316 3.421-2.768 7.263-2.768s7.263 1.452 7.263 2.768c0 1.317-3.421 2.769-7.263 2.769z"
          opacity=".5"
        />
        <path
          d="M8.557 9.878C6.17 14.012 5.668 18.38 7.604 19.48c1.937 1.1 5.432-1.47 7.82-5.604 2.387-4.133 2.889-8.502.952-9.602-1.937-1.1-5.432 1.47-7.82 5.604zm6.636 3.835c-1.956 3.388-4.857 5.556-6.159 4.8-1.301-.738-.8-4.13 1.156-7.518 1.956-3.388 4.857-5.556 6.159-4.8 1.301.739.8 4.13-1.156 7.518z"
          opacity=".5"
        />
        <path
          d="M8.557 14.12c2.388 4.133 5.883 6.703 7.82 5.603 1.936-1.1 1.434-5.469-.953-9.602C12.037 5.988 8.542 3.418 6.605 4.518c-1.936 1.1-1.434 5.47.952 9.603zm5.48-3.715c1.956 3.388 2.457 6.78 1.156 7.518-1.302.756-4.203-1.412-6.159-4.8-1.956-3.388-2.457-6.78-1.156-7.518 1.302-.757 4.203 1.41 6.159 4.8z"
          opacity=".5"
        />
      </svg>
    ),
    "Next.js": (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="white">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0z" />
      </svg>
    ),
    Tailwind: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="#06B6D4">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
    Go: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="#00ADD8">
        <path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.34-.117-.174-.199-.303-.327-.548-.444-.737-.362-1.45-.257-2.115.175-.795.514-1.204 1.274-1.192 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.771.105-.129.198-.269.315-.432H10.07c-.245 0-.304-.152-.222-.35.152-.362.432-.967.596-1.274a.315.315 0 0 1 .292-.187h4.253c-.023.316-.023.631-.07.947a4.983 4.983 0 0 1-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986-1.145.152-2.209-.07-3.143-.77-.865-.655-1.356-1.52-1.484-2.595-.152-1.274.222-2.419.993-3.424.83-1.086 1.928-1.776 3.272-2.02 1.098-.2 2.15-.07 3.096.571.62.41 1.063.97 1.356 1.648.07.105.023.164-.117.2zm3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.665 3.665 0 0 1-1.262-2.255c-.21-1.32.152-2.489.947-3.529.853-1.122 1.881-1.706 3.272-1.95 1.192-.21 2.314-.095 3.33.595.923.63 1.496 1.484 1.648 2.605.198 1.578-.257 2.863-1.344 3.962-.771.783-1.718 1.273-2.805 1.495-.315.06-.631.07-.934.106zm2.78-4.72c-.011-.153-.011-.27-.034-.387-.21-1.157-1.274-1.81-2.384-1.554-1.087.245-1.788 1.098-1.788 2.197 0 1.086.736 1.88 1.835 2.01.9.093 1.72-.315 2.163-1.064.244-.385.339-.831.209-1.202z" />
      </svg>
    ),
    Laravel: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="#FF2D20">
        <path d="M23.642 5.43a.364.364 0 0 1 .014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 0 1-.188.326L9.93 23.949a.316.316 0 0 1-.066.027c-.008.002-.016.008-.024.01a.348.348 0 0 1-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 0 1-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 0 1 .023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034h.001L5.048.94a.375.375 0 0 1 .376 0l4.512 2.597h.001c.015.01.027.021.04.033l.038.027c.013.014.024.030.034.045.009.012.019.021.025.033.010.018.017.037.024.058.003.012.011.020.013.032.010.031.014.064.014.098v9.652l3.76-2.166V5.527c0-.033.004-.066.013-.098.003-.012.01-.02.015-.032a.335.335 0 0 1 .023-.058c.007-.013.016-.022.024-.033.012-.016.022-.031.034-.045.012-.010.025-.018.038-.027.014-.012.026-.024.041-.034h.001l4.513-2.598a.375.375 0 0 1 .376 0l4.512 2.598c.016.01.028.021.042.033.013.010.026.018.038.027.013.014.024.029.034.045.010.012.02.021.025.033.010.018.017.037.024.058.004.012.010.02.014.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.23-6.126 3.505v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003-.003-.002c-.014-.010-.025-.021-.04-.031-.011-.01-.024-.018-.034-.027l-.001-.002c-.013-.012-.021-.025-.031-.038-.01-.012-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.012-.015-.021-.019-.034-.007-.02-.010-.04-.014-.06-.004-.013-.01-.025-.012-.037-.003-.031-.003-.063-.003-.094V7.205L4.297 5.95zm4.126-2.976L1.86 3.045l3.357 1.93 3.357-1.93zm1.578 7.482L3.44 5.2 1.86 6.107v4.283l2.182 1.256 1.579.908zm8.65-5.52L11.09 3.044l-3.357 1.93 3.357 1.932zm-4.51 2.544v-4.283L8.358 6.107 6.18 7.363v4.283l2.182-1.256zm9.272.12-3.357-1.93v4.283l2.182 1.256 1.578.908v-4.284z" />
      </svg>
    ),
    GitHub: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="white">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  };
  return logos[name] ?? <span className="text-xl">{name[0]}</span>;
};

// ─── ElegantCard (Glare + Glow border + PixelTransition) ─────────────────────
function ElegantCard({
  photoSrc,
  techStack,
}: {
  photoSrc: string;
  techStack: { name: string; color: string }[];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [pixels, setPixels] = useState<boolean[]>(() =>
    new Array(100).fill(false),
  );
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ── Glare + border glow on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x, y, opacity: 1 });
  };
  const handleMouseLeave = () => setGlare((g) => ({ ...g, opacity: 0 }));

  // ── PixelTransition
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
      const id = setTimeout(
        () => {
          setPixels((prev) => {
            const next = [...prev];
            next[idx] = show;
            return next;
          });
        },
        step * (300 / 100),
      );
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
      onMouseEnter={() => {
        handleEnter();
      }}
      onMouseLeave={() => {
        handleMouseLeave();
        handleLeave();
      }}
    >
      {/* ── Outer glow ring (CSS border-based, elegant) */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-30 transition-all duration-500"
        style={{
          boxShadow:
            glare.opacity > 0
              ? "0 0 0 1px rgba(229,231,235,0.35), 0 0 30px rgba(229,231,235,0.12), 0 0 60px rgba(229,231,235,0.06)"
              : "0 0 0 1px rgba(156,163,175,0.12)",
        }}
      />

      {/* ── Glare spotlight overlay */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none z-20 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glare.opacity * 0.7,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 35%, transparent 70%)`,
        }}
      />

      {/* ── Top edge glint (always subtle) */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
        }}
      />

      {/* ── First content: Photo */}
      <div className="absolute inset-0">
        <Image
          src={photoSrc}
          alt="Inggar"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Bottom fade for info bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to top, rgba(2,6,23,0.9) 0%, transparent 100%)",
          }}
        />
        {/* Bottom name tag */}
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

      {/* ── Second content: Tech Stack (shown on hover) */}
      <div
        className="absolute inset-0 transition-opacity duration-200 z-10"
        style={{ opacity: hovered ? 1 : 0, background: "rgba(2,6,23,0.94)" }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-5">
          <div className="text-center">
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-1">
              Tech Stack
            </p>
            <div
              className="w-8 h-px mx-auto"
              style={{ background: "rgba(229,231,235,0.2)" }}
            />
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
          <p className="text-white/20 text-[9px] tracking-widest uppercase">
            & more
          </p>
        </div>
      </div>

      {/* ── Pixel grid overlay (transition effect) */}
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

// ─── ParticleField ────────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouseX = -9999,
      mouseY = -9999;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const COUNT = 70;
    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      opacity: number;
    };
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move & bounce
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      // Draw connections
      const MAX_DIST = 130;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12;
            ctx.strokeStyle = `rgba(229,231,235,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Mouse interaction — particles get pulled slightly toward mouse
        const mdx = mouseX - particles[i].x;
        const mdy = mouseY - particles[i].y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 120 && mdist > 0) {
          const force = ((120 - mdist) / 120) * 0.015;
          particles[i].vx += (mdx / mdist) * force;
          particles[i].vy += (mdy / mdist) * force;
          // Cap speed
          const speed = Math.sqrt(particles[i].vx ** 2 + particles[i].vy ** 2);
          if (speed > 1.5) {
            particles[i].vx = (particles[i].vx / speed) * 1.5;
            particles[i].vy = (particles[i].vy / speed) * 1.5;
          }
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229,231,235,${particles[i].opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.7 }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const handleExplore = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  const techStack = [
    { name: "Go", color: "#00ADD8" },
    { name: "Next.js", color: "#ffffff" },
    { name: "React", color: "#61DAFB" },
    { name: "Laravel", color: "#FF2D20" },
    { name: "GitHub", color: "#ffffff" },
    { name: "Tailwind", color: "#06B6D4" },
  ];

  return (
    <>
      <style>{`
        @keyframes shiny-sweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      {/* CV Modal */}
      {cvModalOpen && <CVModal onClose={() => setCvModalOpen(false)} />}

      <section
        id="home"
        className="min-h-screen bg-dark-400 flex items-center justify-center relative overflow-hidden px-6 md:px-12 lg:px-20"
      >
        {/* Particle background */}
        <div className="absolute inset-0">
          <ParticleField />
        </div>

        {/* Ambient glow orbs (behind particles) */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(156,163,175,0.05) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(229,231,235,0.03) 0%, transparent 65%)",
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
              <RotatingText
                texts={[
                  "Web Developer",
                  "Junior Developer",
                ]}
              />
              <span className="text-dark-50/40">—</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15 }}
              className="text-dark-100 text-base md:text-lg mb-10 leading-relaxed max-w-md"
            >
              Memiliki semangat belajar tinggi, mampu beradaptasi dengan
              teknologi baru, dan siap berkontribusi dalam tim untuk
              mengembangkan solusi digital yang efektif.
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
              {/* Download CV → buka modal */}
              <button
                onClick={() => setCvModalOpen(true)}
                className="btn-secondary"
              >
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
            <ElegantCard
              photoSrc="/assets/images/me.png"
              techStack={techStack}
            />
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
