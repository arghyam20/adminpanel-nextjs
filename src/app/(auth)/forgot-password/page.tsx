"use client";

import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

type MessageResponse = {
  message: string;
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  async function submit() {
    const response = await fetch("/api/v1/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const json = (await response.json()) as MessageResponse;
    toast.success(json.message);
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
      <Paper sx={{ width: "100%", maxWidth: 440, p: 4, borderRadius: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={900}>
            Forgot Password
          </Typography>
          <TextField
            label="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Button variant="contained" onClick={submit}>
            Generate Reset Token
          </Button>
          <Link href="/login">Back to login</Link>
        </Stack>
      </Paper>
    </Box>
  );
}
