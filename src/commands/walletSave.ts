import fs from 'fs';
import clc from 'cli-color';
import cliQuestions from '../utils/cli-questions';
import Crypter from '../utils/crypter';
import CommandInterface from '../faces/command';
import ArgumentsInterface from '../faces/arguments';

const command: CommandInterface = {
  name: 'wallet-save',
  aliases: ['ws'],
  description: `Saves a wallet, removes the need of the ${clc.cyan('--wallet')} option`,
  useOptions: false,
  args: ['folder/wallet.json'],
  execute: async (args: ArgumentsInterface): Promise<void> => {
    const { commandValue: walletPath, config, debug } = args;

    try {
      const wallet = fs.readFileSync(walletPath, 'utf8');
      const res = await cliQuestions.askWalletPassword('Set a password for your wallet');

      // @ts-ignore
      const crypter = new Crypter(res.password);
      const encWallet = crypter.encrypt(Buffer.from(wallet)).toString('base64');

      config.set('wallet', encWallet);
      console.log(clc.green('Wallet saved!'));
    } catch (e) {
      console.log(clc.red('Invalid wallet file.'));
      if (debug) console.log(e);
    }
  }
};

export default command;