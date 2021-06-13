import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Jump to the address relative to the current address by n
 * @param cpu Cpu to operate on
 * @param operands [0] = n (jump offset value)
 */
export default function jr(cpu: Cpu, operands: Operand[]): ResultFlags {
  const jumpOffset = cpu.readOperand(operands[0]);
  cpu.PC += jumpOffset;

  return FLAGS_NO_CHANGE;
}
