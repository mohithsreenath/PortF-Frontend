import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Github, ExternalLink, Terminal } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '../utils/motion'
import { useProjects, useSkills } from '../hooks'

export default function Projects() {
  const { data: projects = [], isLoading } = useProjects()
  const { data: skills = [] } = useSkills()
  const [activeFilter, setActiveFilter] = useState('all')

  const uniqueSkills = [...new Set(projects.flatMap(p => p.skills?.map(s => s.name) || []))]

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.skills?.some(s => s.name === activeFilter))

  return (
    <div className="mesh-bg min-h-screen pt-28 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="mb-12">
            <p className="section-label">Portfolio</p>
            <h1 className="section-title mb-4">Projects</h1>
            <p className="font-body text-text-secondary max-w-lg">
              Real projects with real backends. Each one is data-driven — content managed through my own API.
            </p>
          </motion.div>

          {/* Filter bar */}
          {uniqueSkills.length > 0 && (
            <motion.div variants={fadeUp} custom={1} className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveFilter('all')}
                className={`font-mono text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                  activeFilter === 'all'
                    ? 'border-teal-400 bg-teal-400/10 text-teal-400'
                    : 'border-border text-text-muted hover:border-teal-400/40 hover:text-text-secondary'
                }`}
              >
                All ({projects.length})
              </button>
              {uniqueSkills.slice(0, 8).map(skill => (
                <button
                  key={skill}
                  onClick={() => setActiveFilter(skill)}
                  className={`font-mono text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                    activeFilter === skill
                      ? 'border-teal-400 bg-teal-400/10 text-teal-400'
                      : 'border-border text-text-muted hover:border-teal-400/40 hover:text-text-secondary'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </motion.div>
          )}

          {/* Projects grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse h-52">
                  <div className="w-10 h-10 rounded-lg bg-border mb-4" />
                  <div className="h-4 bg-border rounded w-3/4 mb-3" />
                  <div className="h-3 bg-border rounded w-full mb-2" />
                  <div className="h-3 bg-border rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div variants={fadeUp} className="text-center py-24">
              <Terminal size={32} className="text-text-muted mx-auto mb-4" />
              <p className="font-mono text-text-muted text-sm">No projects found</p>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((project, i) => (
                <motion.div key={project.id} variants={scaleIn} custom={i} layout>
                  <div className="card group h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-teal-400/10 border border-teal-400/20 flex items-center justify-center">
                          <Terminal size={14} className="text-teal-400" />
                        </div>
                        {project.featured && (
                          <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-teal-400/10 text-teal-400 border border-teal-400/20">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                            className="text-text-muted hover:text-teal-400 transition-colors"
                            onClick={e => e.stopPropagation()}>
                            <Github size={14} />
                          </a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                            className="text-text-muted hover:text-teal-400 transition-colors"
                            onClick={e => e.stopPropagation()}>
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-base font-semibold text-text-primary mb-2 group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs text-text-secondary line-clamp-3 mb-4 flex-1">
                      {project.description || 'No description available.'}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.skills?.slice(0, 4).map(s => (
                        <span key={s.id} className="tag">{s.name}</span>
                      ))}
                      {project.skills?.length > 4 && (
                        <span className="tag">+{project.skills.length - 4}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
