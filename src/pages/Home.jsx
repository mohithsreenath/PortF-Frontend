import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Terminal, Zap, Database, Server } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '../utils/motion'
import { useProjects, useSkills, useCategories } from '../hooks'

// Animated terminal typing effect
function TerminalLine({ text, delay = 0, color = 'text-text-secondary' }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, 35)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <div className={`font-mono text-xs ${color} flex items-center gap-2`}>
      <span className="text-teal-400/50">›</span>
      <span>{displayed}</span>
      {displayed.length < text.length && (
        <span className="w-1.5 h-3.5 bg-teal-400 animate-blink inline-block" />
      )}
    </div>
  )
}

// Floating stat card
function StatCard({ icon: Icon, label, value, delay }) {
  return (
    <motion.div
      variants={scaleIn}
      custom={delay}
      className="card flex items-center gap-3 min-w-[140px]"
    >
      <div className="w-8 h-8 rounded-lg bg-teal-400/10 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-teal-400" />
      </div>
      <div>
        <div className="font-display text-lg font-bold text-text-primary">{value}</div>
        <div className="font-mono text-xs text-text-muted">{label}</div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const { data: projects = [] } = useProjects()
  const { data: skills = [] } = useSkills()
  const { data: categories = [] } = useCategories()
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3)

  return (
    <div className="mesh-bg min-h-screen">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-36 pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left — Text */}
          <div className="space-y-8">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-400/25 bg-teal-400/5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="font-mono text-xs text-teal-400">Available for opportunities</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="space-y-4">
              <h1 className="font-display text-5xl md:text-6xl font-extrabold text-text-primary leading-[1.1] tracking-tight">
                Backend<br />
                <span className="text-teal-400">Engineer</span><br />
                & Builder
              </h1>
              <p className="font-body text-base text-text-secondary leading-relaxed max-w-md">
                I build scalable backend systems with FastAPI, PostgreSQL, and clean API architecture.
                This portfolio itself is powered by a real backend — not a static site.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-3">
              <Link to="/projects" className="btn-primary">
                View Projects <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="btn-outline">
                Get in touch
              </Link>
              <a
                href="https://portf-backend-flgu.onrender.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Terminal size={12} />
                Live API
              </a>
            </motion.div>

            <motion.div variants={fadeUp} custom={3} className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="text-text-muted hover:text-teal-400 transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="text-text-muted hover:text-teal-400 transition-colors">
                <Linkedin size={18} />
              </a>
              <span className="w-px h-4 bg-border" />
              <span className="font-mono text-xs text-text-muted">Mohith Sreenath</span>
            </motion.div>
          </div>

          {/* Right — Terminal card */}
          <motion.div variants={fadeUp} custom={2} className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-2xl bg-teal-400/5 blur-xl animate-glow-pulse" />

            <div className="relative card border-teal-400/20 overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <span className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-xs text-text-muted ml-2">portfolio-api ~ bash</span>
              </div>

              {/* Terminal output */}
              <div className="space-y-3">
                <TerminalLine text="GET /projects → 200 OK" delay={300} color="text-green-400" />
                <TerminalLine text="GET /skills → 200 OK" delay={1200} color="text-green-400" />
                <TerminalLine text="GET /experience → 200 OK" delay={2100} color="text-green-400" />
                <TerminalLine text="POST /contact → 201 Created" delay={3000} color="text-teal-400" />
                <TerminalLine text="Auth: JWT verified ✓" delay={3900} color="text-yellow-400" />
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="font-mono text-xs text-text-muted">Stack:</div>
                  <div className="flex flex-wrap gap-2">
                    {['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Render', 'Supabase'].map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-20 flex flex-wrap gap-4"
        >
          <StatCard icon={Server} label="APIs Built" value={`${['skills','categories','projects','experience','blogs','contact','admin'].length}+`} delay={0} />
          <StatCard icon={Database} label="DB Tables" value={`${['tech_categories','skills','projects','project_skills','experience','blogs','contact_messages','admins'].length}`} delay={1} />
          <StatCard icon={Zap} label="Projects" value={projects.length || '—'} delay={2} />
          <StatCard icon={Terminal} label="Skills" value={skills.length || '—'} delay={3} />
        </motion.div>
      </section>

      {/* Featured Projects Preview */}
      {featuredProjects.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="flex items-center justify-between mb-10">
              <div>
                <p className="section-label">Featured Work</p>
                <h2 className="section-title">Selected Projects</h2>
              </div>
              <Link to="/projects" className="btn-outline text-xs hidden md:flex">
                All Projects <ArrowRight size={12} />
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {featuredProjects.map((project, i) => (
                <motion.div key={project.id} variants={scaleIn} custom={i}>
                  <Link to={`/projects/${project.slug}`} className="card group block h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-teal-400/10 border border-teal-400/20 flex items-center justify-center">
                        <Terminal size={16} className="text-teal-400" />
                      </div>
                      <ArrowRight size={14} className="text-text-muted group-hover:text-teal-400 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-text-primary mb-2 group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs text-text-secondary line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.skills?.slice(0, 3).map(s => (
                        <span key={s.id} className="tag">{s.name}</span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-6 md:hidden">
              <Link to="/projects" className="btn-outline w-full justify-center">
                All Projects <ArrowRight size={12} />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Skills preview */}
      {categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <p className="section-label">Tech Stack</p>
              <h2 className="section-title">Skills & Tools</h2>
            </motion.div>

            <div className="space-y-6">
              {categories.map((cat, i) => {
                const catSkills = skills.filter(s => s.category_id === cat.id)
                if (!catSkills.length) return null
                return (
                  <motion.div key={cat.id} variants={fadeUp} custom={i} className="flex gap-6 items-start">
                    <div className="font-mono text-xs text-text-muted w-28 flex-shrink-0 pt-1">{cat.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {catSkills.map(skill => (
                        <span key={skill.id} className="tag">{skill.name}</span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  )
}
