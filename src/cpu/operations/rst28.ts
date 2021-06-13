import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import rst from './rst';
import { ResultFlags } from '../types';

/**
 * Restart at address 0x28
 * @param cpu Cpu to operate on
 */
export default function rst28(cpu: Cpu): ResultFlags {
  rst(cpu, 0x28);
  return FLAGS_NO_CHANGE;
}
