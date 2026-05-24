"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Stack, TextField } from "@mui/material";
import { loginSchema } from "@/validations/auth";
import type { z } from "zod";

type LoginInput = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "admin@example.com", password: "Admin@12345" }
  });

  async function onSubmit(values: LoginInput) {
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    if (!response.ok) {
      toast.error("Invalid credentials");
      return;
    }
    toast.success("Welcome back");
    router.push("/dashboard");
  }

  return (
    <Stack component="form" spacing={2} onSubmit={form.handleSubmit(onSubmit)}>
      <TextField label="Email" {...form.register("email")} error={!!form.formState.errors.email} />
      <TextField label="Password" type="password" {...form.register("password")} error={!!form.formState.errors.password} />
      <Button type="submit" variant="contained" size="large">
        Sign In
      </Button>
    </Stack>
  );
}
