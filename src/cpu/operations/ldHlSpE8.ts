import Cpu from '../Cpu';
import { checkAddHalfCarry } from '../helpers/checkAddHalfCarry';
import { ResultFlags } from '../types';

/**
 * Unique operation to read a signed value, add it to SP and store it in HL
 * @param cpu Cpu to operate on
 */
export default function ldHlSpE8(cpu: Cpu): ResultFlags {
  const value = cpu.read8Signed();
  cpu.HL = cpu.SP + value;

  return {
    Z: false,
    N: false,
    H: checkAddHalfCarry(cpu.SP, value),
    C: (cpu.HL & 0x100) === 0x100,
  };
}
