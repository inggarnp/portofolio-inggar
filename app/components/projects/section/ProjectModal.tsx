'use client'

import { useState, useEffect } from 'react'
import { FaTimes, FaGithub, FaExternalLinkAlt, FaYoutube, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Project, statusStyle } from '../data/projectsData'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

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
          <p className="text-dark-100 text-sm leading-relaxed mb-5">{project.longDesc}</p>

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
                style={{ background: 'rgba(156,163,175,0.08)', border: '1px solid rgba(156,163,175,0.15)' }}
              >
                <FaGithub size={14} /> GitHub
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
                <FaExternalLinkAlt size={12} /> Live Demo
              </a>
            )}
            {project.youtubeLinks?.map((yt, i) => (
              <a
                key={i}
                href={yt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <FaYoutube size={15} /> {yt.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}