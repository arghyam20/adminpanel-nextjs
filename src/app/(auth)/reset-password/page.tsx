"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password })
    });
    const json = await response.json();
    response.ok ? toast.success(json.message) : toast.error(json.message);
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
      <Paper sx={{ width: "100%", maxWidth: 440, p: 4, borderRadius: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={900}>
            Reset Password
          </Typography>
          <TextField label="Reset Token" value={token} onChange={(event) => setToken(event.target.value)} />
          <TextField label="New Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <Button variant="contained" onClick={submit}>
            Reset Password
          </Button>
          <Link href="/login">Back to login</Link>
        </Stack>
      </Paper>
    </Box>
  );
}
