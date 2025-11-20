import { useState, useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import { Card, Input, Button } from "../components/ui";

export default function Register() {
  const nav = useNavigate();
  const { user, register, loading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    confirm_password: "",
  });

  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.full_name || !form.email || !form.password) {
      setError("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    const { error: regError } = await register({
      email: form.email,
      password: form.password,
      full_name: form.full_name,
      role: "student",
    });

    if (regError) {
      setError(regError.message || "Unable to create account");
      return;
    }

    alert(
      "Account created. Check your email to confirm (if required), then login."
    );
    nav("/login");
  }

  useEffect(() => {
    if (user) {
      replace("/dashboard");
    }
  }, [user]);

  return (
    <div className="p-6 w-full max-w-lg mx-auto h-[calc(100vh-4rem)] sm:h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
      <Card
        title="Register"
        titleClassName="!font-bold !text-2xl"
        titleAlign="center"
        className="w-full"
      >
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          <Input
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            placeholder="Full name"
          />

          <Input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            type="email"
          />

          <Input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            type="password"
            showToggle
          />

          <Input
            value={form.confirm_password}
            onChange={(e) =>
              setForm({ ...form, confirm_password: e.target.value })
            }
            placeholder="Confirm Password"
            type="password"
            showToggle
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            disabled={
              !form.full_name ||
              !form.email ||
              !form.password ||
              form.password !== form.confirm_password ||
              loading
            }
          >
            {loading ? "Creating..." : "Create account"}
          </Button>

          <div className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              className="text-indigo-600 font-semibold"
              onClick={() => nav("/login")}
            >
              Log in
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
