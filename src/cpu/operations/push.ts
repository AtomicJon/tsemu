import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Push a value onto the stack
 * @param cpu Cpu to operate on
 * @param operands [0] = value to push
 */
export default function push(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value = cpu.readOperand(operands[0]);
  cpu.SP -= 2;
  cpu.write16(cpu.SP, value);

  return FLAGS_NO_CHANGE;
}
