import { REG_A } from '../constants';
import Cpu from '../Cpu';
import { OperandType, ResultFlags } from '../types';
import rlc from './rlc';

/**
 * Rotate a value left (circular - 7 bit rotated back into 0 bit, and stored in carry)
 * Special op specific to A that only returns carry flag
 * @param cpu Cpu to operate on
 */
export default function rlca(cpu: Cpu): ResultFlags {
  const resultFlags = rlc(cpu, [
    { type: OperandType.Register8, target: REG_A },
  ]);

  return {
    Z: false,
    N: false,
    H: false,
    C: resultFlags.C,
  };
}
