// @ts-check
import angular from 'angular-eslint';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Ignore patterns
  {
    ignores: [
      'dist/**/*',
      'coverage/**/*',
      'node_modules/**/*',
      'projects/**/*',
    ],
  },

  // TypeScript files configuration
  {
    files: ['**/*.ts'],
    extends: [...angular.configs.tsRecommended],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './e2e/tsconfig.json'],
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      // Components keep ChangeDetectionStrategy.Eager (added by the v22 migration)
      // to preserve pre-v22 behaviour; adopting OnPush is a separate change.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: 'app',
          style: 'kebab-case',
          type: 'element',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: 'app',
          style: 'camelCase',
          type: 'attribute',
        },
      ],
    },
  },

  // HTML template files configuration
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
  }
);
