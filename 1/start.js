require("@babel/register")({
  presets: ["@babel/preset-env"]
});

module.exports.task1 = require('./1.1')
module.exports.task2 = require('./1.2')