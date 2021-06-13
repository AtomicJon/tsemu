import Cpu from '../Cpu';
import { ResultFlags } from '../types';

/**
 * Compliment A
 * @param cpu Cpu to operate on
 */
export default function cpl(cpu: Cpu): ResultFlags {
  cpu.A = cpu.A ^ 0xff;

  return {
    Z: null,
    N: true,
    H: true,
    C: null,
  };
}
