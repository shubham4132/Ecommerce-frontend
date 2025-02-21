import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// Vite config
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      /* eslint-disable no-undef */
      "@": path.resolve(__dirname, "./src"), // Correct alias to 'src' folder
    },
  },
});
