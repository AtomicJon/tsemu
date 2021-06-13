import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Set (set to 1) a specific bit
 * @param cpu Cpu to operate on
 * @param operands [0] = the bit to set, [1] = value to operate on
 */
export default function set(cpu: Cpu, operands: Operand[]): ResultFlags {
  const bit = cpu.readOperand(operands[0]);
  const value = cpu.readOperand(operands[1]);
  const bitValue = Math.pow(2, bit);

  cpu.writeToOperand(operands[1], value | bitValue);

  return FLAGS_NO_CHANGE;
}
