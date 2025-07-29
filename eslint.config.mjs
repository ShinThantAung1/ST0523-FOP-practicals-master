import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    ignores: [
      "1Introduction/**",
      "2Operators/**",
      "3Functions/**",
      "4Selections/**",
      "5Loops/**",
      "6Arrays/**",
      "7While/**",
      "8Objects/**",
      "9ProblemSolving/**",
      ".vscode/**"
    ],
  },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.mjs"],languageOptions: {sourceType: "module"} },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] }
]);