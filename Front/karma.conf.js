module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],  // Asegúrate de que solo está "jasmine"
    files: [
      "src/**/*.ts"
    ],
    preprocessors: {
      "src/**/*.ts": ["karma-typescript"]
    },
    browsers: ["Chrome"],
    singleRun: false
  });
};
