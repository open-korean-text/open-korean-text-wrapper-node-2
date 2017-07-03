module.exports = function (wallaby) {
  return {
    files: [
      'index.js',
      'jar/**/*',
      'lib/**/*.js',
      '!test/**/*.spec.js',
    ],

    tests: [
      'test/**/*.spec.js',
    ],

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(),
    },

    env: {
      type: 'node'
    }
  };
};
