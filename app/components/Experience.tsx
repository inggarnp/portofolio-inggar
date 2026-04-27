"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

// ─── Data ─────────────────────────────────────────────────────────────────────

type TimelineItem = {
  date: string;
  title: string;
  place: string;
  description: string;
  type: "edu" | "work" | "achievement";
  tags?: string[];
};

const timelineData: TimelineItem[] = [
  {
    date: "2014 – 2020",
    title: "Sekolah Dasar (SD)",
    place: "SDIT Al-Mujahiddin, Batam  →  SDI Al-Kindy, Jakarta",
    description:
      "Menempuh kelas 1–4 di Batam, pindah ke Jakarta dan menyelesaikan kelas 5–6 di sana. Pengalaman berpindah kota sejak dini melatih kemampuan adaptasi dan kemandirian.",
    type: "edu",
    tags: ["Batam", "Jakarta"],
  },
  {
    date: "2020 – 2023",
    title: "Sekolah Menengah Pertama (SMP)",
    place: "SMP Al-Hadi, Bandung",
    description:
      "Pindah ke Bandung dan mulai berkenalan lebih dalam dengan dunia teknologi. Di sinilah minat terhadap komputer dan pemrograman mulai tumbuh, yang kemudian mendorong pilihan jurusan di SMK.",
    type: "edu",
    tags: ["Bandung", "Teknologi"],
  },
  {
    date: "2022",
    title: "Juara 1 – Piala H. Umuh Muchtar",
    place: "Turnamen Sepak Bola, Bandung",
    description:
      "Meraih juara pertama dalam turnamen sepak bola bergengsi tingkat kota. Pengalaman ini mengajarkan arti kerja tim, kepemimpinan di lapangan, dan mental juara yang tidak kalah penting di dunia profesional.",
    type: "achievement",
    tags: ["Sepak Bola", "Juara 1", "Tim"],
  },
  {
    date: "2023 – 2026",
    title: "TKJ → RPL",
    place: "SMK MVP ARS Internasional, Bandung",
    description:
      "Memulai kelas 10 di jurusan Teknik Komputer Jaringan (TKJ), mempelajari dasar-dasar jaringan, konfigurasi server, dan infrastruktur IT. Memasuki semester 2, pindah jurusan ke Rekayasa Perangkat Lunak (RPL) dan fokus pada web development hingga lulus kelas 12. Perpindahan ini justru jadi keuntungan — membuat saya paham sisi jaringan sekaligus sisi pengembangan software secara menyeluruh.",
    type: "edu",
    tags: ["TKJ", "RPL", "Networking", "Web Dev", "Laravel", "React"],
  },
  {
    date: "2025",
    title: "Praktik Kerja Lapangan (PKL)",
    place: "PT. Sinarmas Multifinance, Bandung",
    description:
      "Mendapat pengalaman kerja nyata di lingkungan profesional perusahaan multifinance. Terlibat dalam pengembangan dan pemeliharaan sistem internal, serta belajar bagaimana tim IT bekerja dalam skala enterprise.",
    type: "work",
    tags: ["Professional", "Enterprise", "Bandung"],
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const icons = {
  edu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round" />
    </svg>
  ),
  achievement: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const typeColor = {
  edu: {
    dot: "#60a5fa",
    glow: "rgba(96,165,250,0.25)",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  work: {
    dot: "#34d399",
    glow: "rgba(52,211,153,0.25)",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  achievement: {
    dot: "#fbbf24",
    glow: "rgba(251,191,36,0.25)",
    badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
};

const typeLabel = {
  edu: "Pendidikan",
  work: "Pengalaman",
  achievement: "Prestasi",
};

// ─── Single Timeline Item ─────────────────────────────────────────────────────

function TimelineCard({
  item,
  index,
  isLeft,
}: {
  item: TimelineItem;
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const color = typeColor[item.type];

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`w-[calc(50%-2rem)] ${isLeft ? "pr-8 text-right" : "pl-8 text-left"}`}
      >
        <div
          className="group relative rounded-2xl p-5 transition-all duration-300 cursor-default"
          style={{
            background: "linear-gradient(135deg, rgba(17,24,39,0.9), rgba(15,23,42,0.9))",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = color.dot + "44";
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${color.glow}`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          {/* Type badge */}
          <div className={`flex ${isLeft ? "justify-end" : "justify-start"} mb-3`}>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${color.badge}`}
            >
              {icons[item.type]}
              {typeLabel[item.type]}
            </span>
          </div>

          {/* Date */}
          <p className="text-xs font-mono text-dark-100/50 mb-1.5 tracking-widest">
            {item.date}
          </p>

          {/* Title */}
          <h3 className="text-base font-bold text-dark-50 leading-snug mb-1">
            {item.title}
          </h3>

          {/* Place */}
          <p className="text-sm text-dark-100 mb-3 leading-relaxed">{item.place}</p>

          {/* Description */}
          <p className="text-sm text-dark-100/70 leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Tags */}
          {item.tags && (
            <div className={`flex flex-wrap gap-1.5 ${isLeft ? "justify-end" : "justify-start"}`}>
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs text-dark-100/60 border border-dark-100/10"
                  style={{ background: "rgba(31,41,55,0.5)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Center dot ── */}
      <div
        className="relative z-10 flex-shrink-0 flex items-center justify-center"
        style={{ width: "4rem" }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative flex items-center justify-center w-10 h-10 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${color.dot}22, ${color.dot}11)`,
            border: `2px solid ${color.dot}`,
            boxShadow: `0 0 0 4px ${color.glow}, 0 0 20px ${color.glow}`,
          }}
        >
          <span style={{ color: color.dot }}>{icons[item.type]}</span>

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${color.dot}` }}
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: index * 0.4 }}
          />
        </motion.div>
      </div>

      {/* Spacer mirror */}
      <div className="w-[calc(50%-2rem)]" />
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true });

  return (
    <section id="experience" className="relative section bg-dark-300 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(96,165,250,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* ── Header ── */}
        <ScrollReveal>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] uppercase text-dark-100 mb-3"
          >
            02 / Experience
          </motion.p>
          <h2 className="section-title mb-2">Perjalanan Saya</h2>
          <p className="section-subtitle">
            Dari Batam, Jakarta, hingga Bandung — perjalanan panjang yang membentuk siapa saya hari ini.
          </p>
        </ScrollReveal>

        {/* ── Timeline ── */}
        <div className="relative mt-16" ref={lineRef}>
          {/* Static line background */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-dark-100/10" />

          {/* Animated gradient line */}
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 w-px origin-top"
            style={{
              background: "linear-gradient(to bottom, #60a5fa66, #34d39944, #fbbf2444, transparent)",
            }}
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          {/* Items */}
          <div className="flex flex-col gap-12">
            {timelineData.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>

          {/* Bottom cap */}
          <motion.div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-2 h-2 rounded-full bg-dark-100/20"
            initial={{ opacity: 0 }}
            animate={lineInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
          />
        </div>
      </div>
    </section>
  );
}