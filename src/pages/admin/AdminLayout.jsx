import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, FolderKanban, Wrench,
  Briefcase, BookOpen, Mail, LogOut, Terminal
} from 'lucide-react'

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/admin/skills', icon: Wrench, label: 'Skills' },
  { to: '/admin/experience', icon: Briefcase, label: 'Experience' },
  { to: '/admin/blogs', icon: BookOpen, label: 'Blogs' },
  { to: '/admin/messages', icon: Mail, label: 'Messages' },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border flex flex-col fixed h-full">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <Terminal size={16} className="text-teal-400" />
          <span className="font-mono text-sm text-text-primary">
            <span className="text-teal-400">~/</span>admin
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-xs transition-all duration-200 ${
                  isActive
                    ? 'bg-teal-400/10 text-teal-400 border border-teal-400/20'
                    : 'text-text-secondary hover:text-text-primary hover:bg-border/50'
                }`
              }
            >
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-xs text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-56 p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}