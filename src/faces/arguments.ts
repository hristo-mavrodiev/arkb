import Arweave from 'arweave';
import Conf from 'conf';
import minimist from 'minimist';
import Tags from '../lib/tags';
import CommandInterface from './command';
import OptionInterface from './option';

export default interface ArgumentsInterface {
  argv: minimist.ParsedArgs;
  arweave: Arweave;
  config: Conf;
  debug: boolean;
  command: string;
  commandValues: string[];
  walletPath: string;
  index: string;
  ipfsPublish: boolean;
  autoConfirm: boolean;
  tags: Tags;
  useBundler: string;
  feeMultiplier: number;
  commands: Map<string, CommandInterface>;
  options: Map<string, OptionInterface>;
}
