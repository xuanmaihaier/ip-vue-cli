// gitignoreGenerator/index.js
const fs = require("fs");

// Function to generate and write .gitignore file
module.exports = function generateGitignoreFile (appName) {
  const gitignoreContent = `.DS_Store
node_modules/
dist/
${appName.replace(/^web-/, '')}/
${appName.replace(/^web-/, '')}.zip
admin/
admin.zip
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
tests/**/coverage/
# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
`;

  fs.writeFileSync(`${appName}/.gitignore`, gitignoreContent);
};