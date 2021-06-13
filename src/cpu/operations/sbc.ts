import Cpu from '../Cpu';
import { checkSubtractHalfCarry } from '../helpers/checkSubtractHalfCarry';
import { Operand, ResultFlags } from '../types';

/**
 * Subtract subtract one value from another and also subtract the carry flag
 * @param cpu Cpu to operate on
 * @param operands [0] = to subtract from/destination [1] = value to subtract
 */
export default function sbc(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value1 = cpu.readOperand(operands[0]);
  const value2 = cpu.readOperand(operands[1]);
  const result = value1 - value2 - (cpu.flagC ? 1 : 0);
  const maskedResult = result & 0xff;

  cpu.writeToOperand(operands[0], maskedResult);

  return {
    Z: maskedResult === 0,
    N: false,
    H: checkSubtractHalfCarry(value1, value2, cpu.flagC),
    C: result < 0,
  };
}