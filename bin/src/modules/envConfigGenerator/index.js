// envConfigGenerator/index.js
const fs = require("fs");

// Function to generate and write environment variable files
module.exports = function generateEnvFiles(appName) {
  const envConfig = {
    development: {
      ENV: '"development"',
      VUE_APP_BASE_API: '"/dev-api"',
      VUE_CLI_BABEL_TRANSPILE_MODULES: true
    },
    production: {
      ENV: '"production"',
      VUE_APP_BASE_API: '"/prod-api"',
      VUE_APP_BASE_NAME: `"${appName.replace(/^web-/, '')}"`
    },
    staging: {
      NODE_ENV: '"production"',
      VUE_APP_BASE_API: '"/stage-api"',
      VUE_APP_BASE_NAME: `"${appName.replace(/^web-/, '')}"`
    }
  };

  for (const env in envConfig) {
    if (envConfig.hasOwnProperty(env)) {
      const config = envConfig[env];
      const envFileName = `.env.${env}`;
      const envFileContent = Object.keys(config)
        .map((key) => `${key} = ${config[key]}`)
        .join("\n");
      fs.writeFileSync(`${appName}/${envFileName}`, envFileContent);
    }
  }
};