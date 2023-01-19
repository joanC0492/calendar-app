import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  plugins: [react()],
});
