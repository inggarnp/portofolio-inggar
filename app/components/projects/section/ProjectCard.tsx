import { Project, statusStyle } from '../data/projectsData'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
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

      {/* Image / emoji area */}
      <div
        className="relative flex items-center justify-center h-36 text-5xl"
        style={{ background: `linear-gradient(135deg, rgba(${project.accentColor}, 0.06) 0%, rgba(${project.accentColor}, 0.02) 100%)` }}
      >
        {project.screenshots && project.screenshots.length > 0 ? (
          <img src={project.screenshots[0]} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <span>{project.emoji}</span>
        )}
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

        <p className="text-dark-100 text-sm leading-relaxed mb-4 flex-1">{project.shortDesc}</p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech, i) => (
            <span key={i} className="px-2 py-0.5 bg-dark-200 text-dark-100 text-[11px] rounded-md font-medium">
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

      {/* Hover hint */}
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