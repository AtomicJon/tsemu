import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Rotate a value right through the carry (0 => Carry => 7)
 * @param cpu Cpu to operate on
 * @param operands [0] = value to rotate right
 */
export default function rr(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value = cpu.readOperand(operands[0]);
  let result = value >> 1;

  // Shift the carry flag in
  if (cpu.flagC) {
    result = result | 0x80;
  }

  const maskedResult = result & 0xff;

  cpu.writeToOperand(operands[0], maskedResult);

  return {
    Z: maskedResult === 0,
    N: false,
    H: false,
    C: (value & 0x01) === 0x01,
  };
}
