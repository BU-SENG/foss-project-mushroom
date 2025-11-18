import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

// Auth context to provide auth state across the app
const AuthContext = createContext(null)

/**
 * AuthProvider - wraps app and keeps auth state
 * Exposes: user (profile object or null), role (string|null), loading (bool), login, logout
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch profile row from `profiles` table by user id
  async function fetchProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('id', userId)
        .single()

      if (error) {
        // If profile not found, clear profile state but keep auth user
        setRole(null)
        setUser((u) => (u ? { ...u, profile: null } : null))
        return null
      }

      setRole(data.role || null)
      setUser((u) => ({ ...(u || {}), profile: data }))
      return data
    } catch (err) {
      setRole(null)
      setUser((u) => (u ? { ...u, profile: null } : null))
      return null
    }
  }

  // Initialize auth state on mount and subscribe to changes
  useEffect(() => {
    let mounted = true

    async function init() {
      setLoading(true)
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession()

        if (session?.user) {
          // base user object
          const baseUser = { id: session.user.id, email: session.user.email }
          if (!mounted) return
          setUser(baseUser)
          await fetchProfile(session.user.id)
        } else {
          setUser(null)
          setRole(null)
        }
      } catch (err) {
        // keep silent; no console errors required by acceptance
        setUser(null)
        setRole(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    init()

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // event examples: 'SIGNED_IN', 'SIGNED_OUT', etc.
        if (session?.user) {
          const baseUser = { id: session.user.id, email: session.user.email }
          setUser(baseUser)
          await fetchProfile(session.user.id)
        } else {
          setUser(null)
          setRole(null)
        }
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      if (subscription?.unsubscribe) subscription.unsubscribe()
    }
  }, [])

  // login using email/password; returns { error, data }
  async function login(email, password) {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { error }

      // on success, session listener will fetch profile
      return { data }
    } catch (err) {
      return { error: err }
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      setUser(null)
      setRole(null)
      return { error: null }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    role,
    loading,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook consumers should call useAuth() to access auth state and actions
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

// Also export default AuthProvider for convenience
export default AuthProvider
