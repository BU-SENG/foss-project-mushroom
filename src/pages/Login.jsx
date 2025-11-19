import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button } from "../components/ui";
import { supabase } from "../utils/supabase";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResend, setShowResend] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);
    try {
      const {
        data: { user },
        error: signInError,
      } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (signInError) {
        const msg = signInError.message || "Login failed";
        setError(msg);
        // If Supabase indicates email not confirmed, offer resend/reset option
        if (/confirm|confirmed|confirmation/i.test(msg)) {
          setShowResend(true);
        }
        setLoading(false);
        return;
      }

      if (!user) {
        setError("Unable to sign in. Please try again.");
        setLoading(false);
        return;
      }

      // fetch profile to determine role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", user.id)
        .single();

      if (profileError) {
        // If profile is missing, fallback to home
        nav("/");
        return;
      }

      // set a friendly welcome (optional) then redirect based on role
      const role = profile?.role || null;
      if (role === "student") nav("/student/dashboard");
      else if (role === "admin") nav("/dashboard");
      else nav("/");
    } catch (err) {
      setError(err?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  async function resendConfirmation() {
    if (!form.email) {
      setError("Please enter your email to resend confirmation.");
      return;
    }

    try {
      // As a pragmatic client-safe workaround we send a password reset email.
      // This allows the user to set their password and sign in even when
      // confirmation emails were missed. A server-side admin resend would be
      // more correct but requires a service role key.
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(form.email);
      if (resetError) {
        setError(resetError.message || "Unable to send reset email");
        return;
      }

      setError("Password reset email sent. Check your inbox (and spam).");
      setShowResend(false);
    } catch (err) {
      setError(err?.message || "Unexpected error");
    }
  }

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

          {showResend && (
            <div className="text-center">
              <button
                type="button"
                onClick={resendConfirmation}
                className="text-sm text-indigo-600 font-semibold"
              >
                Resend confirmation / Send password reset
              </button>
            </div>
          )}

          <Button type="submit" loading={loading} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-indigo-600 font-semibold"
              onClick={() => nav('/register')}
            >
              Create one
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
