import chalk from 'chalk';
import clui from 'clui';
import figlet from 'figlet';
import os from 'os';

export function handleInfoCommand() {
  console.log(
    chalk.blue(figlet.textSync('lintsexy', { horizontalLayout: 'fitted' }))
  );

  const STATS = {
    Version: '0.0.0',
    'Node Version': process.version,
    'OS Platform': os.platform(),
    'OS Release': os.release(),
    Author: 'Hunter Larco',
  };

  for (const [label, value] of Object.entries(STATS)) {
    new clui.Line()
      .column(chalk.cyan(`  ${label}`), 25)
      .column(value)
      .output();
  }

  console.log();
}
