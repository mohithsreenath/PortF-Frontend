import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Calendar } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '../utils/motion'
import { useBlogs } from '../hooks'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Blogs() {
  const { data: blogs = [], isLoading } = useBlogs()

  return (
    <div className="mesh-bg min-h-screen pt-28 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="mb-16">
            <p className="section-label">Writing</p>
            <h1 className="section-title mb-4">Blog</h1>
            <p className="font-body text-text-secondary max-w-lg">
              Thoughts on backend development, system design, and things I've learned building real systems.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card animate-pulse h-28">
                  <div className="h-5 bg-border rounded w-2/3 mb-3" />
                  <div className="h-3 bg-border rounded w-full mb-2" />
                  <div className="h-3 bg-border rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <motion.div variants={fadeUp} className="text-center py-24">
              <BookOpen size={32} className="text-text-muted mx-auto mb-4" />
              <p className="font-mono text-text-muted text-sm">No posts yet — coming soon</p>
            </motion.div>
          ) : (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
              {blogs.map((blog, i) => (
                <motion.div key={blog.id} variants={scaleIn} custom={i}>
                  <Link to={`/blogs/${blog.slug}`} className="card group block">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={11} className="text-text-muted" />
                          <span className="font-mono text-xs text-text-muted">{formatDate(blog.created_at)}</span>
                        </div>
                        <h2 className="font-display text-lg font-semibold text-text-primary mb-2 group-hover:text-teal-400 transition-colors">
                          {blog.title}
                        </h2>
                        {blog.summary && (
                          <p className="font-body text-sm text-text-secondary line-clamp-2">{blog.summary}</p>
                        )}
                      </div>
                      <ArrowRight size={16} className="text-text-muted group-hover:text-teal-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
