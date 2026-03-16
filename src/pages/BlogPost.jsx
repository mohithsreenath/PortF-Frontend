import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar } from 'lucide-react'
import { fadeUp, staggerContainer } from '../utils/motion'
import { useBlog } from '../hooks'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BlogPost() {
  const { slug } = useParams()
  const { data: blog, isLoading, isError } = useBlog(slug)

  if (isLoading) {
    return (
      <div className="mesh-bg min-h-screen pt-28 pb-32">
        <div className="max-w-2xl mx-auto px-6 animate-pulse">
          <div className="h-4 bg-border rounded w-24 mb-8" />
          <div className="h-10 bg-border rounded w-3/4 mb-4" />
          <div className="h-4 bg-border rounded w-1/4 mb-12" />
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-3 bg-border rounded" style={{ width: `${75 + Math.random() * 25}%` }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError || !blog) {
    return (
      <div className="mesh-bg min-h-screen pt-28 pb-32 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-text-muted text-sm mb-4">Post not found</p>
          <Link to="/blogs" className="btn-outline text-xs">← Back to Blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mesh-bg min-h-screen pt-28 pb-32">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <Link to="/blogs" className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-teal-400 transition-colors mb-10">
              <ArrowLeft size={12} /> Back to Blog
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={11} className="text-text-muted" />
              <span className="font-mono text-xs text-text-muted">{formatDate(blog.created_at)}</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-text-primary leading-tight mb-4">
              {blog.title}
            </h1>
            {blog.summary && (
              <p className="font-body text-base text-text-secondary leading-relaxed">
                {blog.summary}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeUp} custom={2}>
            <div className="w-full h-px bg-gradient-to-r from-teal-400/40 via-border to-transparent mb-12" />
            <div className="font-body text-text-secondary leading-relaxed whitespace-pre-wrap text-sm">
              {blog.content}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
