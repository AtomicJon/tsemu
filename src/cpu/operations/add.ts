import Cpu from '../Cpu';
import { checkAddHalfCarry } from '../helpers/checkAddHalfCarry';
import { Operand, OperandType, ResultFlags } from '../types';

/**
 * Add two values together and store the result in the first operand
 * @param cpu Cpu to operate on
 * @param operands [0] = first value to add, [1] = second value to add
 */
export default function add(cpu: Cpu, operands: Operand[]): ResultFlags {
  const value1 = cpu.readOperand(operands[0]);
  const value2 = cpu.readOperand(operands[1]);
  const result = value1 + value2;

  // Handle 16bit add
  if (operands[0].type === OperandType.Register16) {
    const maskedResult = result & 0xffff;

    cpu.writeToOperand(operands[0], maskedResult);
    return {
      Z: maskedResult === 0,
      N: false,
      H: (((value1 & 0xff) + (value2 & 0xff)) & 0x1000) === 0x1000,
      C: (result & 0x10000) === 0x10000,
    };
  }

  const maskedResult = result & 0xff;

  cpu.writeToOperand(operands[0], maskedResult);

  return {
    Z: maskedResult === 0,
    N: false,
    H: checkAddHalfCarry(value1, value2),
    C: (result & 0x100) === 0x100,
  };
}
