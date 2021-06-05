import * as operations from './operations';

// Prefixed Op Codes
const cbOpCodes: Record<number, OpCode> = {
  0x00: {
    action: operations.rlc_B,
    mnemonic: 'RLC B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x01: {
    action: operations.rlc_C,
    mnemonic: 'RLC C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x02: {
    action: operations.rlc_D,
    mnemonic: 'RLC D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x03: {
    action: operations.rlc_E,
    mnemonic: 'RLC E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x04: {
    action: operations.rlc_H,
    mnemonic: 'RLC H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x05: {
    action: operations.rlc_L,
    mnemonic: 'RLC L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x06: {
    action: operations.rlc_HLa,
    mnemonic: 'RLC (HL)',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x07: {
    action: operations.rlc_A,
    mnemonic: 'RLC A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x08: {
    action: operations.rrc_B,
    mnemonic: 'RRC B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x09: {
    action: operations.rrc_C,
    mnemonic: 'RRC C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x0A: {
    action: operations.rrc_D,
    mnemonic: 'RRC D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x0B: {
    action: operations.rrc_E,
    mnemonic: 'RRC E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x0C: {
    action: operations.rrc_H,
    mnemonic: 'RRC H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x0D: {
    action: operations.rrc_L,
    mnemonic: 'RRC L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x0E: {
    action: operations.rrc_HLa,
    mnemonic: 'RRC (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x0F: {
    action: operations.rrc_A,
    mnemonic: 'RRC A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x10: {
    action: operations.rl_B,
    mnemonic: 'RL B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x11: {
    action: operations.rl_C,
    mnemonic: 'RL C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x12: {
    action: operations.rl_D,
    mnemonic: 'RL D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x13: {
    action: operations.rl_E,
    mnemonic: 'RL E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x14: {
    action: operations.rl_H,
    mnemonic: 'RL H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x15: {
    action: operations.rl_L,
    mnemonic: 'RL L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x16: {
    action: operations.rl_HLa,
    mnemonic: 'RL (HL)',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x17: {
    action: operations.rl_A,
    mnemonic: 'RL A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x18: {
    action: operations.rr_B,
    mnemonic: 'RR B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x19: {
    action: operations.rr_C,
    mnemonic: 'RR C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x1A: {
    action: operations.rr_D,
    mnemonic: 'RR D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x1B: {
    action: operations.rr_E,
    mnemonic: 'RR E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x1C: {
    action: operations.rr_H,
    mnemonic: 'RR H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x1D: {
    action: operations.rr_L,
    mnemonic: 'RR L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x1E: {
    action: operations.rr_HLa,
    mnemonic: 'RR (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x1F: {
    action: operations.rr_A,
    mnemonic: 'RR A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x20: {
    action: operations.sla_B,
    mnemonic: 'SLA B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x21: {
    action: operations.sla_C,
    mnemonic: 'SLA C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x22: {
    action: operations.sla_D,
    mnemonic: 'SLA D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x23: {
    action: operations.sla_E,
    mnemonic: 'SLA E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x24: {
    action: operations.sla_H,
    mnemonic: 'SLA H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x25: {
    action: operations.sla_L,
    mnemonic: 'SLA L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x26: {
    action: operations.sla_HLa,
    mnemonic: 'SLA (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x27: {
    action: operations.sla_A,
    mnemonic: 'SLA A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x28: {
    action: operations.sra_B,
    mnemonic: 'SRA B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x29: {
    action: operations.sra_C,
    mnemonic: 'SRA C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x2A: {
    action: operations.sra_D,
    mnemonic: 'SRA D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x2B: {
    action: operations.sra_E,
    mnemonic: 'SRA E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x2C: {
    action: operations.sra_H,
    mnemonic: 'SRA H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x2D: {
    action: operations.sra_L,
    mnemonic: 'SRA L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x2E: {
    action: operations.sra_HLa,
    mnemonic: 'SRA (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x2F: {
    action: operations.sra_A,
    mnemonic: 'SRA A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x30: {
    action: operations.swp_B,
    mnemonic: 'SWP B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: null,
      H: null,
      C: null,
    }
  },
  0x31: {
    action: operations.swp_C,
    mnemonic: 'SWP C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: null,
      H: null,
      C: null,
    }
  },
  0x32: {
    action: operations.swp_D,
    mnemonic: 'SWP D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: null,
      H: null,
      C: null,
    }
  },
  0x33: {
    action: operations.swp_E,
    mnemonic: 'SWP E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: null,
      H: null,
      C: null,
    }
  },
  0x34: {
    action: operations.swp_H,
    mnemonic: 'SWP H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: null,
      H: null,
      C: null,
    }
  },
  0x35: {
    action: operations.swp_L,
    mnemonic: 'SWP L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: null,
      H: null,
      C: null,
    }
  },
  0x36: {
    action: operations.swp_HLa,
    mnemonic: 'SWP (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: null,
      H: null,
      C: null,
    }
  },
  0x37: {
    action: operations.swp_A,
    mnemonic: 'SWP A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: null,
      H: null,
      C: null,
    }
  },
  0x38: {
    action: operations.srl_B,
    mnemonic: 'SRL B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x39: {
    action: operations.srl_C,
    mnemonic: 'SRL C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x3A: {
    action: operations.srl_D,
    mnemonic: 'SRL D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x3B: {
    action: operations.srl_E,
    mnemonic: 'SRL E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x3C: {
    action: operations.srl_H,
    mnemonic: 'SRL H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x3D: {
    action: operations.srl_L,
    mnemonic: 'SRL L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x3E: {
    action: operations.srl_HLa,
    mnemonic: 'SRL (HL)',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x3F: {
    action: operations.srl_A,
    mnemonic: 'SRL A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x40: {
    action: operations.bit_0_B,
    mnemonic: 'BIT 0, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x41: {
    action: operations.bit_0_C,
    mnemonic: 'BIT 0, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x42: {
    action: operations.bit_0_D,
    mnemonic: 'BIT 0, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x43: {
    action: operations.bit_0_E,
    mnemonic: 'BIT 0, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x44: {
    action: operations.bit_0_H,
    mnemonic: 'BIT 0, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x45: {
    action: operations.bit_0_L,
    mnemonic: 'BIT 0, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x46: {
    action: operations.bit_0_HLa,
    mnemonic: 'BIT 0, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x47: {
    action: operations.bit_0_A,
    mnemonic: 'BIT 0, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x48: {
    action: operations.bit_1_B,
    mnemonic: 'BIT 1, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x49: {
    action: operations.bit_1_C,
    mnemonic: 'BIT 1, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x4A: {
    action: operations.bit_1_D,
    mnemonic: 'BIT 1, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x4B: {
    action: operations.bit_1_E,
    mnemonic: 'BIT 1, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x4C: {
    action: operations.bit_1_H,
    mnemonic: 'BIT 1, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x4D: {
    action: operations.bit_1_L,
    mnemonic: 'BIT 1, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x4E: {
    action: operations.bit_1_HLa,
    mnemonic: 'BIT 1, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x4F: {
    action: operations.bit_1_A,
    mnemonic: 'BIT 1, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x50: {
    action: operations.bit_2_B,
    mnemonic: 'BIT 2, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x51: {
    action: operations.bit_2_C,
    mnemonic: 'BIT 2, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x52: {
    action: operations.bit_2_D,
    mnemonic: 'BIT 2, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x53: {
    action: operations.bit_2_E,
    mnemonic: 'BIT 2, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x54: {
    action: operations.bit_2_H,
    mnemonic: 'BIT 2, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x55: {
    action: operations.bit_2_L,
    mnemonic: 'BIT 2, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x56: {
    action: operations.bit_2_HLa,
    mnemonic: 'BIT 2, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x57: {
    action: operations.bit_2_A,
    mnemonic: 'BIT 2, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x58: {
    action: operations.bit_3_B,
    mnemonic: 'BIT 3, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x59: {
    action: operations.bit_3_C,
    mnemonic: 'BIT 3, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x5A: {
    action: operations.bit_3_D,
    mnemonic: 'BIT 3, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x5B: {
    action: operations.bit_3_E,
    mnemonic: 'BIT 3, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x5C: {
    action: operations.bit_3_H,
    mnemonic: 'BIT 3, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x5D: {
    action: operations.bit_3_L,
    mnemonic: 'BIT 3, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x5E: {
    action: operations.bit_3_HLa,
    mnemonic: 'BIT 3, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x5F: {
    action: operations.bit_3_A,
    mnemonic: 'BIT 3, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x60: {
    action: operations.bit_4_B,
    mnemonic: 'BIT 4, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x61: {
    action: operations.bit_4_C,
    mnemonic: 'BIT 4, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x62: {
    action: operations.bit_4_D,
    mnemonic: 'BIT 4, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x63: {
    action: operations.bit_4_E,
    mnemonic: 'BIT 4, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x64: {
    action: operations.bit_4_H,
    mnemonic: 'BIT 4, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x65: {
    action: operations.bit_4_L,
    mnemonic: 'BIT 4, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x66: {
    action: operations.bit_4_HLa,
    mnemonic: 'BIT 4, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x67: {
    action: operations.bit_4_A,
    mnemonic: 'BIT 4, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x68: {
    action: operations.bit_5_B,
    mnemonic: 'BIT 5, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x69: {
    action: operations.bit_5_C,
    mnemonic: 'BIT 5, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x6A: {
    action: operations.bit_5_D,
    mnemonic: 'BIT 5, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x6B: {
    action: operations.bit_5_E,
    mnemonic: 'BIT 5, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x6C: {
    action: operations.bit_5_H,
    mnemonic: 'BIT 5, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x6D: {
    action: operations.bit_5_L,
    mnemonic: 'BIT 5, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x6E: {
    action: operations.bit_5_HLa,
    mnemonic: 'BIT 5, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x6F: {
    action: operations.bit_5_A,
    mnemonic: 'BIT 5, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x70: {
    action: operations.bit_6_B,
    mnemonic: 'BIT 6, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x71: {
    action: operations.bit_6_C,
    mnemonic: 'BIT 6, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x72: {
    action: operations.bit_6_D,
    mnemonic: 'BIT 6, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x73: {
    action: operations.bit_6_E,
    mnemonic: 'BIT 6, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x74: {
    action: operations.bit_6_H,
    mnemonic: 'BIT 6, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x75: {
    action: operations.bit_6_L,
    mnemonic: 'BIT 6, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x76: {
    action: operations.bit_6_HLa,
    mnemonic: 'BIT 6, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x77: {
    action: operations.bit_6_A,
    mnemonic: 'BIT 6, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x78: {
    action: operations.bit_7_B,
    mnemonic: 'BIT 7, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x79: {
    action: operations.bit_7_C,
    mnemonic: 'BIT 7, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x7A: {
    action: operations.bit_7_D,
    mnemonic: 'BIT 7, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x7B: {
    action: operations.bit_7_E,
    mnemonic: 'BIT 7, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x7C: {
    action: operations.bit_7_H,
    mnemonic: 'BIT 7, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x7D: {
    action: operations.bit_7_L,
    mnemonic: 'BIT 7, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x7E: {
    action: operations.bit_7_HLa,
    mnemonic: 'BIT 7, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x7F: {
    action: operations.bit_7_A,
    mnemonic: 'BIT 7, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: '1',
      C: null,
    }
  },
  0x80: {
    action: operations.res_0_B,
    mnemonic: 'RES 0, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x81: {
    action: operations.res_0_C,
    mnemonic: 'RES 0, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x82: {
    action: operations.res_0_D,
    mnemonic: 'RES 0, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x83: {
    action: operations.res_0_E,
    mnemonic: 'RES 0, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x84: {
    action: operations.res_0_H,
    mnemonic: 'RES 0, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x85: {
    action: operations.res_0_L,
    mnemonic: 'RES 0, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x86: {
    action: operations.res_0_HLa,
    mnemonic: 'RES 0, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x87: {
    action: operations.res_0_A,
    mnemonic: 'RES 0, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x88: {
    action: operations.res_1_B,
    mnemonic: 'RES 1, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x89: {
    action: operations.res_1_C,
    mnemonic: 'RES 1, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x8A: {
    action: operations.res_1_D,
    mnemonic: 'RES 1, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x8B: {
    action: operations.res_1_E,
    mnemonic: 'RES 1, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x8C: {
    action: operations.res_1_H,
    mnemonic: 'RES 1, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x8D: {
    action: operations.res_1_L,
    mnemonic: 'RES 1, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x8E: {
    action: operations.res_1_HLa,
    mnemonic: 'RES 1, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x8F: {
    action: operations.res_1_A,
    mnemonic: 'RES 1, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x90: {
    action: operations.res_2_B,
    mnemonic: 'RES 2, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x91: {
    action: operations.res_2_C,
    mnemonic: 'RES 2, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x92: {
    action: operations.res_2_D,
    mnemonic: 'RES 2, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x93: {
    action: operations.res_2_E,
    mnemonic: 'RES 2, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x94: {
    action: operations.res_2_H,
    mnemonic: 'RES 2, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x95: {
    action: operations.res_2_L,
    mnemonic: 'RES 2, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x96: {
    action: operations.res_2_HLa,
    mnemonic: 'RES 2, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x97: {
    action: operations.res_2_A,
    mnemonic: 'RES 2, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x98: {
    action: operations.res_3_B,
    mnemonic: 'RES 3, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x99: {
    action: operations.res_3_C,
    mnemonic: 'RES 3, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x9A: {
    action: operations.res_3_D,
    mnemonic: 'RES 3, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x9B: {
    action: operations.res_3_E,
    mnemonic: 'RES 3, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x9C: {
    action: operations.res_3_H,
    mnemonic: 'RES 3, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x9D: {
    action: operations.res_3_L,
    mnemonic: 'RES 3, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x9E: {
    action: operations.res_3_HLa,
    mnemonic: 'RES 3, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x9F: {
    action: operations.res_3_A,
    mnemonic: 'RES 3, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xA0: {
    action: operations.res_4_B,
    mnemonic: 'RES 4, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xA1: {
    action: operations.res_4_C,
    mnemonic: 'RES 4, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xA2: {
    action: operations.res_4_D,
    mnemonic: 'RES 4, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xA3: {
    action: operations.res_4_E,
    mnemonic: 'RES 4, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xA4: {
    action: operations.res_4_H,
    mnemonic: 'RES 4, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xA5: {
    action: operations.res_4_L,
    mnemonic: 'RES 4, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xA6: {
    action: operations.res_4_HLa,
    mnemonic: 'RES 4, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xA7: {
    action: operations.res_4_A,
    mnemonic: 'RES 4, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xA8: {
    action: operations.res_5_B,
    mnemonic: 'RES 5, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xA9: {
    action: operations.res_5_C,
    mnemonic: 'RES 5, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xAA: {
    action: operations.res_5_D,
    mnemonic: 'RES 5, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xAB: {
    action: operations.res_5_E,
    mnemonic: 'RES 5, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xAC: {
    action: operations.res_5_H,
    mnemonic: 'RES 5, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xAD: {
    action: operations.res_5_L,
    mnemonic: 'RES 5, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xAE: {
    action: operations.res_5_HLa,
    mnemonic: 'RES 5, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xAF: {
    action: operations.res_5_A,
    mnemonic: 'RES 5, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xB0: {
    action: operations.res_6_B,
    mnemonic: 'RES 6, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xB1: {
    action: operations.res_6_C,
    mnemonic: 'RES 6, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xB2: {
    action: operations.res_6_D,
    mnemonic: 'RES 6, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xB3: {
    action: operations.res_6_E,
    mnemonic: 'RES 6, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xB4: {
    action: operations.res_6_H,
    mnemonic: 'RES 6, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xB5: {
    action: operations.res_6_L,
    mnemonic: 'RES 6, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xB6: {
    action: operations.res_6_HLa,
    mnemonic: 'RES 6, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xB7: {
    action: operations.res_6_A,
    mnemonic: 'RES 6, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xB8: {
    action: operations.res_7_B,
    mnemonic: 'RES 7, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xB9: {
    action: operations.res_7_C,
    mnemonic: 'RES 7, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xBA: {
    action: operations.res_7_D,
    mnemonic: 'RES 7, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xBB: {
    action: operations.res_7_E,
    mnemonic: 'RES 7, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xBC: {
    action: operations.res_7_H,
    mnemonic: 'RES 7, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xBD: {
    action: operations.res_7_L,
    mnemonic: 'RES 7, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xBE: {
    action: operations.res_7_HLa,
    mnemonic: 'RES 7, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xBF: {
    action: operations.res_7_A,
    mnemonic: 'RES 7, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC0: {
    action: operations.set_0_B,
    mnemonic: 'SET 0, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC1: {
    action: operations.set_0_C,
    mnemonic: 'SET 0, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC2: {
    action: operations.set_0_D,
    mnemonic: 'SET 0, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC3: {
    action: operations.set_0_E,
    mnemonic: 'SET 0, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC4: {
    action: operations.set_0_H,
    mnemonic: 'SET 0, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC5: {
    action: operations.set_0_L,
    mnemonic: 'SET 0, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC6: {
    action: operations.set_0_HLa,
    mnemonic: 'SET 0, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC7: {
    action: operations.set_0_A,
    mnemonic: 'SET 0, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC8: {
    action: operations.set_1_B,
    mnemonic: 'SET 1, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC9: {
    action: operations.set_1_C,
    mnemonic: 'SET 1, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xCA: {
    action: operations.set_1_D,
    mnemonic: 'SET 1, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xCB: {
    action: operations.set_1_E,
    mnemonic: 'SET 1, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xCC: {
    action: operations.set_1_H,
    mnemonic: 'SET 1, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xCD: {
    action: operations.set_1_L,
    mnemonic: 'SET 1, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xCE: {
    action: operations.set_1_HLa,
    mnemonic: 'SET 1, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xCF: {
    action: operations.set_1_A,
    mnemonic: 'SET 1, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD0: {
    action: operations.set_2_B,
    mnemonic: 'SET 2, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD1: {
    action: operations.set_2_C,
    mnemonic: 'SET 2, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD2: {
    action: operations.set_2_D,
    mnemonic: 'SET 2, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD3: {
    action: operations.set_2_E,
    mnemonic: 'SET 2, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD4: {
    action: operations.set_2_H,
    mnemonic: 'SET 2, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD5: {
    action: operations.set_2_L,
    mnemonic: 'SET 2, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD6: {
    action: operations.set_2_HLa,
    mnemonic: 'SET 2, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD7: {
    action: operations.set_2_A,
    mnemonic: 'SET 2, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD8: {
    action: operations.set_3_B,
    mnemonic: 'SET 3, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD9: {
    action: operations.set_3_C,
    mnemonic: 'SET 3, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xDA: {
    action: operations.set_3_D,
    mnemonic: 'SET 3, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xDB: {
    action: operations.set_3_E,
    mnemonic: 'SET 3, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xDC: {
    action: operations.set_3_H,
    mnemonic: 'SET 3, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xDD: {
    action: operations.set_3_L,
    mnemonic: 'SET 3, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xDE: {
    action: operations.set_3_HLa,
    mnemonic: 'SET 3, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xDF: {
    action: operations.set_3_A,
    mnemonic: 'SET 3, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE0: {
    action: operations.set_4_B,
    mnemonic: 'SET 4, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE1: {
    action: operations.set_4_C,
    mnemonic: 'SET 4, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE2: {
    action: operations.set_4_D,
    mnemonic: 'SET 4, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE3: {
    action: operations.set_4_E,
    mnemonic: 'SET 4, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE4: {
    action: operations.set_4_H,
    mnemonic: 'SET 4, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE5: {
    action: operations.set_4_L,
    mnemonic: 'SET 4, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE6: {
    action: operations.set_4_HLa,
    mnemonic: 'SET 4, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE7: {
    action: operations.set_4_A,
    mnemonic: 'SET 4, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE8: {
    action: operations.set_5_B,
    mnemonic: 'SET 5, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE9: {
    action: operations.set_5_C,
    mnemonic: 'SET 5, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xEA: {
    action: operations.set_5_D,
    mnemonic: 'SET 5, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xEB: {
    action: operations.set_5_E,
    mnemonic: 'SET 5, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xEC: {
    action: operations.set_5_H,
    mnemonic: 'SET 5, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xED: {
    action: operations.set_5_L,
    mnemonic: 'SET 5, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xEE: {
    action: operations.set_5_HLa,
    mnemonic: 'SET 5, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xEF: {
    action: operations.set_5_A,
    mnemonic: 'SET 5, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF0: {
    action: operations.set_6_B,
    mnemonic: 'SET 6, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF1: {
    action: operations.set_6_C,
    mnemonic: 'SET 6, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF2: {
    action: operations.set_6_D,
    mnemonic: 'SET 6, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF3: {
    action: operations.set_6_E,
    mnemonic: 'SET 6, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF4: {
    action: operations.set_6_H,
    mnemonic: 'SET 6, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF5: {
    action: operations.set_6_L,
    mnemonic: 'SET 6, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF6: {
    action: operations.set_6_HLa,
    mnemonic: 'SET 6, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF7: {
    action: operations.set_6_A,
    mnemonic: 'SET 6, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF8: {
    action: operations.set_7_B,
    mnemonic: 'SET 7, B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF9: {
    action: operations.set_7_C,
    mnemonic: 'SET 7, C',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xFA: {
    action: operations.set_7_D,
    mnemonic: 'SET 7, D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xFB: {
    action: operations.set_7_E,
    mnemonic: 'SET 7, E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xFC: {
    action: operations.set_7_H,
    mnemonic: 'SET 7, H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xFD: {
    action: operations.set_7_L,
    mnemonic: 'SET 7, L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xFE: {
    action: operations.set_7_HLa,
    mnemonic: 'SET 7, (HL)',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xFF: {
    action: operations.set_7_A,
    mnemonic: 'SET 7, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  }
}

export default cbOpCodes;
