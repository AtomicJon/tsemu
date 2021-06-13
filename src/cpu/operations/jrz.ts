import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Jump to the address relative to the current address by n if Zero flag is set
 * @param cpu Cpu to operate on
 * @param operands [0] = n (jump offset value)
 */
export default function jrZ(cpu: Cpu, operands: Operand[]): ResultFlags {
  // Always read to advance the PC
  const jumpOffset = cpu.readOperand(operands[0]);

  if (cpu.flagZ) {
    cpu.PC += jumpOffset;
  }

  return FLAGS_NO_CHANGE;
}
