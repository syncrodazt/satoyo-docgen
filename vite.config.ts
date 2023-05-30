// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/satoyo-docgen/",
  };

  if (command !== "serve") {
    config.base = "/satoyo-docgen/";
  }

  return config;
});
