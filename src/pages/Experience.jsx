import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import { fadeUp, staggerContainer, slideInLeft } from '../utils/motion'
import { useExperience } from '../hooks'

export default function Experience() {
  const { data: experience = [], isLoading } = useExperience()

  return (
    <div className="mesh-bg min-h-screen pt-28 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="mb-16">
            <p className="section-label">Career</p>
            <h1 className="section-title mb-4">Experience</h1>
            <p className="font-body text-text-secondary max-w-lg">
              My professional journey — each role fetched live from my backend API.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card animate-pulse h-36">
                  <div className="h-5 bg-border rounded w-1/3 mb-3" />
                  <div className="h-4 bg-border rounded w-1/4 mb-4" />
                  <div className="h-3 bg-border rounded w-full mb-2" />
                  <div className="h-3 bg-border rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : experience.length === 0 ? (
            <motion.div variants={fadeUp} className="text-center py-24">
              <Briefcase size={32} className="text-text-muted mx-auto mb-4" />
              <p className="font-mono text-text-muted text-sm">No experience entries yet</p>
            </motion.div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal-400/40 via-border to-transparent hidden md:block" />

              <div className="space-y-6 md:pl-16">
                {experience.map((exp, i) => (
                  <motion.div key={exp.id} variants={slideInLeft} custom={i}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 w-4 h-4 rounded-full border-2 border-teal-400 bg-bg hidden md:flex items-center justify-center" style={{ top: `${i * 180 + 8}px` }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    </div>

                    <div className="card group hover:border-teal-400/30">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-teal-400 transition-colors">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Briefcase size={12} className="text-teal-400" />
                            <span className="font-body text-sm text-text-secondary">{exp.company}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 md:items-end flex-shrink-0">
                          <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
                            <Calendar size={11} />
                            {exp.start_date} — {exp.is_current ? (
                              <span className="text-teal-400">Present</span>
                            ) : exp.end_date}
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
                              <MapPin size={11} />
                              {exp.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {exp.description && (
                        <p className="font-body text-sm text-text-secondary leading-relaxed">
                          {exp.description}
                        </p>
                      )}

                      {exp.is_current && (
                        <div className="mt-4 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                          <span className="font-mono text-xs text-teal-400">Current Role</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
