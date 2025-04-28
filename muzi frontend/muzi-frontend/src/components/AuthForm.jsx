// src/components/AuthForm.jsx
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AuthForm() {
  const { login, register } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) register(form);
    else login(form);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-1000 border-2">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <CardTitle className="text-center text-2xl font-semibold tracking-tight">
          {isRegister ? "Register" : "Log in"}
        </CardTitle>
        <CardContent className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
            {isRegister && (
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            )}
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <Button type="submit" className="w-full">
              {isRegister ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            {isRegister
              ? "Already have an account? "
              : "No account yet? "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="font-medium text-blue-400 hover:underline focus:outline-nonefocus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              {isRegister ? "Log in" : "Register"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
