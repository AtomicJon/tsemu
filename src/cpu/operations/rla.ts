import { REG_A } from '../constants';
import Cpu from '../Cpu';
import { OperandType, ResultFlags } from '../types';
import rl from './rl';

/**
 * Rotate a value left through the carry (7 => Carry => 0)
 * Special op specific to A that only returns carry flag
 * @param cpu Cpu to operate on
 * @param operands [0] = value to rotate left
 */
export default function rla(cpu: Cpu): ResultFlags {
  const resultFlags = rl(cpu, [{ type: OperandType.Register8, target: REG_A }]);

  return {
    Z: false,
    N: false,
    H: false,
    C: resultFlags.C,
  };
}
