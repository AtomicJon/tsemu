import Cpu from './Cpu';

export type ResultFlags = {
  Z: boolean | null;
  N: boolean | null;
  H: boolean | null;
  C: boolean | null;
};

export type OpCode = {
  mnemonic: string;
  operands: Operand[];
  bytes: number;
  cycles: number;
  action: (cpu: Cpu, operands: Operand[]) => ResultFlags;
};

export enum OperandType {
  Register8 = 'Register8',
  Register16 = 'Register16',
  Immediate8 = 'Immediate8',
  Immediate8Signed = 'Immediate8Signed',
  Immediate16 = 'Immediate16',
  Value = 'Value',
}

export enum OperandModifier {
  Increment = 'Increment',
  Decrement = 'Decrement',
}

export type Operand = {
  type: OperandType;
  target?: number;
  isAddress?: boolean;
  modifier?: OperandModifier;
};
