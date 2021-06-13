import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import rst from './rst';
import { ResultFlags } from '../types';

/**
 * Restart at address 0x00
 * @param cpu Cpu to operate on
 */
export default function rst00(cpu: Cpu): ResultFlags {
  rst(cpu, 0x00);
  return FLAGS_NO_CHANGE;
}
