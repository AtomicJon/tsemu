import { REG_PC } from '../constants';
import Cpu from '../Cpu';
import { OperandType } from '../types';
import pop from './pop';
/**
 * Return from a subroutine
 * @param cpu Cpu to operate on
 */
export default function ret(cpu: Cpu) {
  return pop(cpu, [{ type: OperandType.Register16, target: REG_PC }]);
}
