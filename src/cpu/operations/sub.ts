import Cpu from '../Cpu';
import { checkSubtractHalfCarry } from '../helpers/checkSubtractHalfCarry';
import { Operand, ResultFlags } from '../types';

/**
 * Subtract subtract one value from another
 * @param cpu Cpu to operate on
 * @param operands [0] = to subtract from/destination [1] = value to subtract
 */
export default function sub(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value1 = cpu.readOperand(operands[0]);
  const value2 = cpu.readOperand(operands[1]);
  const result = value1 - value2;
  const maskedResult = result & 0xff;

  cpu.writeToOperand(operands[0], maskedResult);

  return {
    Z: maskedResult === 0,
    N: true,
    H: checkSubtractHalfCarry(value1, value2),
    C: result < 0,
  };
}
