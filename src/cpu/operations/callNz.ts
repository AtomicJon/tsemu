import { FLAGS_NO_CHANGE, REG_PC } from '../constants';
import Cpu from '../Cpu';
import { Operand, OperandType, ResultFlags } from '../types';
import push from './push';

/**
 * Call a given address (push next instruction onto stack for RET) if Zero flag is NOT set
 * @param cpu Cpu to operate on
 * @param operands [0] = call address
 */
export default function callNz(cpu: Cpu, operands: Operand[]): ResultFlags {
  const jumpAddress = cpu.readOperand(operands[0]);
  if (!cpu.flagZ) {
    push(cpu, [{ type: OperandType.Register16, target: REG_PC }]);
    cpu.PC = jumpAddress;
  }

  return FLAGS_NO_CHANGE;
}
