// React imports and Supabase client
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../utils/supabase";

// Create a Context to provide auth state to the app
const AuthContext = createContext(null);

/**
 * AuthProvider
 * Wrap your application with this provider so child components can access
 * `useAuth()` to get the current user, profile, role and auth actions.
 */
export function AuthProvider({ children }) {
  // Local state managed by the provider
  const [user, setUser] = useState(null); // Supabase auth user object
  const [profile, setProfile] = useState(null); // Row from `profiles` table
  const [role, setRole] = useState(null); // Convenience shorthand for profile.role
  const [loading, setLoading] = useState(true); // Loading state while we check session or perform actions

  /**
   * fetchProfile
   * Query the `profiles` table for the given user id and update local state.
   * Returns the profile data or null on failure.
   */
  const fetchProfile = useCallback(async (userId) => {
    if (!userId) return null;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, role")
        .eq("id", userId)
        .single();
      if (error) return null;
      setProfile(data || null);
      setRole(data?.role || null);
      return data;
    } catch (err) {
      return null;
    }
  }, []);

  /**
   * On mount: check for an existing session (persists across refreshes)
   * and subscribe to auth state changes to keep `user` in sync.
   */
  useEffect(() => {
    let mounted = true;

    // Immediately check session to restore auth on page load
    (async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        if (!mounted) return;
        setUser(currentUser);
        if (currentUser) await fetchProfile(currentUser.id);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    // Subscribe to auth changes (login, logout, token refresh)
    const { data: { subscription } = {} } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          // Fetch associated profile when a user becomes available
          await fetchProfile(currentUser.id);
        } else {
          // Clear profile when logged out
          setProfile(null);
          setRole(null);
        }
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      mounted = false;
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, [fetchProfile]);

  /**
   * register
   * Create a new auth user (Supabase) and insert an initial `profiles` row.
   * Accepts an object with `email`, `password`, optional `full_name`, and `role`.
   */
  const register = async ({ email, password, full_name = null, role = "student" }) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setLoading(false);
        return { error };
      }
      const userId = data?.user?.id ?? null;
      if (userId) {
        // Create a profile row tied to the auth user id
        await supabase.from("profiles").insert([{ id: userId, full_name, role }]);
        await fetchProfile(userId);
      }
      setLoading(false);
      return { data };
    } catch (err) {
      setLoading(false);
      return { error: err };
    }
  };

  /**
   * login
   * Sign a user in using email & password. On success, fetch the profile.
   */
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setLoading(false);
        return { error };
      }
      const userId = data?.user?.id ?? null;
      if (userId) await fetchProfile(userId);
      setLoading(false);
      return { data };
    } catch (err) {
      setLoading(false);
      return { error: err };
    }
  };

  /**
   * logout
   * Sign the user out and clear local auth/profile state.
   */
  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  // Value exposed to consumers of the AuthContext
  const value = {
    user,
    profile,
    role,
    loading,
    register,
    login,
    logout,
    fetchProfile,
  };

  // Provide the auth value to the component tree
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth
 * Hook for consuming auth context. Throws if used outside the provider.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined || ctx === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export default useAuth;
