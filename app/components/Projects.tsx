'use client'

import { useState, useEffect } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { FaTimes, FaGithub, FaExternalLinkAlt, FaYoutube, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import img1 from '@/public/assets/images/project/apartement.png'
import img2 from '@/public/assets/images/project/pengelolaan_pkl.png'
import img3 from '@/public/assets/images/project/kantin.png'
import img4 from '@/public/assets/images/project/permit_web.png'
import img5 from '@/public/assets/images/project/grovy.png'
import img6 from '@/public/assets/images/project/engineering.png'
import img7 from '@/public/assets/images/project/dokumentasi_surat.png'
import img8 from '@/public/assets/images/project/manajemen_aset.png'
import img9 from '@/public/assets/images/project/pengaduan_sarana.png'
import img10 from '@/public/assets/images/project/leaderboard.png'
import img11 from '@/public/assets/images/project/totolink.png'
import img12 from '@/public/assets/images/project/permit_app.png'
import img13 from '@/public/assets/images/project/portofolio.png'

type Category = 'All' | 'Web' | 'Mobile' | 'Other'

interface Project {
  id: number
  title: string
  shortDesc: string
  longDesc: string
  techStack: string[]
  category: 'Web' | 'Mobile' | 'Other'
  emoji: string
  accentColor: string
  github?: string
  liveDemo?: string
  youtubeLinks?: { label: string; url: string }[]
  screenshots?: string[]
  status?: 'Completed' | 'In Progress' | 'Personal'
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Aplikasi Apartemen',
    shortDesc: 'Sistem manajemen apartemen dengan fitur booking, pembayaran, dan laporan penghuni.',
    longDesc: 'Sistem informasi manajemen apartemen lengkap. Mencakup fitur pendaftaran penghuni, booking unit, manajemen pembayaran sewa, laporan keuangan, dan notifikasi reminder. Admin dapat memantau seluruh aktivitas dari satu dashboard.',
    techStack: ['PHP', 'MySQL'],
    category: 'Web',
    emoji: '🏢',
    accentColor: '99, 102, 241',
    status: 'Completed',
    screenshots: [img1.src],
  },
  {
    id: 2,
    title: 'Sistem Pengelolaan PKL',
    shortDesc: 'Platform pengelolaan dan penilaian laporan Praktik Kerja Lapangan untuk sekolah.',
    longDesc: 'Aplikasi web untuk mengelola proses PKL siswa dari awal hingga akhir. Fitur meliputi pengajuan tempat PKL, upload laporan harian, penilaian oleh pembimbing sekolah & industri, monitoring progress, dan cetak sertifikat. Digunakan oleh siswa, guru pembimbing, dan admin sekolah.',
    techStack: ['PHP', 'MySQL'],
    category: 'Web',
    emoji: '📋',
    accentColor: '16, 185, 129',
    status: 'Completed',
    screenshots: [img2.src],
  },
  {
    id: 3,
    title: 'Kantin Sehat',
    shortDesc: 'Aplikasi pemesanan kantin dengan fitur menu harian, kasir digital, dan laporan penjualan.',
    longDesc: 'Solusi digital untuk kantin sekolah/instansi. Pengguna dapat melihat menu hari ini, melakukan pemesanan, dan melakukan pembayaran. Sisi admin memiliki fitur kelola menu, kasir digital dengan struk, dan laporan penjualan harian/bulanan.',
    techStack: ['Laravel', 'MySQL'],
    category: 'Web',
    emoji: '🥗',
    accentColor: '245, 158, 11',
    status: 'Completed',
    screenshots: [img3.src],
  },
  {
    id: 4,
    title: 'Permit Web',
    shortDesc: 'Sistem pengajuan dan approval izin karyawan secara digital berbasis web.',
    longDesc: 'Aplikasi manajemen perizinan karyawan berbasis web. Karyawan dapat mengajukan izin sakit, cuti, atau izin khusus lengkap dengan upload dokumen pendukung. Manajer mendapat notifikasi dan bisa approve/reject dengan komentar. Histori izin tersimpan dan bisa dicetak.',
    techStack: ['React', 'Vite', 'Golang', 'MySQL'],
    category: 'Web',
    emoji: '📄',
    accentColor: '59, 130, 246',
    status: 'Completed',
    screenshots: [img4.src],
  },
  {
    id: 5,
    title: 'Permit App',
    shortDesc: 'Versi mobile dari sistem permit — akses pengajuan izin dari genggaman tangan.',
    longDesc: 'Aplikasi mobile companion dari Permit Web. Dibangun menggunakan Flutter agar tersedia di Android & iOS. Karyawan dapat mengajukan izin, melihat status pengajuan, dan mendapat push notification saat izin diproses. UI/UX dirancang mobile-first untuk kemudahan penggunaan di lapangan.',
    techStack: ['Flutter', 'Dart', 'Golang', 'MySQL'],
    category: 'Mobile',
    emoji: '📱',
    accentColor: '6, 182, 212',
    status: 'Completed',
    screenshots: [img12.src],
  },
  {
    id: 6,
    title: 'Glimmer — Grovy Fanbase JKT48',
    shortDesc: 'Website fanbase resmi Grovy (member JKT48) dengan fitur konten, galeri, dan komunitas.',
    longDesc: 'Website fanbase "Glimmer Star of Victory" untuk Grovy JKT48. Menampilkan profil, galeri foto/video, jadwal event, dan berita terbaru seputar Grovy. Didesain dengan estetika idol-pop yang kuat. Menjadi pusat informasi bagi para wota/fans Grovy.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    category: 'Web',
    emoji: '⭐',
    accentColor: '244, 114, 182',
    liveDemo: 'https://glimmerstarofvictory.id/',
    status: 'Personal',
    screenshots: [img5.src],
  },
  {
    id: 7,
    title: 'Wota Engineering',
    shortDesc: 'Website komunitas para wota yang juga engineer — tempat berbagi konten dan diskusi.',
    longDesc: 'Portal komunitas yang menggabungkan dunia idol (JKT48) dan teknologi. Anggota dapat berbagi artikel, proyek, dan diskusi di forum. Ada fitur member profile, event komunitas, dan showcase karya anggota. Dibangun sebagai ruang safe-space bagi wota yang juga berkecimpung di dunia IT.',
    techStack: ['Html', 'Bootstrap'],
    category: 'Web',
    emoji: '🔧',
    accentColor: '139, 92, 246',
    liveDemo: 'https://wota-engineering.netlify.app/',
    status: 'Personal',
    screenshots: [img6.src],
  },
  {
    id: 8,
    title: 'Manajemen Aset',
    shortDesc: 'Sistem pencatatan dan pelacakan aset instansi dengan QR code dan laporan inventaris.',
    longDesc: 'Aplikasi untuk mengelola aset fisik instansi/perusahaan. Setiap aset diberi QR code unik yang bisa di-scan untuk melihat detail dan riwayatnya. Fitur meliputi tambah/edit aset, perpindahan lokasi, kondisi aset, jadwal maintenance, dan laporan inventaris yang bisa diekspor ke Excel/PDF.',
    techStack: ['Golang', 'React', 'Vite', 'MySQL'],
    category: 'Web',
    emoji: '📦',
    accentColor: '234, 179, 8',
    status: 'Completed',
    screenshots: [img8.src],
  },
  {
    id: 9,
    title: 'Dokumentasi Surat Desa',
    shortDesc: 'Aplikasi pengarsipan dan pembuatan surat-menyurat desa secara digital.',
    longDesc: 'Sistem digitalisasi administrasi desa. Petugas dapat membuat berbagai jenis surat (keterangan domisili, tidak mampu, usaha, dll) dari template, mencetak langsung, dan menyimpan arsip digital. Dilengkapi fitur pencarian arsip, nomor surat otomatis, dan laporan bulanan untuk kepala desa.',
    techStack: ['Laravel', 'MySQL'],
    category: 'Web',
    emoji: '🏘️',
    accentColor: '20, 184, 166',
    status: 'Completed',
    screenshots: [img7.src],
  },
  {
    id: 10,
    title: 'Pengaduan Sarana Sekolah',
    shortDesc: 'Platform aduan kerusakan fasilitas sekolah dengan sistem tracking dan response dari admin.',
    longDesc: 'Aplikasi untuk memudahkan siswa, guru, dan staff melaporkan kerusakan fasilitas sekolah (kelas, lab, toilet, dll). Laporan dilengkapi foto dan lokasi. Admin dapat melihat semua laporan, mengatur prioritas, menugaskan teknisi, dan update status perbaikan. Ada notifikasi ke pelapor saat status berubah.',
    techStack: ['Laravel', 'MySQL'],
    category: 'Web',
    emoji: '🏫',
    accentColor: '239, 68, 68',
    status: 'Completed',
    screenshots: [img9.src],
  },
  {
    id: 11,
    title: 'Grovy Leaderboard',
    shortDesc: 'Sistem internal fanbase untuk tracking kontribusi member komunitas Grovy.',
    longDesc: 'Project internal fanbase Grovy untuk gamifikasi kontribusi anggota. Member mendapat poin dari berbagai aktivitas (voting, streaming, merchandise, event). Leaderboard realtime menampilkan top kontributor. Ada fitur achievement, badge, dan history aktivitas. Meningkatkan engagement komunitas secara signifikan.',
    techStack: ['Laravel', 'MySQL', 'Tailwind CSS'],
    category: 'Web',
    emoji: '🏆',
    accentColor: '251, 191, 36',
    status: 'Personal',
    screenshots: [img10.src],
  },
  {
    id: 12,
    title: 'Portfolio Website',
    shortDesc: 'Website portfolio personal — yang sedang kamu lihat sekarang ini!',
    longDesc: 'Portfolio website personal yang dibangun dari nol menggunakan Next.js 14 dan Tailwind CSS. Dirancang dengan dark theme elegan dan smooth scroll reveal animations. Menampilkan skills, pengalaman, dan project-project yang telah dikerjakan. Fully responsive dan SEO-friendly.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    category: 'Web',
    emoji: '💼',
    accentColor: '99, 102, 241',
    status: 'Personal',
    screenshots: [img13.src],
  },
  {
    id: 13,
    title: 'Networking & IoT (TKJ)',
    shortDesc: 'Pengalaman dari masa TKJ: setup router, kabel LAN, hardware PC, install OS, dan IoT dasar.',
    longDesc: 'Saat masih di jurusan TKJ, punya kesempatan belajar dan praktik langsung di bidang jaringan dan IoT. Mulai dari krimping kabel LAN Cat5e/Cat6, konfigurasi router Totolink (Multi SSID, Access Point), install & setup OS Windows di PC fisik maupun virtual (VirtualBox), merakit/service hardware PC, sampai proyek IoT dasar dengan LED dan sensor menggunakan Arduino/ESP. Dokumentasi sebagian ada di channel YouTube.',
    techStack: ['Cisco', 'Totolink', 'Arduino', 'Windows Server', 'VirtualBox'],
    category: 'Other',
    emoji: '🌐',
    accentColor: '52, 211, 153',
    youtubeLinks: [
      { label: 'Setup Totolink', url: 'https://youtu.be/ePR8-zqZQcI?si=eHli17Z_PDmShRLZ' },
      { label: 'IoT - LED', url: 'https://youtu.be/23oGCA6QY44?si=027pmNsfC_51fKrZ' },
    ],
    status: 'Completed',
    screenshots: [img11.src],
  },
]

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All', value: 'All' },
  { label: 'Web', value: 'Web' },
  { label: 'Mobile', value: 'Mobile' },
  { label: 'Other', value: 'Other' },
]

