"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { apiService } from "@/lib/api-service";
import { httpClient } from "@/lib/http-client";

export interface FieldConfig {
  key: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "textarea" | "select";
  options?: { value: string | number; label: string }[];
  required?: boolean;
  defaultValue?: unknown;
}

interface Props {
  title: string;
  endpoint: string;
  fields: FieldConfig[];
  backHref: string;
  recordId?: string;
}

function buildDefaults(fields: FieldConfig[]): Record<string, unknown> {
  const defaults: Record<string, unknown> = {};
  for (const f of fields) {
    defaults[f.key] = f.defaultValue ?? "";
  }
  return defaults;
}

export function RecordForm({ title, endpoint, fields, backHref, recordId }: Props) {
  const router = useRouter();
  const isEdit = Boolean(recordId);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm<Record<string, unknown>>({
    defaultValues: buildDefaults(fields),
  });

  useEffect(() => {
    if (isEdit && recordId) {
      httpClient
        .get<{ data?: Record<string, unknown> }>(`${endpoint}?id=${recordId}`)
        .then(({ data: res }) => {
          const record = res.data;
          if (record) {
            const values: Record<string, unknown> = {};
            for (const f of fields) {
              values[f.key] = record[f.key] ?? f.defaultValue ?? "";
            }
            reset(values);
          }
        })
        .catch(() => toast.error("Failed to load record"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordId]);

  async function onSubmit(raw: Record<string, unknown>) {
    const data = Object.fromEntries(
      Object.entries(raw)
        .filter(([, v]) => v !== "" && v !== null && v !== undefined)
        .map(([k, v]) => {
          const field = fields.find((f) => f.key === k);
          if (field?.type === "number" && typeof v === "string") {
            return [k, Number(v)];
          }
          return [k, v];
        })
    );
    try {
      if (isEdit && recordId) {
        await apiService.update(endpoint, recordId, data);
        toast.success("Record updated successfully");
      } else {
        await apiService.create(endpoint, data);
        toast.success("Record created successfully");
      }
      router.push(backHref as never);
    } catch (err) {
      const axiosErr = err as {
        response?: {
          data?: {
            message?: string;
            errors?: { fieldErrors?: Record<string, string[]> };
          };
        };
      };
      const apiData = axiosErr?.response?.data;
      if (apiData?.errors?.fieldErrors) {
        for (const [key, messages] of Object.entries(apiData.errors.fieldErrors)) {
          setError(key, { type: "server", message: messages[0] });
        }
        toast.error("Validation failed. Please check the form.");
      } else {
        const msg = apiData?.message ?? "Failed to save record";
        console.error("Save error:", apiData);
        toast.error(msg);
      }
    }
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(backHref as never)}
          variant="outlined"
          size="small"
        >
          Back
        </Button>
        <Typography variant="h5" fontWeight={700}>
          {isEdit ? `Edit ${title}` : `Add ${title}`}
        </Typography>
      </Stack>

      <Paper sx={{ p: 3, maxWidth: 720 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            {fields.map((field) => (
              <Controller
                key={field.key}
                name={field.key}
                control={control}
                rules={{ required: field.required ? `${field.label} is required` : false }}
                render={({ field: f, fieldState }) =>
                  field.type === "select" ? (
                    <FormControl fullWidth size="small" error={!!fieldState.error}>
                      <InputLabel>{field.label}</InputLabel>
                      <Select {...f} value={f.value ?? ""} label={field.label}>
                        {field.options?.map((opt) => (
                          <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldState.error && (
                        <FormHelperText>{fieldState.error.message}</FormHelperText>
                      )}
                    </FormControl>
                  ) : (
                    <TextField
                      {...f}
                      value={f.value ?? ""}
                      label={field.label}
                      size="small"
                      fullWidth
                      type={field.type === "textarea" ? "text" : (field.type ?? "text")}
                      multiline={field.type === "textarea"}
                      rows={field.type === "textarea" ? 4 : undefined}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )
                }
              />
            ))}

            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 1 }}>
              <Button
                variant="outlined"
                onClick={() => router.push(backHref as never)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? "Saving…" : isEdit ? "Update" : "Create"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
