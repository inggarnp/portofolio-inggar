'use client'

import { ScrollReveal } from './ScrollReveal'
import { FaNetworkWired, FaDesktop, FaPlug, FaRoute, FaArrowRight } from 'react-icons/fa'

interface SkillItem {
  name: string
  icon: React.ReactNode
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: SkillItem[]
  glowColor: string
}

const SK = ({ slug }: { slug: string }) => (
  <img src={`https://skillicons.dev/icons?i=${slug}`} width="24" height="24" alt={slug} className="object-contain" />
)

const skillsData: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: <SK slug="react" />,
    glowColor: '99, 102, 241',
    skills: [
      { name: 'HTML', icon: <SK slug="html" /> },
      { name: 'CSS', icon: <SK slug="css" /> },
      { name: 'JavaScript', icon: <SK slug="js" /> },
      { name: 'Bootstrap', icon: <SK slug="bootstrap" /> },
      { name: 'Tailwind', icon: <SK slug="tailwind" /> },
      { name: 'React', icon: <SK slug="react" /> },
      { name: 'Vite', icon: <SK slug="vite" /> },
      { name: 'Next.js', icon: <SK slug="nextjs" /> },
      { name: 'Flutter', icon: <SK slug="flutter" /> },
      { name: 'Dart', icon: <SK slug="dart" /> },
    ]
  },
  {
    title: 'Backend',
    icon: <SK slug="go" />,
    glowColor: '0, 173, 216',
    skills: [
      { name: 'Laravel', icon: <SK slug="laravel" /> },
      { name: 'Golang', icon: <SK slug="go" /> },
      { name: 'MySQL', icon: <SK slug="mysql" /> },
    ]
  },
  {
    title: 'Tools',
    icon: <SK slug="github" />,
    glowColor: '156, 163, 175',
    skills: [
      { name: 'GitHub', icon: <SK slug="github" /> },
      { name: 'Postman', icon: <SK slug="postman" /> },
      { name: 'VS Code', icon: <SK slug="vscode" /> },
      { name: 'Figma', icon: <SK slug="figma" /> },
      { name: 'Laragon', icon: <img src="https://cdn.simpleicons.org/laragon/0E83CD" width="24" height="24" alt="laragon" className="object-contain" /> },
      { name: 'XAMPP', icon: <img src="https://cdn.simpleicons.org/xampp/FB7A24" width="24" height="24" alt="xampp" className="object-contain" /> },
      { name: 'DBeaver', icon: <SK slug="sqlite" /> },
    ]
  },
  {
    title: 'Networking',
    icon: <FaNetworkWired className="text-green-400" style={{ fontSize: 22 }} />,
    glowColor: '52, 211, 153',
    skills: [
      { name: 'Install OS', icon: <FaDesktop className="text-blue-400" style={{ fontSize: 20 }} /> },
      { name: 'Hardware PC', icon: <FaDesktop className="text-gray-300" style={{ fontSize: 20 }} /> },
      { name: 'Kabel LAN', icon: <FaPlug className="text-yellow-400" style={{ fontSize: 20 }} /> },
      { name: 'Setup Router', icon: <FaRoute className="text-cyan-400" style={{ fontSize: 20 }} /> },
    ]
  }
]

const CardItem = ({ category }: { category: SkillCategory }) => (
  <div
    className="card flex flex-col transition-all duration-500"
    style={{ border: '1px solid rgba(156, 163, 175, 0.1)' }}
    onMouseEnter={e => {
      const el = e.currentTarget
      el.style.boxShadow = `0 0 30px rgba(${category.glowColor}, 0.35), 0 0 60px rgba(${category.glowColor}, 0.15)`
      el.style.borderColor = `rgba(${category.glowColor}, 0.5)`
      el.style.transform = 'translateY(-4px)'
    }}
    onMouseLeave={e => {
      const el = e.currentTarget
      el.style.boxShadow = 'none'
      el.style.borderColor = 'rgba(156, 163, 175, 0.1)'
      el.style.transform = 'translateY(0)'
    }}
  >
    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-dark-200">
      <div className="h-6 flex items-center">{category.icon}</div>
      <h3 className="text-lg font-bold text-dark-50">{category.title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {category.skills.map((skill, i) => (
        <div key={i} className="flex items-center gap-2 px-3 py-2 bg-dark-200 rounded-lg hover:bg-dark-100 transition-all duration-300 cursor-default hover:scale-105">
          <div className="h-5 w-5 flex items-center justify-center flex-shrink-0">{skill.icon}</div>
          <span className="text-sm text-dark-100 font-medium whitespace-nowrap">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
)

export default function Skills() {
  return (
    <section id="skills" className="section bg-dark-200">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="section-title">Skills & Expertise</div>
          <p className="section-subtitle">Tools dan teknologi yang saya kuasai</p>
        </ScrollReveal>

        {/* 4 cards 2x2 */}
        <div className="grid grid-cols-2 gap-6">
          {skillsData.map((category, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <CardItem category={category} />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA button di bawah semua card */}
        <ScrollReveal delay={300}>
          <div className="flex justify-center mt-10">
            <a
              href="#projects"
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(0,173,216,0.15))',
                border: '1px solid rgba(99,102,241,0.4)',
                color: '#e5e7eb',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.boxShadow = '0 0 25px rgba(99,102,241,0.5), 0 0 50px rgba(0,173,216,0.2)'
                el.style.borderColor = 'rgba(99,102,241,0.8)'
                el.style.background = 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(0,173,216,0.3))'
                el.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.boxShadow = 'none'
                el.style.borderColor = 'rgba(99,102,241,0.4)'
                el.style.background = 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(0,173,216,0.15))'
                el.style.transform = 'scale(1)'
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                }}
              />
              <span className="relative z-10">See My Projects</span>
              <FaArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" style={{ fontSize: 13 }} />
            </a>
          </div>
        </ScrollReveal>

        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
        `}</style>
      </div>
    </section>
  )
} 