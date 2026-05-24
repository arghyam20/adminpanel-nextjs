import { Paper, Stack, Typography } from "@mui/material";

import type { SvgIconComponent } from "@mui/icons-material";

export function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: SvgIconComponent }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: "0 12px 30px rgba(15,23,42,.08)" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <div>
          <Typography color="text.secondary" variant="body2">
            {label}
          </Typography>
          <Typography variant="h4" fontWeight={900}>
            {value}
          </Typography>
        </div>
        <Icon color="primary" fontSize="large" />
      </Stack>
    </Paper>
  );
}
