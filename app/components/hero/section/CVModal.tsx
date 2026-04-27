"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CVLang = "id" | "en";

const CV_FILES: Record<CVLang, { path: string; filename: string }> = {
  id: {
    path: "/assets/cv/CV_Inggar_Nugraha_Putra_Bahasa_Indonesia.pdf",
    filename: "CV_Inggar_Nugraha_Putra_Bahasa_Indonesia.pdf",
  },
  en: {
    path: "/assets/cv/CV_Inggar_Nugraha_Putra_Bahasa_Inggris.pdf",
    filename: "CV_Inggar_Nugraha_Putra_Bahasa_Inggris.pdf",
  },
};

const langOptions: { value: CVLang; label: string; flag: string; sub: string }[] = [
  { value: "id", label: "Bahasa Indonesia", flag: "🇮🇩", sub: "Versi Indonesia" },
  { value: "en", label: "English", flag: "🇬🇧", sub: "English Version" },
];

interface CVModalProps {
  onClose: () => void;
}

export default function CVModal({ onClose }: CVModalProps) {
  const [lang, setLang] = useState<CVLang | null>(null);

  const handlePreview = () => {
    if (!lang) return;
    window.open(CV_FILES[lang].path, "_blank");
  };

  const handleDownload = () => {
    if (!lang) return;
    const { path, filename } = CV_FILES[lang];
    const a = document.createElement("a");
    a.href = path;
    a.download = filename;
    a.click();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

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
              <h2 className="text-lg font-semibold text-dark-50">Download CV</h2>
              <p className="text-xs text-dark-100 mt-0.5">
                Pilih bahasa, lalu preview atau download
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-dark-100 hover:text-dark-50 hover:bg-dark-200/50 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Language Selection */}
          <div className="mb-6">
            <p className="text-xs font-medium text-dark-100 tracking-widest uppercase mb-3">
              Pilih Bahasa
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
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-dark-50 leading-tight">
                      {l.label}
                    </span>
                    <span className="text-[10px] text-dark-100 mt-0.5">
                      {l.sub}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePreview}
              disabled={!lang}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-all duration-300"
              style={{
                background: !lang ? "rgba(31,41,55,0.4)" : "rgba(31,41,55,0.8)",
                borderColor: !lang
                  ? "rgba(156,163,175,0.08)"
                  : "rgba(156,163,175,0.25)",
                color: !lang ? "rgba(156,163,175,0.3)" : "rgba(229,231,235,0.8)",
                cursor: !lang ? "not-allowed" : "pointer",
              }}
            >
              <svg
                width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Preview CV
            </button>

            <button
              onClick={handleDownload}
              disabled={!lang}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{
                background: !lang ? "rgba(31,41,55,0.6)" : "rgba(229,231,235,0.9)",
                color: !lang ? "rgba(156,163,175,0.4)" : "#020617",
                cursor: !lang ? "not-allowed" : "pointer",
                boxShadow: !lang ? "none" : "0 0 20px rgba(229,231,235,0.15)",
              }}
            >
              <svg
                width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </button>
          </div>

          {!lang && (
            <p className="text-center text-[11px] text-dark-100/50 mt-3">
              Pilih bahasa terlebih dahulu
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}