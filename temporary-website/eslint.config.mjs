import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import preferArrowPlugin from "eslint-plugin-prefer-arrow";
import githubPlugin from "eslint-plugin-github";
import promisePlugin from "eslint-plugin-promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base configurations
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      ".env*",
      "*.log",
      "coverage/**",
      ".nyc_output/**",
      ".cache/**",
      ".parcel-cache/**",
      "*.d.ts",
      "!src/**/*.d.ts"
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "import": importPlugin,
      "unused-imports": unusedImportsPlugin,
      "prefer-arrow": preferArrowPlugin,
      "github": githubPlugin,
      "promise": promisePlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  }
];

export default eslintConfig;
