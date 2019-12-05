let config;

if (process.env.NODE_ENV === "production") {
  config = require("./prod.js");
} else if (process.env.NODE_ENV === "development") {
  config = require("./dev.js");
  console.log("处于开发环境下");
}

module.exports = config;
