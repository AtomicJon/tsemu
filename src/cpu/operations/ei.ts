import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { ResultFlags } from '../types';

/**
 * Enable interrupts
 * @param cpu Cpu to operate on
 */
export default function ei(cpu: Cpu): ResultFlags {
  cpu.interruptsEnabled = true;

  return FLAGS_NO_CHANGE;
}
