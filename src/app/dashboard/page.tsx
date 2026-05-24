import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArticleIcon from "@mui/icons-material/Article";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import PeopleIcon from "@mui/icons-material/People";
import { Grid, Paper, Stack, Typography } from "@mui/material";

import { StatCard } from "@/components/admin/stat-card";

export default function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard label="Roles" value="RBAC" icon={AdminPanelSettingsIcon} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard label="Users" value="Secure" icon={PeopleIcon} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard label="Blogs" value="SEO" icon={ArticleIcon} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard label="Services" value="Live" icon={MiscellaneousServicesIcon} />
        </Grid>
      </Grid>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight={900}>
          Production Ready Structure
        </Typography>
        <Typography color="text.secondary">
          App Router pages, REST APIs, JWT cookies, Prisma repositories, Zod validation, Material
          UI, Tailwind CSS, soft deletes, seed data, and module screens are scaffolded for
          extension.
        </Typography>
      </Paper>
    </Stack>
  );
}
