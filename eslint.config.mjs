import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";
import next from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const eslintConfig = [
  ...next,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "coverage/**",
      "dist/**",
      "next-env.d.ts",
      "src/api/prisma/schema/**",
      "src/scripts/**/*.js",
      "src/api/docs/swagger.ts",
      "src/api/docs/openapi.ts",
      "src/api/middleware/**",
      "src/api/routes/**",
      "src/api/server.ts",
      "src/api/validations/user.validation.ts",
      "src/api/controllers/**",
      "src/api/repositories/**",
      "src/api/services/**",
      "src/api/utils/**",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin,
      "unused-imports": unusedImports,
      prettier: prettierPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: true,
      },
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-duplicate-imports": "error",
      "import/first": "off",
      "import/newline-after-import": "off",
      "import/no-duplicates": "off",
      "import/order": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-deprecated": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unnecessary-type-conversion": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-promise-reject-errors": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "prettier/prettier": "warn",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    files: ["src/api/prisma/seed.ts", "src/scripts/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },
  {
    files: ["*.config.{js,mjs,ts}", "next.config.ts", "postcss.config.js", "tailwind.config.ts"],
    ...tseslint.configs.disableTypeChecked,
  },
  prettierConfig,
];

export default eslintConfig;
