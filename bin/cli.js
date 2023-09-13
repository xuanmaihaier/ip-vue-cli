// cli.js

const program = require("commander");
const createProject = require("./src/createProject");

// Set up program options and version
program.version(`v${require("../package.json").version}`);
program.option("-n --name <type>", "output name");

program
  .command("create")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exists")
  .action(createProject);

program.parse(process.argv);