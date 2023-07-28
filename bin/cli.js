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
  let data = await asyncFiglet("ip-vue2-cli");
  log(data);
}
program
  .command("create <app-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if iy exist")
  .action(async (appName, options) => {
    await printLogo();
    log(`🚀 创建项目 ${appName}`)
    let answer = await inquirer.prompt([
      {
        name: "language",
        type: "list",
        message: "Please pick a present:",
        choices: ["Default（[Vue 2]）"],
      },
    ]);
    if (answer.language == "Default（[Vue 2]）") {
      log("您选择了逸曜前端Vue2版本脚手架，即将进入下载模式.");
      spinner.start();
      try {
        await download(
          "direct:http://gitlab/frontend/ip-vue2-admin.git",
          appName,
          { clone: true }
        );
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
