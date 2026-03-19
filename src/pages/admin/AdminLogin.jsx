import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Terminal, Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(form.username, form.password)
    if (ok) navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-teal-400/10 border border-teal-400/30 flex items-center justify-center">
            <Terminal size={18} className="text-teal-400" />
          </div>
          <div>
            <div className="font-display text-lg font-bold text-text-primary">Admin Panel</div>
            <div className="font-mono text-xs text-text-muted">portfolio.admin</div>
          </div>
        </div>

        <div className="card border-teal-400/20">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={14} className="text-teal-400" />
            <span className="font-mono text-xs text-text-secondary">Secure Login</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono text-xs text-text-muted block mb-2">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                className="w-full bg-bg border border-border rounded-lg px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-teal-400/50 transition-all"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="font-mono text-xs text-text-muted block mb-2">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                className="w-full bg-bg border border-border rounded-lg px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-teal-400/50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="font-mono text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-50"
            >
              {loading ? (
                <span className="w-3 h-3 border border-bg/40 border-t-bg rounded-full animate-spin" />
              ) : (
                <Terminal size={13} />
              )}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}