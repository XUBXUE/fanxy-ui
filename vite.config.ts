import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import postcssMixins from "postcss-mixins";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "fanxy-ui-lib",
      fileName: (format) => `fanxy-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [postcssMixins],
    },
  },
});
