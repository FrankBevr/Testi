import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [Vue()],
  resolve: {
    alias: {
      vue: "./node_modules/vue/dist/vue.esm-bundler.js",
    },
  },
});
