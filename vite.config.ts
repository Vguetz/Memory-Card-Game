// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === "production" ? "/Memory-Card-Game" : "/", // Configuración condicional del base
  };
});
