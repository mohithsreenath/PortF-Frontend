import { Link } from 'react-router-dom'
import { Github, Linkedin, Terminal } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-teal-400" />
          <span className="font-mono text-xs text-text-muted">
            Built with FastAPI + React · Powered by a real backend
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-teal-400 hover:border-teal-400/40 transition-all duration-200"
          >
            <Github size={14} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-teal-400 hover:border-teal-400/40 transition-all duration-200"
          >
            <Linkedin size={14} />
          </a>
          <a
            href="https://portf-backend-flgu.onrender.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-3 py-1.5 rounded-lg border border-teal-400/30 text-teal-400 hover:bg-teal-400/10 transition-all duration-200"
          >
            /docs ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
