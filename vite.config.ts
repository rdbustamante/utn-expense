import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,
    port: 9090,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
      },
      output: {
        sourcemap: false,
        inlineDynamicImports: false,
      },
    },
  },
  publicDir: "./src/assets",
});
