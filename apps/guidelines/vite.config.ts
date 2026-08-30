import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@tcg/ui": path.resolve(dir, "../../packages/ui/src"),
      "@tcg/tokens": path.resolve(dir, "../../packages/tokens/dist"),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(dir, "index.html"),
        applications: path.resolve(dir, "applications.html"),
      },
    },
  },
});
