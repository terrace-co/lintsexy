import chalk from 'chalk';
import minimist from 'minimist';

import { handleInfoCommand } from './commands/info.js';
import { handleLintCommand } from './commands/lint.js';

function main(positionalArgs, keywordArgs) {
  const COMMANDS = {
    info: handleInfoCommand,
    lint: handleLintCommand,
  };

  if (positionalArgs.length == 0 || !(positionalArgs[0] in COMMANDS)) {
    console.log();
    console.log('Usage: lintsexy <command>');
    console.log();
    console.log('where <command> is one of:');
    console.log('    ' + Object.keys(COMMANDS).join(', '));
    process.exit(1);
  }

  const command = positionalArgs[0];
  COMMANDS[command](positionalArgs.slice(1), keywordArgs);
}

(() => {
  const args = minimist(process.argv.slice(2));
  const positionalArgs = args._;
  delete args._;
  main(positionalArgs, args);
})();
