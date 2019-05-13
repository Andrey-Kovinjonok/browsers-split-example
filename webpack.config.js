const prod = require('./webpack.prod.js');
const dev = require('./webpack.dev.js');

module.exports = function config(env) {
  return env === 'dev' ? dev : prod;
};
