import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import jestPlugin from 'eslint-plugin-jest'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      // Opcional: Si quieres las reglas recomendadas de Jest, añádelas aquí.
      // Esto también configura los globales de Jest, haciendo la línea de globals.jest redundante si usas 'recommended'.
      // Si solo quieres los globales sin las reglas, la línea de globals.jest es suficiente.
      // jestPlugin.configs.recommended,
    ],
    // Añade el plugin de Jest si vas a usar sus reglas o si lo necesitas para la configuración.
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser, // Mantiene los globales de navegador (window, document, etc.)
        ...globals.jest,    // <-- Añade los globales de Jest (test, expect, describe, etc.)
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Si usas jestPlugin.configs.recommended, sus reglas se añadirán aquí.
      // Puedes añadir reglas específicas de Jest aquí si lo deseas, por ejemplo:
      // 'jest/no-disabled-tests': 'warn',
      // 'jest/no-focused-tests': 'error',
    },
  },
])
