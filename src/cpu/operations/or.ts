import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * OR two values together
 * @param cpu Cpu to operate on
 * @param operands [0] = first value to OR [1] = second value to OR
 */
export default function or(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value1 = cpu.readOperand(operands[0]);
  const value2 = cpu.readOperand(operands[1]);
  const result = value1 | value2;

  cpu.writeToOperand(operands[0], result);

  return {
    Z: result === 0,
    N: false,
    H: false,
    C: false,
  };
}
