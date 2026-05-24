"use client";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";
import {
  Box,
  Button,
  Checkbox,
  Chip,
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

  async function remove(id: unknown) {
    if (!window.confirm("Delete this record?")) return;
    try {
      await apiService.remove(endpoint, String(id));
      toast.success("Record deleted");
      setRows((items) => items.filter((item) => item.id !== id));
      setTotal((t) => t - 1);
    } catch {
      toast.error("Failed to delete record");
    }
  }

  async function bulkRemove() {
    if (!selectedIds.length || !window.confirm(`Delete ${selectedIds.length} selected records?`))
      return;
    try {
      await Promise.all(selectedIds.map((id) => apiService.remove(endpoint, String(id))));
      toast.success("Selected records deleted");
      setRows((items) => items.filter((item) => !selectedIds.includes(item.id)));
      setTotal((t) => t - selectedIds.length);
      setSelectedIds([]);
    } catch {
      toast.error("Failed to delete selected records");
    }
  }

  async function toggleStatus(row: Record<string, unknown>) {
    const next =
      row.status === "ACTIVE"
        ? "INACTIVE"
        : row.status === "PUBLISHED"
          ? "DRAFT"
          : row.status === "DRAFT"
            ? "PUBLISHED"
            : "ACTIVE";
    try {
      await apiService.update(endpoint, String(row.id), { status: next });
      toast.success("Status updated");
      setRows((items) =>
        items.map((item) => (item.id === row.id ? { ...item, status: next } : item))
      );
    } catch {
      toast.error("Failed to update status");
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
                <IconButton color="error" disabled={!selectedIds.length} onClick={bulkRemove}>
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
              onClick={() => router.push(addHref)}
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
                          e.target.checked
                            ? [...ids, row.id]
                            : ids.filter((id) => id !== row.id)
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
                    <Tooltip title="Toggle Status">
                      <Chip
                        size="small"
                        label={String(row.status ?? "")}
                        color={
                          row.status === "ACTIVE" || row.status === "PUBLISHED"
                            ? "success"
                            : "default"
                        }
                        onClick={() => toggleStatus(row)}
                        sx={{ mr: 1, cursor: "pointer" }}
                      />
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => router.push(editHref(String(row.id)))}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => remove(row.id)}>
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
