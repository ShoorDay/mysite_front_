let config;

if (process.env.SITE_ENV) {
  config = require("./production.js");
} else {
  config = require("./develop.js");
  console.log("处于开发环境下");
}

module.exports = config;
