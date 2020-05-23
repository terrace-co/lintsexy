const babel = require('@babel/parser');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
const path = require('path');

const { version } = require('../package.json');

const argv = require('minimist')(process.argv.slice(2));

console.log(
  chalk.blue(figlet.textSync('lintsexy', { horizontalLayout: 'fitted' }))
);

console.log();
console.log(`Version: ${version}`);
console.log('Parser: @babel/parse');
console.log('Author: Hunter Larco');
console.log();

function locateTargets() {
  const targets = argv._.map((target) => path.resolve(process.cwd(), target));
  return targets.map(maybeExpandTarget).flat();
}

function maybeExpandTarget(target) {
  if (!fs.existsSync(target)) {
    console.log(chalk.red(`Invalid target: ${target} does not exist.`));
    process.exit(1);
  }

  if (fs.lstatSync(target).isDirectory()) {
    return fs
      .readdirSync(target)
      .map((basename) => path.join(target, basename))
      .map(maybeExpandTarget)
      .flat();
  }

  return [target];
}

const targets = locateTargets().filter((file) => {
  const isJS = path.extname(file) == '.js';
  if (!isJS) {
    console.log(chalk.dim(`Skipping ${file}`));
  }
  return isJS;
});

if (targets.length == 0) {
  console.log(chalk.red('No files identified for linting'));
  process.exit(1);
}

for (const file of targets) {
  console.log(`Linting: ${file}`);
  const ast = babel.parse(fs.readFileSync(file, { encoding: 'UTF-8' }), {
    tokens: true,
  });
}
