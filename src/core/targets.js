import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export function locate(targets) {
  return targets
    .map((target) => path.resolve(process.cwd(), target))
    .map(expandAbsoluteTarget)
    .flat();
}

export function expandAbsoluteTarget(target) {
  if (!fs.existsSync(target)) {
    console.error(chalk.red(`Invalid target: ${target} does not exist.`));
    process.exit(1);
  }

  if (fs.lstatSync(target).isDirectory()) {
    return fs
      .readdirSync(target)
      .map((basename) => path.join(target, basename))
      .map(expandAbsoluteTarget)
      .flat();
  }

  return [target];
}
