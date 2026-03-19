import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/admin/ProtectedRoute'

// Public layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Public pages
import Home from './pages/Home'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'

// Admin pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProjects from './pages/admin/AdminProjects'
import AdminSkills from './pages/admin/AdminSkills'
import AdminExperience from './pages/admin/AdminExperience'
import AdminBlogs from './pages/admin/AdminBlogs'
import AdminMessages from './pages/admin/AdminMessages'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
})

function PublicLayout() {
  const location = useLocation()
  return (
    <div className="noise-bg">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            {/* Admin routes — no navbar/footer */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="skills" element={<AdminSkills />} />
              <Route path="experience" element={<AdminExperience />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="messages" element={<AdminMessages />} />
            </Route>

            {/* Public routes — with navbar/footer */}
            <Route path="/*" element={<PublicLayout />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}