const statusStyle: Record<string, string> = {
  Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Personal: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div
      className="group relative flex flex-col bg-dark-300 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{ border: '1px solid rgba(156,163,175,0.08)' }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.boxShadow = `0 0 30px rgba(${project.accentColor}, 0.2), 0 0 60px rgba(${project.accentColor}, 0.08)`
        el.style.borderColor = `rgba(${project.accentColor}, 0.35)`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.boxShadow = 'none'
        el.style.borderColor = 'rgba(156,163,175,0.08)'
      }}
      onClick={onClick}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, rgba(${project.accentColor}, 0.8), transparent)` }}
      />

      {/* Emoji / image area */}
      <div
        className="relative flex items-center justify-center h-36 text-5xl"
        style={{ background: `linear-gradient(135deg, rgba(${project.accentColor}, 0.06) 0%, rgba(${project.accentColor}, 0.02) 100%)` }}
      >
        {project.screenshots && project.screenshots.length > 0 ? (
          <img
            src={project.screenshots[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{project.emoji}</span>
        )}

        {/* Category badge */}
        <span
          className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border"
          style={{
            background: `rgba(${project.accentColor}, 0.12)`,
            color: `rgb(${project.accentColor})`,
            borderColor: `rgba(${project.accentColor}, 0.25)`,
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold text-dark-50 leading-snug group-hover:text-white transition-colors">
            {project.title}
          </h3>
          {project.status && (
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0 ${statusStyle[project.status]}`}>
              {project.status}
            </span>
          )}
        </div>

        <p className="text-dark-100 text-sm leading-relaxed mb-4 flex-1">
          {project.shortDesc}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-dark-200 text-dark-100 text-[11px] rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 bg-dark-200 text-dark-100 text-[11px] rounded-md font-medium">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Hover: "click to view" hint */}
      <div className="px-5 pb-4">
        <div
          className="w-full text-center text-[11px] font-medium py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
          style={{
            background: `rgba(${project.accentColor}, 0.1)`,
            color: `rgb(${project.accentColor})`,
            border: `1px solid rgba(${project.accentColor}, 0.2)`,
          }}
        >
          Click to view details →
        </div>
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0)

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const hasScreenshots = project.screenshots && project.screenshots.length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-dark-300 rounded-2xl overflow-hidden shadow-2xl"
        style={{
          border: `1px solid rgba(${project.accentColor}, 0.25)`,
          boxShadow: `0 0 60px rgba(${project.accentColor}, 0.15)`,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Accent top bar */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, rgba(${project.accentColor}, 0.4), rgba(${project.accentColor}, 1), rgba(${project.accentColor}, 0.4))` }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-dark-200 text-dark-100 hover:text-dark-50 hover:bg-dark-300 transition-all"
        >
          <FaTimes size={13} />
        </button>

        {/* Screenshot area */}
        <div
          className="relative flex items-center justify-center h-52 text-7xl"
          style={{ background: `linear-gradient(135deg, rgba(${project.accentColor}, 0.08) 0%, rgba(${project.accentColor}, 0.03) 100%)` }}
        >
          {hasScreenshots ? (
            <>
              <img
                src={project.screenshots![imgIdx]}
                alt={`${project.title} screenshot ${imgIdx + 1}`}
                className="w-full h-full object-cover"
              />
              {project.screenshots!.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx(i => (i - 1 + project.screenshots!.length) % project.screenshots!.length)}
                    className="absolute left-3 w-8 h-8 flex items-center justify-center rounded-full bg-dark-400/70 text-dark-50 hover:bg-dark-300 transition-all"
                  >
                    <FaChevronLeft size={12} />
                  </button>
                  <button
                    onClick={() => setImgIdx(i => (i + 1) % project.screenshots!.length)}
                    className="absolute right-3 w-8 h-8 flex items-center justify-center rounded-full bg-dark-400/70 text-dark-50 hover:bg-dark-300 transition-all"
                  >
                    <FaChevronRight size={12} />
                  </button>
                  <div className="absolute bottom-3 flex gap-1.5">
                    {project.screenshots!.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className="w-1.5 h-1.5 rounded-full transition-all"
                        style={{
                          background: i === imgIdx ? `rgb(${project.accentColor})` : 'rgba(156,163,175,0.4)',
                          transform: i === imgIdx ? 'scale(1.3)' : 'scale(1)',
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            // placeholder saat belum ada screenshot
            <div className="flex flex-col items-center gap-2">
              <span>{project.emoji}</span>
              <span className="text-xs text-dark-100 font-medium">Screenshot coming soon</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                  style={{
                    background: `rgba(${project.accentColor}, 0.12)`,
                    color: `rgb(${project.accentColor})`,
                    borderColor: `rgba(${project.accentColor}, 0.25)`,
                  }}
                >
                  {project.category}
                </span>
                {project.status && (
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusStyle[project.status]}`}>
                    {project.status}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-dark-50">{project.title}</h2>
            </div>
          </div>

          {/* Long description */}
          <p className="text-dark-100 text-sm leading-relaxed mb-5">
            {project.longDesc}
          </p>

          {/* Tech stack */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-dark-100 uppercase tracking-widest mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-dark-200 text-dark-100 text-xs rounded-lg font-medium"
                  style={{ border: '1px solid rgba(156,163,175,0.1)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-dark-50 transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(156,163,175,0.08)',
                  border: '1px solid rgba(156,163,175,0.15)',
                }}
              >
                <FaGithub size={14} />
                GitHub
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: `rgba(${project.accentColor}, 0.12)`,
                  border: `1px solid rgba(${project.accentColor}, 0.25)`,
                  color: `rgb(${project.accentColor})`,
                }}
              >
                <FaExternalLinkAlt size={12} />
                Live Demo
              </a>
            )}
            {project.youtubeLinks && project.youtubeLinks.map((yt, i) => (
              <a
                key={i}
                href={yt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)',
                }}
              >
                <FaYoutube size={15} />
                {yt.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter)

  const counts: Record<Category, number> = {
    All: projectsData.length,
    Web: projectsData.filter(p => p.category === 'Web').length,
    Mobile: projectsData.filter(p => p.category === 'Mobile').length,
    Other: projectsData.filter(p => p.category === 'Other').length,
  }

  return (
    <>
      <section id="projects" className="section bg-dark-400">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="section-title">Projects</div>
            <p className="section-subtitle">
              Karya yang pernah aku bangun — dari sekolah sampai iseng-iseng sendiri
            </p>
          </ScrollReveal>

          {/* Filter tabs */}
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap gap-2 mb-10">
              {FILTERS.map(f => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={
                    activeFilter === f.value
                      ? {
                          background: 'rgba(99,102,241,0.2)',
                          border: '1px solid rgba(99,102,241,0.5)',
                          color: '#a5b4fc',
                          boxShadow: '0 0 15px rgba(99,102,241,0.2)',
                        }
                      : {
                          background: 'rgba(31,41,55,0.5)',
                          border: '1px solid rgba(156,163,175,0.1)',
                          color: '#9ca3af',
                        }
                  }
                >
                  {f.label}
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{
                      background: activeFilter === f.value ? 'rgba(99,102,241,0.3)' : 'rgba(156,163,175,0.1)',
                      color: activeFilter === f.value ? '#a5b4fc' : '#6b7280',
                    }}
                  >
                    {counts[f.value]}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 60}>
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-dark-100">
              <p className="text-4xl mb-3">🔍</p>
              <p>Belum ada project di kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}