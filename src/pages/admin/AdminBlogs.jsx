import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useBlogs } from '../../hooks'
import { createBlog, updateBlog, deleteBlog } from '../../api/admin'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'

const empty = { title: '', slug: '', summary: '', content: '', published: false }

function BlogForm({ initial = empty, onSave, onCancel }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  // Auto generate slug from title
  const handleTitleChange = (v) => {
    set('title', v)
    if (!initial.slug) {
      set('slug', v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
    }
  }

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form) }} className="card border-teal-400/20 space-y-4 mb-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-xs text-text-muted block mb-1">Title</label>
          <input value={form.title} onChange={e => handleTitleChange(e.target.value)}
            placeholder="Blog post title"
            className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all" />
        </div>
        <div>
          <label className="font-mono text-xs text-text-muted block mb-1">Slug</label>
          <input value={form.slug} onChange={e => set('slug', e.target.value)}
            placeholder="blog-post-slug"
            className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all" />
        </div>
      </div>
      <div>
        <label className="font-mono text-xs text-text-muted block mb-1">Summary</label>
        <input value={form.summary} onChange={e => set('summary', e.target.value)}
          placeholder="Short summary shown in blog list"
          className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all" />
      </div>
      <div>
        <label className="font-mono text-xs text-text-muted block mb-1">Content</label>
        <textarea value={form.content} onChange={e => set('content', e.target.value)}
          rows={10} placeholder="Write your blog post here..."
          className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-primary focus:outline-none focus:border-teal-400/50 transition-all resize-none" />
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" id="published" checked={form.published}
          onChange={e => set('published', e.target.checked)} className="accent-teal-400" />
        <label htmlFor="published" className="font-mono text-xs text-text-secondary">Published (visible on portfolio)</label>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="btn-primary text-xs py-2"><Check size={12} /> Save</button>
        <button type="button" onClick={onCancel} className="btn-outline text-xs py-2"><X size={12} /> Cancel</button>
      </div>
    </form>
  )
}

export default function AdminBlogs() {
  const qc = useQueryClient()
  const { data: blogs = [] } = useBlogs()
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const refresh = () => qc.invalidateQueries({ queryKey: ['blogs'] })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="font-display text-2xl font-bold text-text-primary">Blogs</h1>
        </div>
        <button onClick={() => setAdding(true)} className="btn-primary text-xs py-2">
          <Plus size={12} /> New Post
        </button>
      </div>

      {adding && <BlogForm onSave={async (f) => { await createBlog(f); refresh(); setAdding(false) }} onCancel={() => setAdding(false)} />}

      <div className="space-y-3">
        {blogs.map(blog => (
          <div key={blog.id}>
            {editing?.id === blog.id ? (
              <BlogForm initial={blog} onSave={async (f) => { await updateBlog(blog.id, f); refresh(); setEditing(null) }} onCancel={() => setEditing(null)} />
            ) : (
              <div className="card flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display text-sm font-semibold text-text-primary">{blog.title}</span>
                    <span className={`font-mono text-xs px-2 py-0.5 rounded-full border ${blog.published ? 'text-teal-400 border-teal-400/30 bg-teal-400/10' : 'text-text-muted border-border'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-text-muted">{blog.summary}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(blog)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:text-teal-400 hover:border-teal-400/40 transition-all">
                    <Pencil size={13} />
                  </button>
                  <button onClick={async () => { if (!confirm('Delete?')) return; await deleteBlog(blog.id); refresh() }} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:text-red-400 hover:border-red-400/40 transition-all">
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