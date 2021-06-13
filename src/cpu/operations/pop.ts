import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Pop a value from the stack and put it in the operand
 * @param cpu Cpu to operate on
 * @param operands [0] = destination of popped value
 */
export default function pop(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value = cpu.read16(cpu.SP);
  cpu.SP += 2;

  cpu.writeToOperand(operands[0], value);
  return FLAGS_NO_CHANGE;
}
