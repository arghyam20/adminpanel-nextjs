import { Box, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";

import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
      <Paper
        sx={{
          width: "100%",
          maxWidth: 440,
          p: 4,
          borderRadius: 2,
          boxShadow: "0 20px 60px rgba(15,23,42,.12)",
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" fontWeight={900}>
              Propual Admin
            </Typography>
            <Typography color="text.secondary">Secure administrator login</Typography>
          </Box>
          <LoginForm />
          <Typography variant="body2">
            <Link href="/forgot-password">Forgot password?</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
