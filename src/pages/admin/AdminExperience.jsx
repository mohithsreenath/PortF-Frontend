import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useExperience } from '../../hooks'
import { createExperience, updateExperience, deleteExperience } from '../../api/admin'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'

const empty = { company: '', role: '', location: '', description: '', start_date: '', end_date: '', is_current: false }

function ExpForm({ initial = empty, onSave, onCancel }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form) }} className="card border-teal-400/20 space-y-4 mb-4">
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { key: 'company', label: 'Company', placeholder: 'Company name' },
          { key: 'role', label: 'Role', placeholder: 'Job title' },
          { key: 'location', label: 'Location', placeholder: 'City, Country' },
          { key: 'start_date', label: 'Start Date', placeholder: 'Jan 2024' },
          { key: 'end_date', label: 'End Date', placeholder: 'Dec 2024 (leave empty if current)' },
        ].map(f => (
          <div key={f.key}>
            <label className="font-mono text-xs text-text-muted block mb-1">{f.label}</label>
            <input
              value={form[f.key]}
              onChange={e => set(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all"
            />
          </div>
        ))}
        <div className="flex items-center gap-3 pt-5">
          <input type="checkbox" id="is_current" checked={form.is_current}
            onChange={e => set('is_current', e.target.checked)} className="accent-teal-400" />
          <label htmlFor="is_current" className="font-mono text-xs text-text-secondary">Current Role</label>
        </div>
      </div>
      <div>
        <label className="font-mono text-xs text-text-muted block mb-1">Description</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)}
          rows={3} placeholder="Role description..."
          className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all resize-none" />
      </div>
      <div className="flex gap-3">
        <button type="submit" className="btn-primary text-xs py-2"><Check size={12} /> Save</button>
        <button type="button" onClick={onCancel} className="btn-outline text-xs py-2"><X size={12} /> Cancel</button>
      </div>
    </form>
  )
}

export default function AdminExperience() {
  const qc = useQueryClient()
  const { data: experience = [] } = useExperience()
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const refresh = () => qc.invalidateQueries({ queryKey: ['experience'] })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="font-display text-2xl font-bold text-text-primary">Experience</h1>
        </div>
        <button onClick={() => setAdding(true)} className="btn-primary text-xs py-2">
          <Plus size={12} /> Add
        </button>
      </div>

      {adding && <ExpForm onSave={async (f) => { await createExperience(f); refresh(); setAdding(false) }} onCancel={() => setAdding(false)} />}

      <div className="space-y-3">
        {experience.map(exp => (
          <div key={exp.id}>
            {editing?.id === exp.id ? (
              <ExpForm initial={exp} onSave={async (f) => { await updateExperience(exp.id, f); refresh(); setEditing(null) }} onCancel={() => setEditing(null)} />
            ) : (
              <div className="card flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-sm font-semibold text-text-primary">{exp.role}</div>
                  <div className="font-mono text-xs text-teal-400">{exp.company}</div>
                  <div className="font-mono text-xs text-text-muted mt-1">{exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(exp)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:text-teal-400 hover:border-teal-400/40 transition-all">
                    <Pencil size={13} />
                  </button>
                  <button onClick={async () => { if (!confirm('Delete?')) return; await deleteExperience(exp.id); refresh() }} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:text-red-400 hover:border-red-400/40 transition-all">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}