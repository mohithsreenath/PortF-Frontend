import { motion } from 'framer-motion'
import { FolderKanban, Wrench, Briefcase, BookOpen, Mail } from 'lucide-react'
import { useProjects, useSkills, useExperience, useBlogs } from '../../hooks'
import { useQuery } from '@tanstack/react-query'
import { getMessages } from '../../api/admin'

export default function AdminDashboard() {
  const { data: projects = [] } = useProjects()
  const { data: skills = [] } = useSkills()
  const { data: experience = [] } = useExperience()
  const { data: blogs = [] } = useBlogs()
  const { data: messages = [] } = useQuery({ queryKey: ['messages'], queryFn: getMessages })

  const stats = [
    { label: 'Projects', value: projects.length, icon: FolderKanban, to: '/admin/projects' },
    { label: 'Skills', value: skills.length, icon: Wrench, to: '/admin/skills' },
    { label: 'Experience', value: experience.length, icon: Briefcase, to: '/admin/experience' },
    { label: 'Blog Posts', value: blogs.length, icon: BookOpen, to: '/admin/blogs' },
    { label: 'Messages', value: messages.length, icon: Mail, to: '/admin/messages' },
  ]

  return (
    <div>
      <div className="mb-8">
        <p className="section-label">Admin</p>
        <h1 className="font-display text-3xl font-bold text-text-primary">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card text-center"
          >
            <stat.icon size={20} className="text-teal-400 mx-auto mb-3" />
            <div className="font-display text-2xl font-bold text-text-primary">{stat.value}</div>
            <div className="font-mono text-xs text-text-muted mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}