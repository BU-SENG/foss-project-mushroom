import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

import { Card, Input, Button } from "../components/ui";

export default function Register() {
  // const { signUp } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    confirm_password: "",
  });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      // await signUp({ ...form, role: "student" });
      alert("Check email for confirmation then login");
      nav("/login");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card
        title="Register"
        titleClassName="!font-bold"
          titleAlign="center"
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
          />

          <Input
            value={form.confirm_password}
            onChange={(e) =>
              setForm({ ...form, confirm_password: e.target.value })
            }
            placeholder="Confirm Password"
            type="password"
          />

          {form.password !== form.confirm_password &&
            form.confirm_password.length > 0 && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}

          <Button
            disabled={
              !form.full_name ||
              !form.email ||
              !form.password ||
              form.password !== form.confirm_password
            }
          >
            Create account
          </Button>
        </form>
      </Card>
    </div>
  );
}
