import Cpu from '../Cpu';
import { checkAddHalfCarry } from '../helpers/checkAddHalfCarry';
import { Operand, ResultFlags } from '../types';

/**
 * Add two values plus the carry flag
 * @param cpu The Cpu to operate on
 * @param operands [0] = first value, [1] = the second value
 */
export function adc(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value1 = cpu.readOperand(operands[0]);
  const value2 = cpu.readOperand(operands[1]);

  const result = value1 + value2 + (cpu.flagC ? 1 : 0);
  const maskedResult = result & 0xff;

  cpu.writeToOperand(operands[0], maskedResult);

  return {
    Z: maskedResult === 0,
    H: false,
    N: checkAddHalfCarry(value1, value2, cpu.flagC),
    C: (result & 0x100) === 0x100,
  };
}
