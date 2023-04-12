#!/usr/bin/env node

import crypto from 'crypto';

import { hideBin } from 'yargs/helpers';
import clipboard from 'clipboardy';
import yargs from 'yargs';

/**
 *
 * @param {number} length
 * @param {boolean} copyToClipboard
 */
function generatePassword(length, copyToClipboard) {
  const randomBytes = crypto.randomBytes(256);
  const password = randomBytes
    .toString('base64')
    .replace(/[+/=]/g, '')
    .slice(0, length);

  if (copyToClipboard) {
    clipboard.writeSync(password);
    console.log('Password copied to clipboard...');
  } else {
    console.log(password);
  }
}

function main() {
  const { l, c } = yargs(hideBin(process.argv))
    .usage('Password generator')
    .option('length', {
      alias: 'l',
      describe: 'Desired password length',
      type: 'number',
      default: 16,
    })
    .option('copy-to-clip', {
      alias: 'c',
      describe: 'Copy to clipboard',
      type: 'boolean',
      default: false,
    })
    .help('h')
    .alias('h', 'help')
    .parse();

  generatePassword(l, c);
}

main();
