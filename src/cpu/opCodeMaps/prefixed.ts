import {
  REG_A,
  REG_B,
  REG_C,
  REG_D,
  REG_E,
  REG_H,
  REG_HL,
  REG_L,
} from '../constants';
import bit from '../operations/bit';
import res from '../operations/res';
import rl from '../operations/rl';
import rlc from '../operations/rlc';
import rr from '../operations/rr';
import rrc from '../operations/rrc';
import set from '../operations/set';
import sla from '../operations/sla';
import sra from '../operations/sra';
import srl from '../operations/srl';
import swap from '../operations/swap';
import { OpCode, OperandType } from '../types';

const prefixed: Record<number, OpCode> = {
  0x00: {
    action: rlc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'RLC B',
    bytes: 1,
    cycles: 8,
  },
  0x01: {
    action: rlc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'RLC C',
    bytes: 1,
    cycles: 8,
  },
  0x02: {
    action: rlc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'RLC D',
    bytes: 1,
    cycles: 8,
  },
  0x03: {
    action: rlc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'RLC E',
    bytes: 1,
    cycles: 8,
  },
  0x04: {
    action: rlc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'RLC H',
    bytes: 1,
    cycles: 8,
  },
  0x05: {
    action: rlc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'RLC L',
    bytes: 1,
    cycles: 8,
  },
  0x06: {
    action: rlc,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'RLC (HL)',
    bytes: 1,
    cycles: 8,
  },
  0x07: {
    action: rlc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RLC A',
    bytes: 1,
    cycles: 8,
  },
  0x08: {
    action: rrc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'RRC B',
    bytes: 1,
    cycles: 8,
  },
  0x09: {
    action: rrc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'RRC C',
    bytes: 1,
    cycles: 8,
  },
  0x0a: {
    action: rrc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'RRC D',
    bytes: 1,
    cycles: 8,
  },
  0x0b: {
    action: rrc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'RRC E',
    bytes: 1,
    cycles: 8,
  },
  0x0c: {
    action: rrc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'RRC H',
    bytes: 1,
    cycles: 8,
  },
  0x0d: {
    action: rrc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'RRC L',
    bytes: 1,
    cycles: 8,
  },
  0x0e: {
    action: rrc,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'RRC (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x0f: {
    action: rrc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RRC A',
    bytes: 1,
    cycles: 8,
  },
  0x10: {
    action: rl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'RL B',
    bytes: 1,
    cycles: 8,
  },
  0x11: {
    action: rl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'RL C',
    bytes: 1,
    cycles: 8,
  },
  0x12: {
    action: rl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'RL D',
    bytes: 1,
    cycles: 8,
  },
  0x13: {
    action: rl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'RL E',
    bytes: 1,
    cycles: 8,
  },
  0x14: {
    action: rl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'RL H',
    bytes: 1,
    cycles: 8,
  },
  0x15: {
    action: rl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'RL L',
    bytes: 1,
    cycles: 8,
  },
  0x16: {
    action: rl,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'RL (HL)',
    bytes: 1,
    cycles: 8,
  },
  0x17: {
    action: rl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RL A',
    bytes: 1,
    cycles: 8,
  },
  0x18: {
    action: rr,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'RR B',
    bytes: 1,
    cycles: 8,
  },
  0x19: {
    action: rr,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'RR C',
    bytes: 1,
    cycles: 8,
  },
  0x1a: {
    action: rr,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'RR D',
    bytes: 1,
    cycles: 8,
  },
  0x1b: {
    action: rr,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'RR E',
    bytes: 1,
    cycles: 8,
  },
  0x1c: {
    action: rr,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'RR H',
    bytes: 1,
    cycles: 8,
  },
  0x1d: {
    action: rr,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'RR L',
    bytes: 1,
    cycles: 8,
  },
  0x1e: {
    action: rr,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'RR (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x1f: {
    action: rr,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RR A',
    bytes: 1,
    cycles: 8,
  },
  0x20: {
    action: sla,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SLA B',
    bytes: 1,
    cycles: 8,
  },
  0x21: {
    action: sla,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SLA C',
    bytes: 1,
    cycles: 8,
  },
  0x22: {
    action: sla,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SLA D',
    bytes: 1,
    cycles: 8,
  },
  0x23: {
    action: sla,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SLA E',
    bytes: 1,
    cycles: 8,
  },
  0x24: {
    action: sla,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SLA H',
    bytes: 1,
    cycles: 8,
  },
  0x25: {
    action: sla,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SLA L',
    bytes: 1,
    cycles: 8,
  },
  0x26: {
    action: sla,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SLA (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x27: {
    action: sla,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SLA A',
    bytes: 1,
    cycles: 8,
  },
  0x28: {
    action: sra,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SRA B',
    bytes: 1,
    cycles: 8,
  },
  0x29: {
    action: sra,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SRA C',
    bytes: 1,
    cycles: 8,
  },
  0x2a: {
    action: sra,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SRA D',
    bytes: 1,
    cycles: 8,
  },
  0x2b: {
    action: sra,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SRA E',
    bytes: 1,
    cycles: 8,
  },
  0x2c: {
    action: sra,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SRA H',
    bytes: 1,
    cycles: 8,
  },
  0x2d: {
    action: sra,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SRA L',
    bytes: 1,
    cycles: 8,
  },
  0x2e: {
    action: sra,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SRA (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x2f: {
    action: sra,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SRA A',
    bytes: 1,
    cycles: 8,
  },
  0x30: {
    action: swap,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SWP B',
    bytes: 1,
    cycles: 8,
  },
  0x31: {
    action: swap,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SWP C',
    bytes: 1,
    cycles: 8,
  },
  0x32: {
    action: swap,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SWP D',
    bytes: 1,
    cycles: 8,
  },
  0x33: {
    action: swap,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SWP E',
    bytes: 1,
    cycles: 8,
  },
  0x34: {
    action: swap,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SWP H',
    bytes: 1,
    cycles: 8,
  },
  0x35: {
    action: swap,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SWP L',
    bytes: 1,
    cycles: 8,
  },
  0x36: {
    action: swap,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SWP (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x37: {
    action: swap,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SWP A',
    bytes: 1,
    cycles: 8,
  },
  0x38: {
    action: srl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SRL B',
    bytes: 1,
    cycles: 8,
  },
  0x39: {
    action: srl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SRL C',
    bytes: 1,
    cycles: 8,
  },
  0x3a: {
    action: srl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SRL D',
    bytes: 1,
    cycles: 8,
  },
  0x3b: {
    action: srl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SRL E',
    bytes: 1,
    cycles: 8,
  },
  0x3c: {
    action: srl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SRL H',
    bytes: 1,
    cycles: 8,
  },
  0x3d: {
    action: srl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SRL L',
    bytes: 1,
    cycles: 8,
  },
  0x3e: {
    action: srl,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SRL (HL)',
    bytes: 1,
    cycles: 8,
  },
  0x3f: {
    action: srl,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SRL A',
    bytes: 1,
    cycles: 8,
  },
  0x40: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'BIT 0, B',
    bytes: 1,
    cycles: 8,
  },
  0x41: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'BIT 0, C',
    bytes: 1,
    cycles: 8,
  },
  0x42: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'BIT 0, D',
    bytes: 1,
    cycles: 8,
  },
  0x43: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'BIT 0, E',
    bytes: 1,
    cycles: 8,
  },
  0x44: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'BIT 0, H',
    bytes: 1,
    cycles: 8,
  },
  0x45: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'BIT 0, L',
    bytes: 1,
    cycles: 8,
  },
  0x46: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'BIT 0, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x47: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'BIT 0, A',
    bytes: 1,
    cycles: 8,
  },
  0x48: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'BIT 1, B',
    bytes: 1,
    cycles: 8,
  },
  0x49: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'BIT 1, C',
    bytes: 1,
    cycles: 8,
  },
  0x4a: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'BIT 1, D',
    bytes: 1,
    cycles: 8,
  },
  0x4b: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'BIT 1, E',
    bytes: 1,
    cycles: 8,
  },
  0x4c: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'BIT 1, H',
    bytes: 1,
    cycles: 8,
  },
  0x4d: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'BIT 1, L',
    bytes: 1,
    cycles: 8,
  },
  0x4e: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'BIT 1, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x4f: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'BIT 1, A',
    bytes: 1,
    cycles: 8,
  },
  0x50: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'BIT 2, B',
    bytes: 1,
    cycles: 8,
  },
  0x51: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'BIT 2, C',
    bytes: 1,
    cycles: 8,
  },
  0x52: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'BIT 2, D',
    bytes: 1,
    cycles: 8,
  },
  0x53: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'BIT 2, E',
    bytes: 1,
    cycles: 8,
  },
  0x54: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'BIT 2, H',
    bytes: 1,
    cycles: 8,
  },
  0x55: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'BIT 2, L',
    bytes: 1,
    cycles: 8,
  },
  0x56: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'BIT 2, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x57: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'BIT 2, A',
    bytes: 1,
    cycles: 8,
  },
  0x58: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'BIT 3, B',
    bytes: 1,
    cycles: 8,
  },
  0x59: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'BIT 3, C',
    bytes: 1,
    cycles: 8,
  },
  0x5a: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'BIT 3, D',
    bytes: 1,
    cycles: 8,
  },
  0x5b: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'BIT 3, E',
    bytes: 1,
    cycles: 8,
  },
  0x5c: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'BIT 3, H',
    bytes: 1,
    cycles: 8,
  },
  0x5d: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'BIT 3, L',
    bytes: 1,
    cycles: 8,
  },
  0x5e: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'BIT 3, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x5f: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'BIT 3, A',
    bytes: 1,
    cycles: 8,
  },
  0x60: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'BIT 4, B',
    bytes: 1,
    cycles: 8,
  },
  0x61: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'BIT 4, C',
    bytes: 1,
    cycles: 8,
  },
  0x62: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'BIT 4, D',
    bytes: 1,
    cycles: 8,
  },
  0x63: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'BIT 4, E',
    bytes: 1,
    cycles: 8,
  },
  0x64: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'BIT 4, H',
    bytes: 1,
    cycles: 8,
  },
  0x65: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'BIT 4, L',
    bytes: 1,
    cycles: 8,
  },
  0x66: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'BIT 4, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x67: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'BIT 4, A',
    bytes: 1,
    cycles: 8,
  },
  0x68: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'BIT 5, B',
    bytes: 1,
    cycles: 8,
  },
  0x69: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'BIT 5, C',
    bytes: 1,
    cycles: 8,
  },
  0x6a: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'BIT 5, D',
    bytes: 1,
    cycles: 8,
  },
  0x6b: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'BIT 5, E',
    bytes: 1,
    cycles: 8,
  },
  0x6c: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'BIT 5, H',
    bytes: 1,
    cycles: 8,
  },
  0x6d: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'BIT 5, L',
    bytes: 1,
    cycles: 8,
  },
  0x6e: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'BIT 5, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x6f: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'BIT 5, A',
    bytes: 1,
    cycles: 8,
  },
  0x70: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'BIT 6, B',
    bytes: 1,
    cycles: 8,
  },
  0x71: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'BIT 6, C',
    bytes: 1,
    cycles: 8,
  },
  0x72: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'BIT 6, D',
    bytes: 1,
    cycles: 8,
  },
  0x73: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'BIT 6, E',
    bytes: 1,
    cycles: 8,
  },
  0x74: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'BIT 6, H',
    bytes: 1,
    cycles: 8,
  },
  0x75: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'BIT 6, L',
    bytes: 1,
    cycles: 8,
  },
  0x76: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'BIT 6, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x77: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'BIT 6, A',
    bytes: 1,
    cycles: 8,
  },
  0x78: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'BIT 7, B',
    bytes: 1,
    cycles: 8,
  },
  0x79: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'BIT 7, C',
    bytes: 1,
    cycles: 8,
  },
  0x7a: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'BIT 7, D',
    bytes: 1,
    cycles: 8,
  },
  0x7b: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'BIT 7, E',
    bytes: 1,
    cycles: 8,
  },
  0x7c: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'BIT 7, H',
    bytes: 1,
    cycles: 8,
  },
  0x7d: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'BIT 7, L',
    bytes: 1,
    cycles: 8,
  },
  0x7e: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'BIT 7, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x7f: {
    action: bit,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'BIT 7, A',
    bytes: 1,
    cycles: 8,
  },
  0x80: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'RES 0, B',
    bytes: 1,
    cycles: 8,
  },
  0x81: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'RES 0, C',
    bytes: 1,
    cycles: 8,
  },
  0x82: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'RES 0, D',
    bytes: 1,
    cycles: 8,
  },
  0x83: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'RES 0, E',
    bytes: 1,
    cycles: 8,
  },
  0x84: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'RES 0, H',
    bytes: 1,
    cycles: 8,
  },
  0x85: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'RES 0, L',
    bytes: 1,
    cycles: 8,
  },
  0x86: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'RES 0, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x87: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RES 0, A',
    bytes: 1,
    cycles: 8,
  },
  0x88: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'RES 1, B',
    bytes: 1,
    cycles: 8,
  },
  0x89: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'RES 1, C',
    bytes: 1,
    cycles: 8,
  },
  0x8a: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'RES 1, D',
    bytes: 1,
    cycles: 8,
  },
  0x8b: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'RES 1, E',
    bytes: 1,
    cycles: 8,
  },
  0x8c: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'RES 1, H',
    bytes: 1,
    cycles: 8,
  },
  0x8d: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'RES 1, L',
    bytes: 1,
    cycles: 8,
  },
  0x8e: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'RES 1, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x8f: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RES 1, A',
    bytes: 1,
    cycles: 8,
  },
  0x90: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'RES 2, B',
    bytes: 1,
    cycles: 8,
  },
  0x91: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'RES 2, C',
    bytes: 1,
    cycles: 8,
  },
  0x92: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'RES 2, D',
    bytes: 1,
    cycles: 8,
  },
  0x93: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'RES 2, E',
    bytes: 1,
    cycles: 8,
  },
  0x94: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'RES 2, H',
    bytes: 1,
    cycles: 8,
  },
  0x95: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'RES 2, L',
    bytes: 1,
    cycles: 8,
  },
  0x96: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'RES 2, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x97: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RES 2, A',
    bytes: 1,
    cycles: 8,
  },
  0x98: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'RES 3, B',
    bytes: 1,
    cycles: 8,
  },
  0x99: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'RES 3, C',
    bytes: 1,
    cycles: 8,
  },
  0x9a: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'RES 3, D',
    bytes: 1,
    cycles: 8,
  },
  0x9b: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'RES 3, E',
    bytes: 1,
    cycles: 8,
  },
  0x9c: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'RES 3, H',
    bytes: 1,
    cycles: 8,
  },
  0x9d: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'RES 3, L',
    bytes: 1,
    cycles: 8,
  },
  0x9e: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'RES 3, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0x9f: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RES 3, A',
    bytes: 1,
    cycles: 8,
  },
  0xa0: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'RES 4, B',
    bytes: 1,
    cycles: 8,
  },
  0xa1: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'RES 4, C',
    bytes: 1,
    cycles: 8,
  },
  0xa2: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'RES 4, D',
    bytes: 1,
    cycles: 8,
  },
  0xa3: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'RES 4, E',
    bytes: 1,
    cycles: 8,
  },
  0xa4: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'RES 4, H',
    bytes: 1,
    cycles: 8,
  },
  0xa5: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'RES 4, L',
    bytes: 1,
    cycles: 8,
  },
  0xa6: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'RES 4, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0xa7: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RES 4, A',
    bytes: 1,
    cycles: 8,
  },
  0xa8: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'RES 5, B',
    bytes: 1,
    cycles: 8,
  },
  0xa9: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'RES 5, C',
    bytes: 1,
    cycles: 8,
  },
  0xaa: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'RES 5, D',
    bytes: 1,
    cycles: 8,
  },
  0xab: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'RES 5, E',
    bytes: 1,
    cycles: 8,
  },
  0xac: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'RES 5, H',
    bytes: 1,
    cycles: 8,
  },
  0xad: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'RES 5, L',
    bytes: 1,
    cycles: 8,
  },
  0xae: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'RES 5, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0xaf: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RES 5, A',
    bytes: 1,
    cycles: 8,
  },
  0xb0: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'RES 6, B',
    bytes: 1,
    cycles: 8,
  },
  0xb1: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'RES 6, C',
    bytes: 1,
    cycles: 8,
  },
  0xb2: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'RES 6, D',
    bytes: 1,
    cycles: 8,
  },
  0xb3: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'RES 6, E',
    bytes: 1,
    cycles: 8,
  },
  0xb4: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'RES 6, H',
    bytes: 1,
    cycles: 8,
  },
  0xb5: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'RES 6, L',
    bytes: 1,
    cycles: 8,
  },
  0xb6: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'RES 6, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0xb7: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RES 6, A',
    bytes: 1,
    cycles: 8,
  },
  0xb8: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'RES 7, B',
    bytes: 1,
    cycles: 8,
  },
  0xb9: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'RES 7, C',
    bytes: 1,
    cycles: 8,
  },
  0xba: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'RES 7, D',
    bytes: 1,
    cycles: 8,
  },
  0xbb: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'RES 7, E',
    bytes: 1,
    cycles: 8,
  },
  0xbc: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'RES 7, H',
    bytes: 1,
    cycles: 8,
  },
  0xbd: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'RES 7, L',
    bytes: 1,
    cycles: 8,
  },
  0xbe: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'RES 7, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0xbf: {
    action: res,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RES 7, A',
    bytes: 1,
    cycles: 8,
  },
  0xc0: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SET 0, B',
    bytes: 1,
    cycles: 8,
  },
  0xc1: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SET 0, C',
    bytes: 1,
    cycles: 8,
  },
  0xc2: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SET 0, D',
    bytes: 1,
    cycles: 8,
  },
  0xc3: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SET 0, E',
    bytes: 1,
    cycles: 8,
  },
  0xc4: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SET 0, H',
    bytes: 1,
    cycles: 8,
  },
  0xc5: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SET 0, L',
    bytes: 1,
    cycles: 8,
  },
  0xc6: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SET 0, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0xc7: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 0,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SET 0, A',
    bytes: 1,
    cycles: 8,
  },
  0xc8: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SET 1, B',
    bytes: 1,
    cycles: 8,
  },
  0xc9: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SET 1, C',
    bytes: 1,
    cycles: 8,
  },
  0xca: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SET 1, D',
    bytes: 1,
    cycles: 8,
  },
  0xcb: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SET 1, E',
    bytes: 1,
    cycles: 8,
  },
  0xcc: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SET 1, H',
    bytes: 1,
    cycles: 8,
  },
  0xcd: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SET 1, L',
    bytes: 1,
    cycles: 8,
  },
  0xce: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SET 1, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0xcf: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 1,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SET 1, A',
    bytes: 1,
    cycles: 8,
  },
  0xd0: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SET 2, B',
    bytes: 1,
    cycles: 8,
  },
  0xd1: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SET 2, C',
    bytes: 1,
    cycles: 8,
  },
  0xd2: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SET 2, D',
    bytes: 1,
    cycles: 8,
  },
  0xd3: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SET 2, E',
    bytes: 1,
    cycles: 8,
  },
  0xd4: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SET 2, H',
    bytes: 1,
    cycles: 8,
  },
  0xd5: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SET 2, L',
    bytes: 1,
    cycles: 8,
  },
  0xd6: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SET 2, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0xd7: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 2,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SET 2, A',
    bytes: 1,
    cycles: 8,
  },
  0xd8: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SET 3, B',
    bytes: 1,
    cycles: 8,
  },
  0xd9: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SET 3, C',
    bytes: 1,
    cycles: 8,
  },
  0xda: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SET 3, D',
    bytes: 1,
    cycles: 8,
  },
  0xdb: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SET 3, E',
    bytes: 1,
    cycles: 8,
  },
  0xdc: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SET 3, H',
    bytes: 1,
    cycles: 8,
  },
  0xdd: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SET 3, L',
    bytes: 1,
    cycles: 8,
  },
  0xde: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SET 3, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0xdf: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 3,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SET 3, A',
    bytes: 1,
    cycles: 8,
  },
  0xe0: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SET 4, B',
    bytes: 1,
    cycles: 8,
  },
  0xe1: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SET 4, C',
    bytes: 1,
    cycles: 8,
  },
  0xe2: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SET 4, D',
    bytes: 1,
    cycles: 8,
  },
  0xe3: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SET 4, E',
    bytes: 1,
    cycles: 8,
  },
  0xe4: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SET 4, H',
    bytes: 1,
    cycles: 8,
  },
  0xe5: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SET 4, L',
    bytes: 1,
    cycles: 8,
  },
  0xe6: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SET 4, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0xe7: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 4,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SET 4, A',
    bytes: 1,
    cycles: 8,
  },
  0xe8: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SET 5, B',
    bytes: 1,
    cycles: 8,
  },
  0xe9: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SET 5, C',
    bytes: 1,
    cycles: 8,
  },
  0xea: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SET 5, D',
    bytes: 1,
    cycles: 8,
  },
  0xeb: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SET 5, E',
    bytes: 1,
    cycles: 8,
  },
  0xec: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SET 5, H',
    bytes: 1,
    cycles: 8,
  },
  0xed: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SET 5, L',
    bytes: 1,
    cycles: 8,
  },
  0xee: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SET 5, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0xef: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 5,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SET 5, A',
    bytes: 1,
    cycles: 8,
  },
  0xf0: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SET 6, B',
    bytes: 1,
    cycles: 8,
  },
  0xf1: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SET 6, C',
    bytes: 1,
    cycles: 8,
  },
  0xf2: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SET 6, D',
    bytes: 1,
    cycles: 8,
  },
  0xf3: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SET 6, E',
    bytes: 1,
    cycles: 8,
  },
  0xf4: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SET 6, H',
    bytes: 1,
    cycles: 8,
  },
  0xf5: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SET 6, L',
    bytes: 1,
    cycles: 8,
  },
  0xf6: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SET 6, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0xf7: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 6,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SET 6, A',
    bytes: 1,
    cycles: 8,
  },
  0xf8: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SET 7, B',
    bytes: 1,
    cycles: 8,
  },
  0xf9: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SET 7, C',
    bytes: 1,
    cycles: 8,
  },
  0xfa: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SET 7, D',
    bytes: 1,
    cycles: 8,
  },
  0xfb: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SET 7, E',
    bytes: 1,
    cycles: 8,
  },
  0xfc: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SET 7, H',
    bytes: 1,
    cycles: 8,
  },
  0xfd: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SET 7, L',
    bytes: 1,
    cycles: 8,
  },
  0xfe: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SET 7, (HL)',
    bytes: 1,
    cycles: 16,
  },
  0xff: {
    action: set,
    operands: [
      {
        type: OperandType.Value,
        target: 7,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SET 7, A',
    bytes: 1,
    cycles: 8,
  },
};

export default prefixed;
