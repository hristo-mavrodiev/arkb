/**
 * utils.ts - Various utility functions
 */

import fs from 'fs';
import path from 'path';
import Arweave from 'arweave';
import minimist from 'minimist';

export function getArweaveUri(arweave: Arweave) {
  return arweave.getConfig().api.protocol + '://' + arweave.getConfig().api.host + ':' + arweave.getConfig().api.port;
}

export function setArweaveInstance(argv: minimist.ParsedArgs, debug: boolean): Arweave {
  const timeout = argv.timeout || 20000;

  const gateway = argv.gateway || 'https://arweave.net';
  let protocol = 'https';
  let host = 'arweave.net';
  let port = 443;

  const match = gateway.match(/(https?):\/\/([\w\.]+):?(\d+)?/);
  if (match) {
    protocol = match[1];
    host = match[2];
    port = +match[3] || (protocol === 'https' ? 443 : 80);
  }

  return Arweave.init({
    host,
    port,
    protocol,
    timeout,
    logging: debug,
  });
}

export function isValidWalletAddress(address: string): boolean {
  return /[a-z0-9_-]{43}/i.test(address);
}

export function bytesForHumans(bytes: number): string {
  const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB'];

  let output: string;

  sizes.forEach((unit, id) => {
    const s = Math.pow(1024, id);
    let fixed = '';
    if (bytes >= s) {
      fixed = String((bytes / s).toFixed(2));
      if (fixed.indexOf('.0') === fixed.length - 2) {
        fixed = fixed.slice(0, -2);
      }
      output = `${fixed} ${unit}`;
    }
  });

  if (!output) {
    return `0 Bytes`;
  }

  return output;
}

export function numbersForHumans(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function dirExists(dir: string): boolean {
  return fs.existsSync(dir);
}

export function getUserDirectory(): string {
  return process.cwd();
}

export function getPackageVersion(): string {
  return require(path.join(__dirname, '..', '..', 'package.json')).version;
}

export async function pause(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// tslint:disable-next-line: variable-name
export function snakeCaseToTitleCase(snake_case: string): string {
  const sentence = snake_case.toLowerCase().split('_');
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }

  return sentence.join(' ');
}
