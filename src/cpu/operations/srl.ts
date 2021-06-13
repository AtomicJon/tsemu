import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Shift a value right (logical) into the carry ([0] => Carry, 0 => [7])
 * @param cpu Cpu to operate on
 * @param operands [0] = value to shift right
 */
export default function srl(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value = cpu.readOperand(operands[0]);
  const result = value >> 1;
  const maskedResult = result & 0xff;

  cpu.writeToOperand(operands[0], maskedResult);

  return {
    Z: maskedResult === 0,
    N: false,
    H: false,
    C: (value & 0x01) === 0x01,
  };
}
