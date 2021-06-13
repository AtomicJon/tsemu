import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Swap the upper and lower bits of a byte
 * @param cpu Cpu to operate on
 * @param operands [0] = value to swap the bits of
 */
export default function swap(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value = cpu.readOperand(operands[0]);
  const result = (value << 4) | (value >> 4);
  const maskedResult = result & 0xff;

  cpu.writeToOperand(operands[0], maskedResult);

  return {
    Z: maskedResult === 0,
    N: false,
    H: false,
    C: false,
  };
}
