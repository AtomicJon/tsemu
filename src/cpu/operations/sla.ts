import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Shift a value left (logical) into the carry ([7] => Carry, 0 => [0])
 * @param cpu Cpu to operate on
 * @param operands [0] = value to shift left
 */
export default function sla(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value = cpu.readOperand(operands[0]);
  const result = value << 1;
  const maskedResult = result & 0xff;

  cpu.writeToOperand(operands[0], maskedResult);

  return {
    Z: maskedResult === 0,
    N: false,
    H: false,
    C: (result & 0x100) === 0x100,
  };
}
