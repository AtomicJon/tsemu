import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { checkAddHalfCarry } from '../helpers/checkAddHalfCarry';
import { Operand, OperandType, ResultFlags } from '../types';

/**
 * Increment a value by 1
 * @param cpu Cpu to operate on
 * @param operands [0] = value/destination to increment
 */
export default function inc(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value = cpu.readOperand(operands[0]);
  const result = value + 1;
  const maskedResult =
    operands[0].type === OperandType.Register16 && !operands[0].isAddress
      ? result & 0xffff
      : result & 0xff;

  cpu.writeToOperand(operands[0], maskedResult);

  // 16 bit operations don't affect flags
  if (operands[0].type === OperandType.Register16 && !operands[0].isAddress) {
    return FLAGS_NO_CHANGE;
  }

  return {
    Z: maskedResult === 0,
    N: false,
    H: checkAddHalfCarry(value, 1),
    C: null,
  };
}
