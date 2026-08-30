import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages serves a project site (not a *.github.io root repo) from
// /<repo-name>/, so every asset URL needs that prefix in production. Local
// dev and any other deploy target stay at root.
const base = process.env.GITHUB_PAGES ? "/concrete-group-brand-os/" : "/";

export default defineConfig({
  base,
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
