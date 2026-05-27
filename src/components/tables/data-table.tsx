"use client";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { apiService } from "@/lib/api-service";
import type { ApiResponse } from "@/types/api";

export interface Column {
  key: string;
  label: string;
  render?: (row: Record<string, unknown>) => React.ReactNode;
}

interface Props {
  title: string;
  endpoint: string;
  columns: Column[];
  addHref: string;
  editHref: (id: string) => string;
}

export function DataTable({ title, endpoint, columns, addHref, editHref }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedIds, setSelectedIds] = useState<unknown[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<{
    ids: unknown[];
    message: string;
  } | null>(null);
  const [togglingIds, setTogglingIds] = useState<unknown[]>([]);

  function fetchData() {
    setLoading(true);
    apiService
      .list<ApiResponse<Record<string, unknown>[]>>(endpoint, {
        page: page + 1,
        pageSize,
        search,
        status,
        sortBy,
        sortOrder,
      })
      .then(({ data: response }) => {
        setRows(response.data ?? []);
        setTotal(response.meta?.total ?? 0);
        setSelectedIds([]);
      })
      .catch(() => toast.error("Unable to load records"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, page, pageSize, search, sortBy, sortOrder, status]);

  function requestDelete(ids: unknown[]) {
    if (!ids.length) return;
    setDeleteDialog({
      ids,
      message:
        ids.length === 1
          ? "Are you sure you want to delete this record?"
          : `Delete ${ids.length} selected records?`,
    });
  }

  async function performDelete() {
    if (!deleteDialog) return;

    try {
      if (deleteDialog.ids.length === 1) {
        await apiService.remove(endpoint, String(deleteDialog.ids[0]));
      } else {
        await Promise.all(deleteDialog.ids.map((id) => apiService.remove(endpoint, String(id))));
      }

      toast.success(deleteDialog.ids.length === 1 ? "Record deleted" : "Selected records deleted");
      setRows((items) => items.filter((item) => !deleteDialog.ids.includes(item.id)));
      setTotal((t) => t - deleteDialog.ids.length);
      if (deleteDialog.ids.length > 1) {
        setSelectedIds([]);
      }
    } catch {
      toast.error(
        deleteDialog.ids.length === 1
          ? "Failed to delete record"
          : "Failed to delete selected records"
      );
    } finally {
      setDeleteDialog(null);
    }
  }

  async function toggleRowStatus(id: string, currentStatus: string) {
    const nextStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    setTogglingIds((ids) => [...ids, id]);

    try {
      const { data } = await apiService.update<ApiResponse<Record<string, unknown>>>(endpoint, id, {
        status: nextStatus,
      });
      setRows((items) =>
        items.map((item) =>
          String(item.id) === id ? { ...item, status: nextStatus, ...data.data } : item
        )
      );
      toast.success(`Status updated to ${nextStatus}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setTogglingIds((ids) => ids.filter((rowId) => rowId !== id));
    }
  }

  function toggleSort(key: string) {
    if (sortBy === key) {
      setSortOrder((v) => (v === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  }

  function exportFile(type: "csv" | "excel" | "pdf") {
    const header = columns.map((c) => c.label).join(",");
    const body = rows
      .map((row) => columns.map((c) => JSON.stringify(row[c.key] ?? "")).join(","))
      .join("\n");
    const blob = new Blob([`${header}\n${body}`], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title.toLowerCase().replaceAll(" ", "-")}.${type === "excel" ? "xls" : type}`;
    link.click();
    toast.success(`${type.toUpperCase()} export prepared`);
  }

  return (
    <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Box sx={{ p: 2.5, borderBottom: "1px solid", borderColor: "divider" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between">
          <Box>
            <Typography variant="h6" fontWeight={900}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Server-side pagination, search, filters, sorting, and exports
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Delete selected">
              <span>
                <IconButton
                  color="error"
                  disabled={!selectedIds.length}
                  onClick={() => requestDelete(selectedIds)}
                >
                  <DeleteIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Export CSV">
              <IconButton onClick={() => exportFile("csv")}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Excel">
              <IconButton onClick={() => exportFile("excel")}>
                <TableViewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export PDF">
              <IconButton onClick={() => exportFile("pdf")}>
                <PictureAsPdfIcon />
              </IconButton>
            </Tooltip>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => router.push(addHref as never)}
            >
              Add
            </Button>
          </Stack>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
          <TextField
            size="small"
            label="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />
          <Select
            size="small"
            displayEmpty
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
            <MenuItem value="DRAFT">Draft</MenuItem>
            <MenuItem value="PUBLISHED">Published</MenuItem>
          </Select>
        </Stack>
      </Box>

      <Box sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedIds.length > 0 && selectedIds.length < rows.length}
                  checked={rows.length > 0 && selectedIds.length === rows.length}
                  onChange={(e) => setSelectedIds(e.target.checked ? rows.map((r) => r.id) : [])}
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <TableSortLabel
                    active={sortBy === col.key}
                    direction={sortBy === col.key ? sortOrder : "asc"}
                    onClick={() => toggleSort(col.key)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={columns.length + 2}>
                    <Skeleton height={32} />
                  </TableCell>
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  align="center"
                  sx={{ py: 6, color: "text.secondary" }}
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={String(row.id)} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.includes(row.id)}
                      onChange={(e) =>
                        setSelectedIds((ids) =>
                          e.target.checked ? [...ids, row.id] : ids.filter((id) => id !== row.id)
                        )
                      }
                    />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render ? col.render(row) : String(row[col.key] ?? "-")}
                    </TableCell>
                  ))}
                  <TableCell align="right">
                    {typeof row.status === "string" &&
                      (row.status === "ACTIVE" || row.status === "INACTIVE") && (
                        <Tooltip title={row.status === "ACTIVE" ? "Deactivate" : "Activate"}>
                          <span>
                            <IconButton
                              disabled={togglingIds.includes(row.id)}
                              onClick={() => toggleRowStatus(String(row.id), String(row.status))}
                            >
                              {togglingIds.includes(row.id) ? (
                                <CircularProgress size={20} />
                              ) : row.status === "ACTIVE" ? (
                                <ToggleOffIcon />
                              ) : (
                                <ToggleOnIcon />
                              )}
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                    <Tooltip title="Edit">
                      <IconButton onClick={() => router.push(editHref(String(row.id)) as never)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => requestDelete([row.id])}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>

      <Dialog open={Boolean(deleteDialog)} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
          <Typography>{deleteDialog?.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={performDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, p) => {
          setPage(p);
        }}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => {
          setPageSize(Number(e.target.value));
          setPage(0);
        }}
      />
    </Paper>
  );
}

export function StatusChip({ value }: { value: unknown }) {
  const label = String(value ?? "UNKNOWN");
  return (
    <Chip
      size="small"
      label={label}
      color={label === "ACTIVE" || label === "PUBLISHED" ? "success" : "default"}
    />
  );
}
