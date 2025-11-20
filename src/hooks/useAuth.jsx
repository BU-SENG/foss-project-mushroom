import {
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

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } = {} } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

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

  const login = async ({ email, password }) => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      return { error: error.message || "Login failed" };
    }

    const userId = data?.user?.id;
    if (userId) await fetchProfile(userId);

    setLoading(false);
    return { data };
  };

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
      return { error: error.message || "Registration failed" };
    }

    const userId = data?.user?.id;

    if (userId) {
      await supabase.from("profiles").insert([{ id: userId, full_name, role }]);
      await fetchProfile(userId);
    }

    setLoading(false);
    return { data };
  };

  const logout = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout Error:", error.message);
      }

      setUser(null);
      setProfile(null);
      setRole(null);

      localStorage.clear();
      sessionStorage.clear();

      clearAllCookies();
    } catch (e) {
      console.error("Critical Logout Failure:", e);
    } finally {
      setLoading(false);
    }
  };

  const clearAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
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

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export default useAuth;
