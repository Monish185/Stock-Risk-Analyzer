// src/theme.js
import { createTheme } from "@mui/material/styles";

export const createAppTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#0D47A1", // Navy blue
            },
            secondary: {
              main: "#FFD700", // Gold
            },
            background: {
              default: "#F5F7FA",
              paper: "#ffffff",
            },
            text: {
              primary: "#1a1a1a",
            },
          }
        : {
            primary: {
              main: "#90CAF9", // Soft blue
            },
            secondary: {
              main: "#FFD700",
            },
            background: {
              default: "#121212",
              paper: "#1E1E1E",
            },
            text: {
              primary: "#ffffff",
            },
          }),
    },
    typography: {
      fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,
    },
    shape: {
      borderRadius: 8,
    },
  });
