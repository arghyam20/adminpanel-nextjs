"use client";

import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";

interface ThemeModeContextValue {
  mode: "light" | "dark";
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) throw new Error("useThemeMode must be used inside ThemeProvider");
  return context;
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#2563eb" },
          secondary: { main: "#0f766e" },
          background: {
            default: mode === "light" ? "#f6f8fb" : "#0f172a",
            paper: mode === "light" ? "#ffffff" : "#111827"
          }
        },
        shape: { borderRadius: 8 },
        typography: {
          fontFamily: "Inter, Arial, sans-serif",
          button: { textTransform: "none", fontWeight: 700 }
        },
        components: {
          MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
          MuiButton: { defaultProps: { disableElevation: true } }
        }
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode: () => { setMode(mode === "light" ? "dark" : "light"); } }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <Toaster position="top-right" />
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}
