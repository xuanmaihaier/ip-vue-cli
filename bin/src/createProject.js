const { promisify } = require("util");
const asyncFiglet = promisify(require("figlet"));
const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");
const spinner = ora("loading");
const download = promisify(require("download-git-repo"));
const fs = require("fs");
const envConfigGenerator = require("./modules/envConfigGenerator/index"); 
const generateGitignoreFile = require("./modules/gitignoreConfig/index"); 

// Helper function for logging
const log = (content) => console.log(chalk.blue(content));

// Function to print the logo
async function printLogo() {
  let data = await asyncFiglet("ip-vue-cli");
  log(data);
}

// Function to create Vue 2 project
async function createVue2Project(appName) {
  log("您选择了逸曜前端 Vue 2 版本脚手架，即将进入下载模式.");
  
  // Set Vue 2 repository URL
  const repoUrl = "direct:http://gitlab/web-local-project/ip-vue2-admin.git";
  
  try {
    spinner.start();
    await download(repoUrl, appName, { clone: true });
    
    // Generate and write environment variable files

    // 创建环境变量
    envConfigGenerator(appName);
    // 创建排除文件
    generateGitignoreFile(appName);

    spinner.succeed("下载完成");

    log(`
        下载完成，请执行下面命令启动项目：
        ===========================
        cd ${appName}
        yarn install 或者 npm i 

        npm run start
        或者
        yarn start
      `);
  } catch (error) {
    log("下载失败", error.message || error.stack);
    spinner.stop();
  }
}

// Function to create Vue 3 project
async function createVue3Project(appName) {
  log("您选择了逸曜前端 Vue 3 版本脚手架，即将进入下载模式.");
  
  // Set Vue 3 repository URL
  const repoUrl = "direct:http://gitlab/web-local-project/ip-vue3-admin.git";
  
  try {
    spinner.start();
    await download(repoUrl, appName, { clone: true });
    spinner.succeed("下载完成");
    
    log(`
        下载完成，请执行下面命令启动项目：
        ===========================
        cd ${appName}
        yarn install 或者 npm i 

        npm run start
        或者
        yarn start
      `);
  } catch (error) {
    log("下载失败", error.message || error.stack);
    spinner.stop();
  }
}

// Export the createProject function
module.exports = async function createProject(options) {
  let appName;
  do {
    appName = await inquirer
      .prompt([
        {
          name: "appName",
          type: "input",
          message: "请输入项目名称 (必须以 'web-' 开头):",
          validate: function (input) {
            if (!input.startsWith("web-")) {
              return "项目名称必须以 'web-' 开头。请按照规范命名。";
            }
            return true;
          },
        },
      ])
      .then((answers) => answers.appName);
  } while (!appName);
  
  await printLogo();
  log(`🚀 创建项目 ${appName}`);
  
  const answer = await inquirer.prompt([
    {
      name: "vueVersion",
      type: "list",
      message: "请选择 Vue 版本:",
      choices: ["Vue 2", "Vue 3"],
    },
  ]);

  if (answer.vueVersion === "Vue 2") {
    await createVue2Project(appName);
  } else {
    await createVue3Project(appName);
  }
};