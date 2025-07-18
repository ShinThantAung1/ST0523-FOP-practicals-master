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
      "9ProblemSolving/**"
    ],
  },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.mjs"],languageOptions: {sourceType: "module"} },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
  { rules: {
      // Student-friendly overrides
      "no-unused-vars": "off",         // Allow unused variables (e.g., in starter code)
      "no-empty": "off",               // Allow empty functions or blocks
      "no-console": "off",             // Allow console.log for debugging
      "no-undef": "warn",              // Still warn about undefined variables
      "no-redeclare": "warn",          // Warn about redeclared vars, but don't block
  } }
]);

// For now I will disable no-unused-vars as a lot of the code has unused variables that the students are supposed to input themselves 
// Make sure all the const are given a default value