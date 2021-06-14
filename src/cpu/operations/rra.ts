import { REG_A } from '../constants';
import Cpu from '../Cpu';
import { OperandType, ResultFlags } from '../types';
import rr from './rr';

/**
 * Rotate a value right through the carry (0 => Carry => 7)
 * Special op specific to A, only keeps carry flag
 * @param cpu Cpu to operate on
 */
export default function rra(cpu: Cpu): ResultFlags {
  const resultFlags = rr(cpu, [{ type: OperandType.Register8, target: REG_A }]);

  return {
    Z: false,
    N: false,
    H: false,
    C: resultFlags.C,
  };
}
