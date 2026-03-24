import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Terminal, Zap, Database, Server, CheckCircle } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '../utils/motion'
import { useProjects, useSkills, useCategories } from '../hooks'

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

function StatCard({ icon: Icon, label, value, delay }) {
  return (
    <motion.div variants={scaleIn} custom={delay} className="card flex items-center gap-3 min-w-[140px]">
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

const trustItems = [
  'AI/ML-powered search & recommendations',
  'Real-time IoT data ingestion',
  'Payment gateway integrations',
  'OTP & authentication systems',
  'Microservices architecture',
]

const whatIDo = [
  'AI-powered platforms',
  'Real-time data pipelines',
  'Scalable web & mobile APIs',
]

export default function Home() {
  const { data: projects = [] } = useProjects()
  const { data: skills = [] } = useSkills()
  const { data: categories = [] } = useCategories()
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3)

  return (
    <div className="mesh-bg min-h-screen">

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-36 pb-24">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
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
                Specializing in high-performance FastAPI systems. I build scalable microservices
                powering AI-driven platforms, real-time data systems, and production-grade applications.
              </p>
            </motion.div>

            {/* Proof bullets */}
            <motion.div variants={fadeUp} custom={2} className="grid grid-cols-2 gap-2">
              {[
                '7+ APIs in production',
                'Microservices architecture',
                'AI/ML integrations',
                'Payments & OTP systems',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-teal-400 flex-shrink-0" />
                  <span className="font-mono text-xs text-text-secondary">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* What I do strip */}
            <motion.div variants={fadeUp} custom={2} className="border-l-2 border-teal-400/40 pl-4 space-y-1">
              <div className="font-mono text-xs text-text-muted mb-2">I design & build backend systems for:</div>
              {whatIDo.map(item => (
                <div key={item} className="flex items-center gap-2 font-mono text-xs text-text-secondary">
                  <span className="text-teal-400">→</span> {item}
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
              <Link to="/projects" className="btn-primary">
                View Projects <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="btn-outline">Get in touch</Link>
              <a href="https://portf-backend-flgu.onrender.com/docs" target="_blank"
                rel="noopener noreferrer" className="btn-outline">
                <Terminal size={12} /> Live API
              </a>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex items-center gap-4">
              <a href="https://github.com/mohithsreenath" target="_blank" rel="noopener noreferrer"
                className="text-text-muted hover:text-teal-400 transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/mohithsreenath" target="_blank" rel="noopener noreferrer"
                className="text-text-muted hover:text-teal-400 transition-colors">
                <Linkedin size={18} />
              </a>
              <span className="w-px h-4 bg-border" />
              <span className="font-mono text-xs text-text-muted">Mohith Sreenath · Bangalore</span>
            </motion.div>
          </div>

          {/* Right — Terminal */}
          <motion.div variants={fadeUp} custom={2} className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-teal-400/5 blur-xl animate-glow-pulse" />
            <div className="relative card border-teal-400/20 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <span className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-xs text-text-muted ml-2">portfolio-api ~ bash</span>
              </div>
              <div className="space-y-3">
                <TerminalLine text="GET /projects → 200 OK" delay={300} color="text-green-400" />
                <TerminalLine text="GET /skills → 200 OK" delay={1200} color="text-green-400" />
                <TerminalLine text="GET /experience → 200 OK" delay={2100} color="text-green-400" />
                <TerminalLine text="POST /contact → 201 Created" delay={3000} color="text-teal-400" />
                <TerminalLine text="Auth: JWT verified ✓" delay={3900} color="text-yellow-400" />
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="font-mono text-xs text-text-muted">Stack:</div>
                  <div className="flex flex-wrap gap-2">
                    {['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'JWT', 'Render'].map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible"
          className="mt-20 flex flex-wrap gap-4">
          <StatCard icon={Server} label="APIs in Production" value="7+" delay={0} />
          <StatCard icon={Database} label="DB Tables" value="8" delay={1} />
          <StatCard icon={Zap} label="Projects" value={projects.length || '4+'} delay={2} />
          <StatCard icon={Terminal} label="Skills" value={skills.length || '20+'} delay={3} />
        </motion.div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="border-y border-border bg-surface/30">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <motion.div initial="hidden" whileInView="visible"
            viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="font-mono text-xs text-text-muted mb-6 text-center">
              Worked on production systems involving:
            </motion.div>
            <div className="flex flex-wrap justify-center gap-4">
              {trustItems.map((item, i) => (
                <motion.div key={item} variants={scaleIn} custom={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg">
                  <CheckCircle size={12} className="text-teal-400" />
                  <span className="font-mono text-xs text-text-secondary">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      {featuredProjects.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-24">
          <motion.div initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="flex items-center justify-between mb-10">
              <div>
                <p className="section-label">Featured Work</p>
                <h2 className="section-title">Production Systems</h2>
              </div>
              <Link to="/projects" className="btn-outline text-xs hidden md:flex">
                All Projects <ArrowRight size={12} />
              </Link>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {featuredProjects.map((project, i) => (
                <motion.div key={project.id} variants={scaleIn} custom={i}>
                  <Link to={`/projects`} className="card group block h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-teal-400/10 border border-teal-400/20 flex items-center justify-center">
                          <Terminal size={14} className="text-teal-400" />
                        </div>
                        <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-teal-400/10 text-teal-400 border border-teal-400/20">
                          Production
                        </span>
                      </div>
                      <ArrowRight size={14} className="text-text-muted group-hover:text-teal-400 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-text-primary mb-2 group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs text-text-secondary line-clamp-3 mb-4">
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
          </motion.div>
        </section>
      )}

      {/* ── ENGINEERING APPROACH ── */}
      <section className="border-t border-border bg-surface/20">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-12">
              <p className="section-label">Philosophy</p>
              <h2 className="section-title">Engineering Approach</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Microservices Architecture', desc: 'Modular, independently deployable services with clear API contracts for scalability and maintainability.' },
                { title: 'Async-First APIs', desc: 'High-performance async processing using FastAPI and asyncpg for maximum throughput under load.' },
                { title: 'Structured Validation', desc: 'Pydantic-based request/response validation with comprehensive error handling across all endpoints.' },
                { title: 'DB Performance', desc: 'Query optimization, indexing strategies, and ORM-level tuning using SQLAlchemy 2.x.' },
                { title: 'Secure Auth Systems', desc: 'JWT/OAuth2 authentication with OTP flows, session management, and role-based access control.' },
                { title: 'External Integrations', desc: 'Fault-tolerant integrations with payment gateways, CRM systems, and third-party APIs.' },
              ].map((item, i) => (
                <motion.div key={item.title} variants={scaleIn} custom={i} className="card">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mb-3" />
                  <h3 className="font-display text-sm font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="font-body text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* API flow */}
            <motion.div variants={fadeUp} className="mt-10 card border-teal-400/20">
              <div className="font-mono text-xs text-teal-400 mb-4">System Flow</div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                {['Client', 'API Gateway', 'Service Layer', 'PostgreSQL', 'External APIs'].map((step, i, arr) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg border border-border bg-bg text-text-secondary">{step}</span>
                    {i < arr.length - 1 && <span className="text-teal-400">→</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS PREVIEW ── */}
      {categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-24">
          <motion.div initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-4">
              <p className="section-label">Technologies</p>
              <h2 className="section-title mb-2">Skills & Tools</h2>
              <p className="font-mono text-xs text-text-muted">Technologies I use in production</p>
            </motion.div>
            <div className="mt-8 space-y-5">
              {categories.map((cat, i) => {
                const catSkills = skills.filter(s => s.category_id === cat.id)
                if (!catSkills.length) return null
                return (
                  <motion.div key={cat.id} variants={fadeUp} custom={i} className="flex gap-6 items-start">
                    <div className="font-mono text-xs text-text-muted w-32 flex-shrink-0 pt-1">{cat.name}</div>
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

      {/* ── CURRENT FOCUS ── */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div initial="hidden" whileInView="visible"
            viewport={{ once: true }} variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <motion.div variants={fadeUp}>
              <p className="section-label">Currently Exploring</p>
              <div className="flex flex-wrap gap-3 mt-3">
                {['System design at scale', 'AI-integrated backend workflows', 'Performance optimization'].map(item => (
                  <span key={item} className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border border-border text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="flex-shrink-0">
              <Link to="/contact" className="btn-primary">
                Let's build something scalable <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}