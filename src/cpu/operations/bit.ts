import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Check if a specific bit is set
 * @param cpu Cpu to operate on
 * @param operands [0] = the bit to check, [1] = value to check
 */
export default function bit(cpu: Cpu, operands: Operand[]): ResultFlags {
  const bit = cpu.readOperand(operands[0]);
  const value = cpu.readOperand(operands[1]);
  const bitValue = Math.pow(2, bit);

  return {
    Z: (value & bitValue) === 0,
    N: false,
    H: true,
    C: null,
  };
}
