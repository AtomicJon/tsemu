import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Jump to the address specified
 * @param cpu Cpu to operate on
 * @param operands [0] = jump address
 */
export default function jp(cpu: Cpu, operands: Operand[]): ResultFlags {
  const jumpAddress = cpu.readOperand(operands[0]);
  cpu.PC = jumpAddress;

  return FLAGS_NO_CHANGE;
}
