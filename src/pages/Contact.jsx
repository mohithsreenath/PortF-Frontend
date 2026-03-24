import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Github, Linkedin, Terminal, CheckCircle, AlertCircle } from 'lucide-react'
import { fadeUp, staggerContainer } from '../utils/motion'
import { sendMessage } from '../api/contact'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('loading')
    try {
      await sendMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mesh-bg min-h-screen pt-28 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="mb-16">
            <p className="section-label">Say Hello</p>
            <h1 className="section-title mb-4">Get In Touch</h1>
            <p className="font-body text-text-secondary max-w-lg">
  Open to backend engineering roles and impactful projects.
  Specializing in FastAPI, Microservices, and AI-integrated systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div variants={fadeUp} custom={1} className="md:col-span-3">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card border-teal-400/30 text-center py-16"
                >
                  <CheckCircle size={40} className="text-teal-400 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-text-primary mb-2">Message Sent!</h3>
                  <p className="font-body text-sm text-text-secondary mb-6">
                    Your message has been saved to my database. I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-outline text-xs mx-auto"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                    { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="font-mono text-xs text-text-muted block mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key]}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-teal-400/50 focus:bg-teal-400/5 transition-all duration-200"
                        required
                      />
                    </div>
                  ))}

                  <div>
                    <label className="font-mono text-xs text-text-muted block mb-2">Message</label>
                    <textarea
                      placeholder="What's on your mind?"
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={5}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-teal-400/50 focus:bg-teal-400/5 transition-all duration-200 resize-none"
                      required
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
                      <AlertCircle size={12} />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-3 h-3 border border-bg/40 border-t-bg rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Sidebar info */}
            <motion.div variants={fadeUp} custom={2} className="md:col-span-2 space-y-6">
              <div className="card">
                <div className="font-mono text-xs text-teal-400 mb-3">How this works</div>
                <div className="space-y-2">
                  {[
                    'Form submits to POST /contact',
                    'Message saved to PostgreSQL',
                    'I read it via admin API',
                    'Reply comes to your email',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-mono text-xs text-teal-400 mt-0.5">{i + 1}.</span>
                      <span className="font-body text-xs text-text-secondary">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card space-y-3">
                <div className="font-mono text-xs text-teal-400 mb-1">Links</div>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-teal-400 transition-colors">
                  <Github size={15} />
                  <span className="font-body text-sm">GitHub</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-teal-400 transition-colors">
                  <Linkedin size={15} />
                  <span className="font-body text-sm">LinkedIn</span>
                </a>
                <a href="https://portf-backend-flgu.onrender.com/docs" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-teal-400 transition-colors">
                  <Terminal size={15} />
                  <span className="font-body text-sm">API Docs</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
