import Cpu from '../Cpu';
import { ResultFlags } from '../types';

/**
 * Compliment the carry flag (invert)
 * @param cpu Cpu to operate on
 */
export default function ccf(cpu: Cpu): ResultFlags {
  return {
    Z: null,
    N: false,
    H: false,
    C: !cpu.flagC,
  };
}
