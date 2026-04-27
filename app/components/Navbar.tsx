'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'

type NavItem = {
  id: string
  label: string
  href: string
}

const navItems: NavItem[] = [
  { id: 'home',     label: 'Home',     href: '#home'     },
  { id: 'about',    label: 'About',    href: '#about'    },
  { id: 'skills',   label: 'Skills',   href: '#skills'   },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact',  label: 'Contact',  href: '#contact'  },
]

// ─── ShinyText ─────────────────────────────────────────────────────────────────
function ShinyText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage:
          'linear-gradient(120deg, #9ca3af 0%, #e5e7eb 30%, #ffffff 50%, #e5e7eb 70%, #9ca3af 100%)',
        backgroundSize: '250% auto',
        animation: 'navbar-shiny 2.5s linear infinite',
      }}
    >
      {children}
    </span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [activeId, setActiveId]   = useState('home')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Refs untuk menghitung posisi underline sliding
  const navRef  = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  // Underline geometry state
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 })

  // Update underline position berdasarkan hovered atau active item
  useEffect(() => {
    const targetId = hoveredId ?? activeId
    const el = itemRefs.current[targetId]
    const nav = navRef.current
    if (!el || !nav) return

    const navRect = nav.getBoundingClientRect()
    const elRect  = el.getBoundingClientRect()

    setUnderline({
      left:    elRect.left - navRect.left,
      width:   elRect.width,
      opacity: 1,
    })
  }, [hoveredId, activeId])

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section detection
  useEffect(() => {
    const onScroll = () => {
      for (const { id } of navItems) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top < 150 && rect.bottom > 150) {
            setActiveId(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Keyframe for ShinyText */}
      <style>{`
        @keyframes navbar-shiny {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark-400/95 backdrop-blur-md border-b border-dark-200/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl font-bold"
          >
            <ShinyText>Inggar</ShinyText>
          </motion.div>

          {/* Nav items + sliding underline */}
          <motion.div
            ref={navRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex gap-8 items-center"
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Sliding underline bar */}
            <motion.span
              className="absolute bottom-[-6px] h-[2px] rounded-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #e5e7eb 40%, #ffffff 60%, transparent)',
                boxShadow: '0 0 8px rgba(229,231,235,0.6)',
              }}
              animate={{
                left:    underline.left,
                width:   underline.width,
                opacity: underline.opacity,
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />

            {navItems.map((item, i) => {
              const isActive  = activeId  === item.id
              const isHovered = hoveredId === item.id
              const isLit     = isActive || isHovered

              return (
                <motion.a
                  key={item.id}
                  ref={(el) => { itemRefs.current[item.id] = el }}
                  href={item.href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  className="relative text-sm font-medium transition-colors duration-200 pb-1"
                >
                  {isLit ? (
                    <ShinyText>{item.label}</ShinyText>
                  ) : (
                    <span className="text-dark-100">{item.label}</span>
                  )}
                </motion.a>
              )
            })}
          </motion.div>

        </div>
      </nav>
    </>
  )
}