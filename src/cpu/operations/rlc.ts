import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Rotate a value left (circular - 7 bit rotated back into 0 bit, and stored in carry)
 * @param cpu Cpu to operate on
 * @param operands [0] = value to rotate
 */
export default function rlc(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value = cpu.readOperand(operands[0]);
  let result = value << 1;

  // Move carry to carry flag (existing carry discarded)
  const flagC = (result & 0x100) === 0x100;

  // Rotate 7th bit in same as carry
  if (flagC) {
    result = result | 0x01;
  }

  const maskedResult = result & 0xff;

  cpu.writeToOperand(operands[0], maskedResult);

  return {
    Z: maskedResult === 0,
    N: false,
    H: false,
    C: flagC,
  };
}
