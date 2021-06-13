import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Jump to the address relative to the current address by n if Carry flag is NOT set
 * @param cpu Cpu to operate on
 * @param operands [0] = n (jump offset value)
 */
export default function jrNc(cpu: Cpu, operands: Operand[]): ResultFlags {
  // Always read to advance the PC
  const jumpOffset = cpu.readOperand(operands[0]);

  if (!cpu.flagC) {
    cpu.PC += jumpOffset;
  }

  return FLAGS_NO_CHANGE;
}
