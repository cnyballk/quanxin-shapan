import { defineConfig } from "umi";

export default defineConfig({
  npmClient: 'pnpm',
  history: { type: "hash" },
  headScripts: [],
  extraBabelPlugins: process.env.NODE_ENV === "production" ? ["babel-plugin-dynamic-import-node"] : [],
  outputPath: "./http-exe/public",
});
