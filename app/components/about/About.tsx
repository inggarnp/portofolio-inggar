'use client'

import React from 'react'
import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ScrollReveal } from '../ScrollReveal'
import MiniIDCard from './section/MiniIDCard'

// ─── Constants ────────────────────────────────────────────────────────────────

const TECH_STACK = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Laravel', 'MySQL', 'Git', 'Figma']

const INTEREST_ICONS = {
  football: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 6.32 2.26L15 7l-3-.5L9 7 5.68 4.26A10 10 0 0 1 12 2z" strokeLinejoin="round" />
      <path d="m5.68 4.26-1.1 3.37L6 10l3-.5 3 .5 1.5-2.5L15 7l3.32-2.74" strokeLinejoin="round" />
      <path d="M6 10l-3.42 1.84A10 10 0 0 0 2 12a10 10 0 0 0 1.68 5.58L6 16l-.5-3L6 10z" strokeLinejoin="round" />
      <path d="M17.42 21.16A10 10 0 0 0 22 12a10 10 0 0 0-.58-3.16L18 10l.5 3L18 16l2.32 1.58" strokeLinejoin="round" />
      <path d="m3.68 17.58 2.64-.42L8 19.5l.5 2.46A10 10 0 0 1 3.68 17.58z" strokeLinejoin="round" />
      <path d="M15.5 21.96 16 19.5l1.68-2.34 2.64.42a10 10 0 0 1-4.82 4.38z" strokeLinejoin="round" />
      <path d="M9 7 6 10l-.5 3L8 16h8l2.5-3-.5-3-3-3-3 .5z" strokeLinejoin="round" />
      <path d="m8 16-2.32 1.58L8 19.5l1.5-2.5z" strokeLinejoin="round" />
      <path d="m16 16 2.32 1.58L16 19.5l-1.5-2.5z" strokeLinejoin="round" />
      <path d="m8.5 21.96.5-2.46L16 19.5l.5 2.46" strokeLinejoin="round" />
    </svg>
  ),
  gamepad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
      <rect x="2" y="7" width="20" height="13" rx="4" />
      <path d="M8 11v4M6 13h4" strokeLinecap="round" />
      <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
      <polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" />
    </svg>
  ),
}

const INTERESTS = [
  { icon: INTEREST_ICONS.football, label: 'Sepak Bola' },
  { icon: INTEREST_ICONS.gamepad,  label: 'Esports'    },
  { icon: INTEREST_ICONS.code,     label: 'Open Source'},
  { icon: INTEREST_ICONS.book,     label: 'Self-taught'},
]

const STATS = [
  { value: '1+',  label: 'Tahun Dev'  },
  { value: '10+', label: 'Project'    },
  { value: '8+',  label: 'Tech Stack' },
]

const BIO_PARAGRAPHS = [
  { 
    text: 'Fresh graduate SMK jurusan Rekayasa Perangkat Lunak dari Bandung. Memulai di dunia IT melalui TKJ, lalu beralih ke RPL dan fokus pada web development.', 
    delay: 0.32 
  },
  { 
    text: 'Terbiasa bekerja dalam tim melalui pengalaman di esports dan olahraga, yang membentuk kemampuan komunikasi, disiplin, dan kerja sama.', 
    delay: 0.42 
  },
  { 
    text: 'Berfokus membangun aplikasi web yang tidak hanya fungsional, tetapi juga memiliki tampilan yang nyaman dan mudah digunakan.', 
    delay: 0.50 
  },
]

// ─── Small Components ─────────────────────────────────────────────────────────

function TechTag({ name, delay }: { name: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.07] text-dark-100 hover:text-dark-50 hover:border-white/[0.15] transition-all duration-200 cursor-default"
    >
      <span className="w-1 h-1 rounded-full bg-dark-100/40" />
      {name}
    </motion.span>
  )
}

function InterestPill({ icon, label, delay }: { icon: React.ReactNode; label: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border border-white/[0.07] text-dark-100 bg-white/[0.03] hover:text-dark-50 hover:border-white/[0.15] transition-all duration-200"
    >
      {icon}
      {label}
    </motion.span>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const glareX = useTransform(mouseX, [0, 1], ['0%', '100%'])
  const glareY = useTransform(mouseY, [0, 1], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  return (
    <section id="about" className="relative section bg-dark-400 overflow-hidden">
      {/* Subtle ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(156,163,175,0.025) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); mouseX.set(0.5); mouseY.set(0.5) }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(18,26,42,0.97) 0%, rgba(11,18,30,0.99) 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: hovered
              ? '0 0 0 1px rgba(255,255,255,0.15), 0 0 48px rgba(255,255,255,0.05), 0 32px 80px rgba(0,0,0,0.5)'
              : '0 0 0 1px rgba(255,255,255,0.05), 0 24px 64px rgba(0,0,0,0.4)',
            transition: 'box-shadow 0.35s ease',
          }}
        >
          {/* Glare layer */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 rounded-3xl"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]) =>
                  hovered
                    ? `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 40%, transparent 65%)`
                    : 'none'
              ),
            }}
          />

          {/* Inner grid: kiri teks | kanan card */}
          <div className="relative z-20 grid lg:grid-cols-2 gap-0 items-center">

            {/* ─── Kiri: Bio ─── */}
            <div className="p-10 lg:pr-8 lg:border-r border-white/[0.05]">
              <div className="mb-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-[10px] text-dark-100/35 tracking-[0.18em] uppercase font-medium mb-1"
                >
                  Inggar Nugraha Puta · 30 Juni 2007
                </motion.p>
              </div>

              {/* Bio paragraphs */}
              <div className="space-y-3 mb-6">
                {BIO_PARAGRAPHS.map(({ text, delay }, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay, ease: 'easeOut' }}
                    className="text-dark-100/75 text-[13.5px] leading-[1.85]"
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              {/* Interests */}
              <div className="flex flex-wrap gap-2 mb-6">
                {INTERESTS.map(({ icon, label }, i) => (
                  <InterestPill key={label} icon={icon} label={label} delay={0.52 + i * 0.05} />
                ))}
              </div>

              <div className="h-px bg-white/[0.05] mb-5" />

              {/* Tech Stack */}
              <div className="mb-5">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 }}
                  className="text-[9px] tracking-[0.22em] uppercase text-dark-100/30 font-semibold mb-2.5"
                >
                  Tech Stack
                </motion.p>
                <div className="flex flex-wrap gap-1.5">
                  {TECH_STACK.map((name, i) => (
                    <TechTag key={name} name={name} delay={0.56 + i * 0.028} />
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-3 mb-7">
                {STATS.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.07 }}
                    className="flex flex-col items-center px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.14] transition-all duration-300"
                  >
                    <span className="text-lg font-bold text-dark-50 leading-none">{value}</span>
                    <span className="text-[9px] text-dark-100/40 mt-1 tracking-[0.14em] uppercase">{label}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.68 }}
                className="flex gap-3 flex-wrap"
              >
                <button
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary text-sm"
                >
                  Lihat Skills
                </button>
                <a
                  href="#experience"
                  onClick={(e) => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="btn-secondary text-sm"
                >
                  Perjalanan Saya
                </a>
              </motion.div>
            </div>

            {/* ─── Kanan: ID Card ─── */}
            <div className="flex items-center justify-center px-10 pt-6 pb-10 lg:pl-8">
              <MiniIDCard
                name="Inggar"
                role="Web Developer"
                stack={['React', 'Next.js', 'Laravel', 'Tailwind']}
              />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}