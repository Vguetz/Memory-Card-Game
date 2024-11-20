// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Memory-Card-Game/", // Añadir la barra diagonal final
});
