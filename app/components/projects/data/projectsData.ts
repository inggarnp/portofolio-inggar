import img1 from '@/public/assets/images/project/apartement.png'
import img2 from '@/public/assets/images/project/pengelolaan_pkl.png'
import img3 from '@/public/assets/images/project/kantin.png'
import img4 from '@/public/assets/images/project/permit_web.png'
import img5 from '@/public/assets/images/project/grovy.png'
import img6 from '@/public/assets/images/project/engineering.png'
import img7 from '@/public/assets/images/project/dokumentasi_surat.png'
import img8 from '@/public/assets/images/project/manajemen_aset.png'
import img9 from '@/public/assets/images/project/pengaduan_sarana.png'
import img11 from '@/public/assets/images/project/totolink.png'
import img12 from '@/public/assets/images/project/permit_app.png'
import img13 from '@/public/assets/images/project/portofolio.png'

export type Category = 'All' | 'Web' | 'Mobile' | 'Other'

export interface Project {
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

export const projectsData: Project[] = [
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

export const FILTERS: { label: string; value: Category }[] = [
  { label: 'All', value: 'All' },
  { label: 'Web', value: 'Web' },
  { label: 'Mobile', value: 'Mobile' },
  { label: 'Other', value: 'Other' },
]

export const statusStyle: Record<string, string> = {
  Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Personal: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}