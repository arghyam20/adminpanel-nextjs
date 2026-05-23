"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeMode } from "@/components/providers/theme-provider";

export function Topbar() {
  const router = useRouter();
  const { mode, toggleMode } = useThemeMode();

  async function logout() {
    await fetch("/api/v1/auth/logout", { method: "POST" });
    toast.success("Logged out");
    router.push("/login");
  }

  return (
    <Box
      component="header"
      sx={{
        height: 72,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 4 },
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight={800}>
          Dashboard
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Secure MySQL-backed administration
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title="Toggle theme">
          <IconButton onClick={toggleMode}>{mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}</IconButton>
        </Tooltip>
        <Button startIcon={<LogoutIcon />} variant="contained" onClick={logout}>
          Logout
        </Button>
      </Stack>
    </Box>
  );
}
