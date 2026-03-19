import { createContext, useContext, useState, useEffect } from 'react'
import { adminLogin } from '../api/admin'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('admin_token'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = async (username, password) => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminLogin({ username, password })
      localStorage.setItem('admin_token', data.access_token)
      setToken(data.access_token)
      return true
    } catch (err) {
      setError('Invalid username or password')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, loading, error, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)