import { REG_A } from '../constants';
import Cpu from '../Cpu';
import { OperandType, ResultFlags } from '../types';
import rrc from './rrc';

/**
 * Rotate a value right (circular - 0 bit rotated back into 7 bit, and stored in carry)
 * Special op specific to A, only keeps carry flag
 * @param cpu Cpu to operate on
 */
export default function rrca(cpu: Cpu): ResultFlags {
  const resultFlags = rrc(cpu, [
    { type: OperandType.Register8, target: REG_A },
  ]);

  return {
    Z: false,
    N: false,
    H: false,
    C: resultFlags.C,
  };
}
