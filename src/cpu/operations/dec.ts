import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { checkSubtractHalfCarry } from '../helpers/checkSubtractHalfCarry';
import { Operand, OperandType, ResultFlags } from '../types';

/**
 * Decrement a value by 1
 * @param cpu Cpu to operate on
 * @param operands [0] = value/destination to decrement
 */
export default function dec(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value = cpu.readOperand(operands[0]);
  const result = value - 1;
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
    Z: result === 0,
    N: true,
    H: checkSubtractHalfCarry(value, 1),
    C: null,
  };
}
