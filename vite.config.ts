import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
    },
  },
});
