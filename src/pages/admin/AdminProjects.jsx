import { useState } from 'react'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { getProjects } from '../../api/projects'
import { createProject, updateProject, deleteProject } from '../../api/admin'
import { useSkills } from '../../hooks'
import { Plus, Pencil, Trash2, X, Check, FolderKanban } from 'lucide-react'

function ProjectForm({ initial = {}, skills = [], onSave, onCancel }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    slug: initial.slug || '',
    description: initial.description || '',
    github_url: initial.github_url || '',
    live_url: initial.live_url || '',
    image_url: initial.image_url || '',
    featured: initial.featured || false,
    skill_ids: initial.skills?.map(s => s.id) || [],
  })

  const toggleSkill = (id) => {
    setForm(p => ({
      ...p,
      skill_ids: p.skill_ids.includes(id)
        ? p.skill_ids.filter(s => s !== id)
        : [...p.skill_ids, id]
    }))
  }

  // Auto generate slug from title only when creating new
  const handleTitleChange = (v) => {
    setForm(p => ({
      ...p,
      title: v,
      slug: initial.slug ? p.slug : v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    }))
  }

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form) }}
      className="card border-teal-400/20 space-y-4 mb-6">
      <div className="font-mono text-xs text-teal-400 mb-2">
        {initial.id ? 'Edit Project' : 'New Project'}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-xs text-text-muted block mb-1">Title *</label>
          <input
            value={form.title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="Project name"
            required
            className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all"
          />
        </div>
        <div>
          <label className="font-mono text-xs text-text-muted block mb-1">Slug *</label>
          <input
            value={form.slug}
            onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
            placeholder="project-slug"
            required
            className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all"
          />
        </div>
        <div>
          <label className="font-mono text-xs text-text-muted block mb-1">GitHub URL</label>
          <input
            value={form.github_url}
            onChange={e => setForm(p => ({ ...p, github_url: e.target.value }))}
            placeholder="https://github.com/..."
            className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all"
          />
        </div>
        <div>
          <label className="font-mono text-xs text-text-muted block mb-1">Live URL</label>
          <input
            value={form.live_url}
            onChange={e => setForm(p => ({ ...p, live_url: e.target.value }))}
            placeholder="https://..."
            className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all"
          />
        </div>
        <div>
          <label className="font-mono text-xs text-text-muted block mb-1">Image URL</label>
          <input
            value={form.image_url}
            onChange={e => setForm(p => ({ ...p, image_url: e.target.value }))}
            placeholder="https://..."
            className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 pt-5">
          <input
            type="checkbox"
            id="featured"
            checked={form.featured}
            onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))}
            className="accent-teal-400 w-4 h-4"
          />
          <label htmlFor="featured" className="font-mono text-xs text-text-secondary">
            Featured on homepage
          </label>
        </div>
      </div>

      <div>
        <label className="font-mono text-xs text-text-muted block mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          rows={3}
          placeholder="Project description..."
          className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all resize-none"
        />
      </div>

      {skills.length > 0 && (
        <div>
          <label className="font-mono text-xs text-text-muted block mb-2">
            Skills ({form.skill_ids.length} selected)
          </label>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleSkill(s.id)}
                className={`font-mono text-xs px-2.5 py-1 rounded-md border transition-all ${
                  form.skill_ids.includes(s.id)
                    ? 'bg-teal-400/20 text-teal-400 border-teal-400/40'
                    : 'bg-transparent text-text-muted border-border hover:border-teal-400/30'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary text-xs py-2">
          <Check size={12} /> Save Project
        </button>
        <button type="button" onClick={onCancel} className="btn-outline text-xs py-2">
          <X size={12} /> Cancel
        </button>
      </div>
    </form>
  )
}

export default function AdminProjects() {
  const qc = useQueryClient()
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => getProjects()
  })
  const { data: skills = [] } = useSkills()
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['admin-projects'] })
    qc.invalidateQueries({ queryKey: ['projects'] })
  }

  const handleCreate = async (form) => {
    try {
      await createProject(form)
      refresh()
      setAdding(false)
    } catch (e) {
      alert('Error creating project: ' + (e.response?.data?.detail || e.message))
    }
  }

  const handleUpdate = async (form) => {
    try {
      await updateProject(editing.id, form)
      refresh()
      setEditing(null)
    } catch (e) {
      alert('Error updating project: ' + (e.response?.data?.detail || e.message))
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return
    try {
      await deleteProject(id)
      refresh()
    } catch (e) {
      alert('Error deleting project')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="font-display text-2xl font-bold text-text-primary">
            Projects
            <span className="ml-3 font-mono text-sm text-text-muted">({projects.length})</span>
          </h1>
        </div>
        {!adding && (
          <button onClick={() => { setEditing(null); setAdding(true) }} className="btn-primary text-xs py-2">
            <Plus size={12} /> Add Project
          </button>
        )}
      </div>

      {/* Add form */}
      {adding && (
        <ProjectForm
          skills={skills}
          onSave={handleCreate}
          onCancel={() => setAdding(false)}
        />
      )}

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse h-20" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && projects.length === 0 && !adding && (
        <div className="text-center py-20">
          <FolderKanban size={32} className="text-text-muted mx-auto mb-3" />
          <p className="font-mono text-text-muted text-sm mb-4">No projects yet</p>
          <button onClick={() => setAdding(true)} className="btn-primary text-xs py-2">
            <Plus size={12} /> Add your first project
          </button>
        </div>
      )}

      {/* Projects list */}
      <div className="space-y-3">
        {projects.map(project => (
          <div key={project.id}>
            {editing?.id === project.id ? (
              <ProjectForm
                initial={project}
                skills={skills}
                onSave={handleUpdate}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <div className="card flex items-start justify-between gap-4 group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-display text-sm font-semibold text-text-primary">
                      {project.title}
                    </span>
                    {project.featured && (
                      <span className="tag text-xs">Featured</span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-text-muted line-clamp-1 mb-2">
                    {project.description || 'No description'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills?.map(s => (
                      <span key={s.id} className="tag">{s.name}</span>
                    ))}
                    {project.skills?.length === 0 && (
                      <span className="font-mono text-xs text-text-muted">No skills linked</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => { setAdding(false); setEditing(project) }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:text-teal-400 hover:border-teal-400/40 transition-all"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:text-red-400 hover:border-red-400/40 transition-all"
                  >
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