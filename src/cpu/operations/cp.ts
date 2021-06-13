import Cpu from '../Cpu';
import { checkSubtractHalfCarry } from '../helpers/checkSubtractHalfCarry';
import { Operand, ResultFlags } from '../types';

/**
 * Compare two values via subtraction
 * @param cpu Cpu to operate on
 * @param operands [0] = the value to subtract from [1] = the value to subtract
 */
export default function cp(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value1 = cpu.readOperand(operands[0]);
  const value2 = cpu.readOperand(operands[1]);
  const result = value1 - value2;

  return {
    Z: result === 0,
    N: true,
    H: checkSubtractHalfCarry(value1, value2),
    C: result < 0,
  };
}
