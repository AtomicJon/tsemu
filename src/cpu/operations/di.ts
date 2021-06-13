import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { ResultFlags } from '../types';

/**
 * Disable interrupts
 * @param cpu Cpu to operate on
 */
export default function di(cpu: Cpu): ResultFlags {
  cpu.interruptsEnabled = false;

  return FLAGS_NO_CHANGE;
}
