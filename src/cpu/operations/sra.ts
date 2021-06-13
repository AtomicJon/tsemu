import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Shift a value right (arithmetic) into the carry ([0] => Carry, [7] => [7])
 * Preserves 7th/signing bit
 * @param cpu Cpu to operate on
 * @param operands [0] = value to shift right
 */
export default function sra(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value = cpu.readOperand(operands[0]);
  const result = (value >> 1) | (value & 0x80);
  const maskedResult = result & 0xff;

  cpu.writeToOperand(operands[0], maskedResult);

  return {
    Z: maskedResult === 0,
    N: false,
    H: false,
    C: (value & 0x01) === 0x01,
  };
}
