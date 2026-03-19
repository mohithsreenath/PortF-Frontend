import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSkills, useCategories } from '../../hooks'
import { createSkill, deleteSkill, createCategory, deleteCategory } from '../../api/admin'
import { Plus, Trash2 } from 'lucide-react'

export default function AdminSkills() {
  const qc = useQueryClient()
  const { data: skills = [] } = useSkills()
  const { data: categories = [] } = useCategories()
  const [newSkill, setNewSkill] = useState({ name: '', level: 3, category_id: '' })
  const [newCat, setNewCat] = useState('')

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['skills'] })
    qc.invalidateQueries({ queryKey: ['categories'] })
  }

  const handleAddSkill = async (e) => {
    e.preventDefault()
    if (!newSkill.name || !newSkill.category_id) return
    await createSkill(newSkill)
    setNewSkill({ name: '', level: 3, category_id: '' })
    refresh()
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!newCat) return
    await createCategory({ name: newCat })
    setNewCat('')
    refresh()
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="section-label">Admin</p>
        <h1 className="font-display text-2xl font-bold text-text-primary mb-6">Skills & Categories</h1>
      </div>

      {/* Categories */}
      <div>
        <h2 className="font-display text-lg font-semibold text-text-primary mb-4">Categories</h2>
        <form onSubmit={handleAddCategory} className="flex gap-3 mb-4">
          <input
            value={newCat}
            onChange={e => setNewCat(e.target.value)}
            placeholder="Category name"
            className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all"
          />
          <button type="submit" className="btn-primary text-xs py-2">
            <Plus size={12} /> Add
          </button>
        </form>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <div key={cat.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface">
              <span className="font-mono text-xs text-text-secondary">{cat.name}</span>
              <button
                onClick={async () => { await deleteCategory(cat.id); refresh() }}
                className="text-text-muted hover:text-red-400 transition-colors"
              >
                <Trash2 size={11} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Skill */}
      <div>
        <h2 className="font-display text-lg font-semibold text-text-primary mb-4">Add Skill</h2>
        <form onSubmit={handleAddSkill} className="card border-teal-400/20">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="font-mono text-xs text-text-muted block mb-1">Skill Name</label>
              <input
                value={newSkill.name}
                onChange={e => setNewSkill(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. FastAPI"
                className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-text-muted block mb-1">Category</label>
              <select
                value={newSkill.category_id}
                onChange={e => setNewSkill(p => ({ ...p, category_id: e.target.value }))}
                className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all"
              >
                <option value="">Select category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-mono text-xs text-text-muted block mb-1">Level (1-5)</label>
              <input
                type="number" min={1} max={5}
                value={newSkill.level}
                onChange={e => setNewSkill(p => ({ ...p, level: parseInt(e.target.value) }))}
                className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all"
              />
            </div>
          </div>
          <button type="submit" className="btn-primary text-xs py-2 mt-4">
            <Plus size={12} /> Add Skill
          </button>
        </form>
      </div>

      {/* Skills list grouped by category */}
      <div>
        <h2 className="font-display text-lg font-semibold text-text-primary mb-4">All Skills</h2>
        <div className="space-y-4">
          {categories.map(cat => {
            const catSkills = skills.filter(s => s.category_id === cat.id)
            if (!catSkills.length) return null
            return (
              <div key={cat.id}>
                <div className="font-mono text-xs text-teal-400 mb-2">{cat.name}</div>
                <div className="flex flex-wrap gap-2">
                  {catSkills.map(skill => (
                    <div key={skill.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface">
                      <span className="font-mono text-xs text-text-secondary">{skill.name}</span>
                      <span className="font-mono text-xs text-text-muted">L{skill.level}</span>
                      <button
                        onClick={async () => { await deleteSkill(skill.id); refresh() }}
                        className="text-text-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}