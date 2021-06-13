import Cpu from '../Cpu';
import { Operand, ResultFlags } from '../types';

/**
 * Special add command that adds to SP
 * @param cpu Cpu to operate on
 * @param operands [0] = value to add to SP
 */
export default function addSp(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value1 = cpu.SP;
  const value2 = cpu.readOperand(operands[0]);
  const result = value1 + value2;

  const maskedResult = result & 0xffff;

  cpu.SP = maskedResult;
  return {
    Z: false,
    N: false,
    H: (((value1 & 0xff) + (value2 & 0xff)) & 0x1000) === 0x1000,
    C: (result & 0x10000) === 0x10000,
  };
}
