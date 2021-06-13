import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import rst from './rst';
import { ResultFlags } from '../types';

/**
 * Restart at address 0x18
 * @param cpu Cpu to operate on
 */
export default function rst18(cpu: Cpu): ResultFlags {
  rst(cpu, 0x18);
  return FLAGS_NO_CHANGE;
}
