import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Rotate a value left through the carry (7 => Carry => 0)
 * @param cpu Cpu to operate on
 * @param operands [0] = value to rotate left
 */
export default function rl(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value = cpu.readOperand(operands[0]);
  let result = value << 1;

  // Shift the carry flag in
  if (cpu.flagC) {
    result = result | 0x01;
  }

  const maskedResult = result & 0xff;

  cpu.writeToOperand(operands[0], maskedResult);

  return {
    Z: maskedResult === 0,
    N: false,
    H: false,
    C: (result & 0x100) === 0x100,
  };
}
