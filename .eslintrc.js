module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended'
    ],
    rules: {
        'prettier/prettier': ['error'],
        'import/order': [
            'warn',
            {
                groups: [['builtin', 'external'], ['internal', 'parent', 'sibling', 'index']],
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'internal'
                    }
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                alphabetize: { order: 'asc', caseInsensitive: true },
                'newlines-between': 'always'
            }
        ]
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: ['./tsconfig.json', './tsconfig.jest.json']
            }
        }
    }
};
