module.exports = {
    extends: [
      // other configurations
      'plugin:import/errors',
      'plugin:import/warnings',
    ],
    plugins: ['import'],
    rules: {
      'import/prefer-default-export': 'warn', // or 'error' based on preference
    },
  };