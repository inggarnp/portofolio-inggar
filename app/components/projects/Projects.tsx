'use client'

import { useState } from 'react'
import { ScrollReveal } from '../ScrollReveal'
import { projectsData, FILTERS, Category, Project } from './data/projectsData'
import ProjectCard from './section/ProjectCard'
import ProjectModal from './section/ProjectModal'

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