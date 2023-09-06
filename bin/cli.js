#! /usr/bin/env node

let program = require("commander");
let { promisify } = require("util");
let asyncFiglet = promisify(require("figlet"));
let chalk = require("chalk");
let inquirer = require("inquirer");
let ora = require("ora");
const spinner = ora("loading");
const download = promisify(require("download-git-repo"));

// 日志打印函数
const log = (content) => console.log(chalk.blue(content));

// 设置版本和参数
program.version(`v${require("../package.json").version}`);
program.option("-n --name <type>", "output name");

// 打印LOGO
async function printLogo() {
  let data = await asyncFiglet("ip-vue-cli");
  log(data);
}

program
  .command("create <app-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exists")
  .action(async (appName, options) => {
    await printLogo();
    log(`🚀 创建项目 ${appName}`);
    let answer = await inquirer.prompt([
      {
        name: "vueVersion",
        type: "list",
        message: "请选择 Vue 版本:",
        choices: ["Vue 2", "Vue 3"],
      },
    ]);

    if (answer.vueVersion === "Vue 2") {
      log("您选择了逸曜前端 Vue 2 版本脚手架，即将进入下载模式.");
      // 设置 Vue 2 存储库 URL
      const repoUrl = "direct:http://gitlab/web-local-project/ip-vue2-admin.git";
      // 下载 Vue 2 项目
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
        log('下载失败', error.message || error.stack);
        spinner.stop();
      }
    } else {
      log("您选择了逸曜前端 Vue 3 版本脚手架，即将进入下载模式.");
      // 设置 Vue 3 存储库 URL
      const repoUrl = "direct:http://gitlab/web-local-project/ip-vue3-admin.git";
      // 下载 Vue 3 项目
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
        log('下载失败', error.message || error.stack);
        spinner.stop();
      }
    }
  });

// 参数解析
program.parse(process.argv);