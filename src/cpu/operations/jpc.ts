import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Jump to the address specified if the carry flag is set
 * @param cpu Cpu to operate on
 * @param operands [0] = jump address
 */
export default function jpC(cpu: Cpu, operands: Operand[]): ResultFlags {
  const jumpAddress = cpu.readOperand(operands[0]);

  if (cpu.flagC) {
    cpu.PC = jumpAddress;
  }

  return FLAGS_NO_CHANGE;
}
