import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the app from /overseas_demo/, so set base for correct asset paths.
  base: "/overseas_demo/",
  server: {
    port: 5173
  }
});
