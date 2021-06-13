import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Read from one location and store it in another
 * @param cpu Cpu to operate on
 * @param operands [0] = destination, [1] = source
 */
export default function ld(cpu: Cpu, operands: Operand[]): ResultFlags {
  cpu.writeToOperand(operands[0], cpu.readOperand(operands[1]));

  return FLAGS_NO_CHANGE;
}
