import babel from '@babel/parser';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import { locate } from '../core/targets.js';

function lint(target) {
  console.log(chalk.dim(`Linting: ${target}`));

  const source = fs.readFileSync(target, { encoding: 'UTF-8' });
  const ast = babel.parse(source, { tokens: true });

  for (const token of ast.tokens) {
    console.log(token);
  }

  console.log(ast.program.body[0].body.body[2]);
}

export function handleLintCommand(positionalArgs, keywordArgs) {
  const targets = locate(positionalArgs);

  const js_targets = targets.filter((target) => path.extname(target) == '.js');
  const skipped_targets = targets.length - js_targets.length;
  if (skipped_targets > 0) {
    console.log(
      chalk.dim(
        `Skipping ${skipped_targets} non-JS target${
          skipped_targets > 1 ? 's' : ''
        }.`
      )
    );
  }

  if (js_targets.length == 0) {
    console.error(chalk.red('No JS targets located.'));
    process.exit(1);
  }

  for (const target of targets) {
    lint(target);
  }
}
