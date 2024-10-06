import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  username: string
  role: 'admin' | 'customer'
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = async (username: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    // Dummy authentication logic
    if (username === 'admin' && password === 'password') {
      setUser({ id: '1', username: 'admin', role: 'admin' })
    } else if (username === 'customer' && password === 'password') {
      setUser({ id: '2', username: 'customer', role: 'customer' })
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const logout = () => {
    setUser(null)
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}