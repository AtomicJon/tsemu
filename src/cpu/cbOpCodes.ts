import * as operations from './operations';

// Prefixed Op Codes
const cbOpCodes: Record<number, OpCode> = {
  0x10: {
    action: operations.rlB,
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
    action: operations.rlC,
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
    action: operations.rlD,
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
    action: operations.rlE,
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
    action: operations.rlH,
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
    action: operations.rlL,
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
    action: operations.rlHLa,
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
    action: operations.rlA,
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
}

export default cbOpCodes;
