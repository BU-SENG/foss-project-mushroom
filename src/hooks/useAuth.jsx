import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "../utils/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from DB
  const fetchProfile = useCallback(async (userId) => {
    if (!userId) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", userId)
      .single();

    if (error) return null;

    setProfile(data);
    setRole(data.role || null);
    return data;
  }, []);

  // Sync session + auth state changes
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data?.session?.user || null;

      if (mounted) {
        setUser(currentUser);
        if (currentUser) await fetchProfile(currentUser.id);
        setLoading(false);
      }
    };

    init();

    const { data: { subscription } = {} } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);

        if (currentUser) {
          await fetchProfile(currentUser.id);
        } else {
          setProfile(null);
          setRole(null);
        }

        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, [fetchProfile]);

  // Register
  // const register = async ({
  //   email,
  //   password,
  //   full_name = null,
  //   role = "student",
  // }) => {
  //   setLoading(true);
  //   const { data, error } = await supabase.auth.signUp({ email, password });

  //   if (error) {
  //     setLoading(false);
  //     return { error };
  //   }

  //   const userId = data?.user?.id;

  //   if (userId) {
  //     await supabase.from("profiles").insert([{ id: userId, full_name, role }]);
  //     await fetchProfile(userId);
  //   }

  //   setLoading(false);
  //   return { data };
  // };

  // // Login
  // const login = async ({ email, password }) => {
  //   setLoading(true);

  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) {
  //     setLoading(false);
  //     return { error };
  //   }

  //   const userId = data?.user?.id;
  //   if (userId) await fetchProfile(userId);

  //   setLoading(false);
  //   return { data };
  // };

  // Login
  const login = async ({ email, password }) => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      return { error: error.message || "Login failed" }; // FIX
    }

    const userId = data?.user?.id;
    if (userId) await fetchProfile(userId);

    setLoading(false);
    return { data };
  };

  // Register
  const register = async ({
    email,
    password,
    full_name = null,
    role = "student",
  }) => {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setLoading(false);
      return { error: error.message || "Registration failed" }; // FIX
    }

    const userId = data?.user?.id;

    if (userId) {
      await supabase.from("profiles").insert([{ id: userId, full_name, role }]);
      await fetchProfile(userId);
    }

    setLoading(false);
    return { data };
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setRole(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
        loading,
        register,
        login,
        logout,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Consumer hook
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export default useAuth;
