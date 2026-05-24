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
import { useEffect, useMemo, useState } from "react";
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
}

export function DataTable({ title, endpoint, columns }: Props) {
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

  const url = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page + 1),
      pageSize: String(pageSize),
      search,
      status,
      sortBy,
      sortOrder,
    });
    return `${endpoint}?${params.toString()}`;
  }, [endpoint, page, pageSize, search, sortBy, sortOrder, status]);

  useEffect(() => {
    let active = true;
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
        if (!active) return;
        setRows(response.data ?? []);
        setTotal(response.meta?.total ?? 0);
        setSelectedIds([]);
      })
      .catch(() => toast.error("Unable to load records"))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [endpoint, page, pageSize, search, sortBy, sortOrder, status, url]);

  function exportFile(type: "csv" | "excel" | "pdf") {
    const header = columns.map((column) => column.label).join(",");
    const body = rows
      .map((row) => columns.map((column) => JSON.stringify(row[column.key] ?? "")).join(","))
      .join("\n");
    const blob = new Blob([`${header}\n${body}`], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title.toLowerCase().replaceAll(" ", "-")}.${type === "excel" ? "xls" : type}`;
    link.click();
    toast.success(`${type.toUpperCase()} export prepared`);
  }

  async function remove(id: unknown) {
    if (!window.confirm("Delete this record?")) return;
    await apiService.remove(endpoint, String(id));
    toast.success("Record deleted");
    setRows((items) => items.filter((item) => item.id !== id));
  }

  async function bulkRemove() {
    if (!selectedIds.length || !window.confirm(`Delete ${selectedIds.length} selected records?`))
      return;
    await Promise.all(selectedIds.map((id) => apiService.remove(endpoint, String(id))));
    toast.success("Selected records deleted");
    setRows((items) => items.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  }

  function toggleSort(key: string) {
    setLoading(true);
    if (sortBy === key) {
      setSortOrder((value) => (value === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
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
              Server-side pagination, search, filters, sorting, exports, and bulk-ready actions
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Delete selected">
              <span>
                <IconButton color="error" disabled={!selectedIds.length} onClick={bulkRemove}>
                  <DeleteIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Export CSV">
              <IconButton
                onClick={() => {
                  exportFile("csv");
                }}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Excel">
              <IconButton
                onClick={() => {
                  exportFile("excel");
                }}
              >
                <TableViewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export PDF">
              <IconButton
                onClick={() => {
                  exportFile("pdf");
                }}
              >
                <PictureAsPdfIcon />
              </IconButton>
            </Tooltip>
            <Button startIcon={<AddIcon />} variant="contained">
              Add
            </Button>
          </Stack>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
          <TextField
            size="small"
            label="Search"
            value={search}
            onChange={(event) => {
              setLoading(true);
              setSearch(event.target.value);
              setPage(0);
            }}
          />
          <Select
            size="small"
            displayEmpty
            value={status}
            onChange={(event) => {
              setLoading(true);
              setStatus(event.target.value);
            }}
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
                  onChange={(event) => {
                    setSelectedIds(event.target.checked ? rows.map((row) => row.id) : []);
                  }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <TableSortLabel
                    active={sortBy === column.key}
                    direction={sortBy === column.key ? sortOrder : "asc"}
                    onClick={() => {
                      toggleSort(column.key);
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={columns.length + 2}>
                      <Skeleton height={32} />
                    </TableCell>
                  </TableRow>
                ))
              : rows.map((row) => (
                  <TableRow key={String(row.id)} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedIds.includes(row.id)}
                        onChange={(event) => {
                          setSelectedIds((ids) =>
                            event.target.checked
                              ? [...ids, row.id]
                              : ids.filter((id) => id !== row.id)
                          );
                        }}
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {column.render ? column.render(row) : String(row[column.key] ?? "-")}
                      </TableCell>
                    ))}
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton>
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
                ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, nextPage) => {
          setLoading(true);
          setPage(nextPage);
        }}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(event) => {
          setPageSize(Number(event.target.value));
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
