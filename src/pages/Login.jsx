import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button } from "../components/ui";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const nav = useNavigate();
  const { user, login, fetchProfile } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: loginError } = await login({
        email: form.email,
        password: form.password,
      });

      if (loginError) {
        setError(loginError);
        setLoading(false);
        return;
      }

      const user = data?.user;
      if (!user) {
        setError("Unable to sign in. Please try again.");
        setLoading(false);
        return;
      }

      const profile = await fetchProfile(user.id);
      const role = profile?.role;

      if (role) nav("/dashboard");
      else nav("/");
    } catch (err) {
      setError(err?.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      nav("/dashboard");
    }
  }, [user]);

  return (
    <div className="p-6 w-full max-w-lg mx-auto h-[calc(100vh-4rem)] sm:h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
      <Card
        title="Welcome back"
        titleClassName="!font-bold !text-2xl"
        titleAlign="center"
        className="w-full"
      >
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@school.edu"
          />

          <Input
            label="Password"
            type="password"
            showToggle
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Your password"
            autoComplete="current-password"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" loading={loading} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-indigo-600 font-semibold"
              onClick={() => nav("/register")}
            >
              Create one
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
