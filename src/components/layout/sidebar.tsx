"use client";

import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/constants/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      component="aside"
      sx={{
        width: 280,
        flexShrink: 0,
        borderRight: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        minHeight: "100vh",
        display: { xs: "none", md: "block" }
      }}
    >
      <Box sx={{ px: 3, py: 3 }}>
        <Typography variant="h6" fontWeight={800}>
          Propual Admin
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Enterprise Control Panel
        </Typography>
      </Box>
      <List sx={{ px: 1 }}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const selected = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <ListItemButton selected={selected} sx={{ borderRadius: 2 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: 700 }} />
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </Box>
  );
}
