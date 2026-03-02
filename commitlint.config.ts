module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, etc)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Adding or modifying tests
        'chore', // Maintenance tasks
        'ci', // CI configuration changes
        'build', // Build system changes
        'revert', // Reverting changes
      ],
    ],
    'type-case': [0],
    'type-empty': [2, 'never'],
    'scope-empty': [0],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
};
