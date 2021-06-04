import * as operations from './operations';

const opCodes: Record<number, OpCode> = {
  0x00: {
    action: operations.nop,
    mnemonic: 'NOP',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x01: {
    action: operations.ld_BC_d16,
    mnemonic: 'LD BC, d16',
    bytes: 3,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x02: {
    action: operations.ld_BCa_A,
    mnemonic: 'LD (BC), A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x03: {
    action: operations.inc_BC,
    mnemonic: 'INC BC',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x04: {
    action: operations.inc_B,
    mnemonic: 'INC B',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: null,
    }
  },
  0x05: {
    action: operations.dec_B,
    mnemonic: 'DEC B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: null,
    }
  },
  0x06: {
    action: operations.ld_B_d8,
    mnemonic: 'LD B, d8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x07: {
    action: operations.rlca,
    mnemonic: 'RLCA',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x08: {
    action: operations.ld_a16_SP,
    mnemonic: 'LD (a16), SP',
    bytes: 3,
    cycles: 20,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x09: {
    action: operations.add_HL_BC,
    mnemonic: 'LD HL, BC',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x0A: {
    action: operations.ld_A_BCa,
    mnemonic: 'LD A, (BC)',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x0B: {
    action: operations.dec_BC,
    mnemonic: 'DEC BC',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x0C: {
    action: operations.inc_C,
    mnemonic: 'INC C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: null,
    }
  },
  0x0D: {
    action: operations.dec_C,
    mnemonic: 'DEC C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: null,
    }
  },
  0x0E: {
    action: operations.ld_C_d8,
    mnemonic: 'LD C, d8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x11: {
    action: operations.ld_DE_d16,
    mnemonic: 'LD DE, d16',
    bytes: 3,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x12: {
    action: operations.ld_DEa_A,
    mnemonic: 'LD (DE), A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x13: {
    action: operations.inc_DE,
    mnemonic: 'INC DE',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x14: {
    action: operations.inc_D,
    mnemonic: 'INC D',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: null,
    }
  },
  0x15: {
    action: operations.dec_D,
    mnemonic: 'DEC D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: null,
    }
  },
  0x16: {
    action: operations.ld_D_d8,
    mnemonic: 'LD D, d8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x17: {
    action: operations.rlA,
    mnemonic: 'RLA',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '0',
      H: '0',
      C: 'C',
    }
  },
  0x18: {
    action: operations.jr_r8,
    mnemonic: 'JR n',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x19: {
    action: operations.add_HL_DE,
    mnemonic: 'LD HL, DE',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x1A: {
    action: operations.ld_A_DEa,
    mnemonic: 'LD A, (DE)',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x1C: {
    action: operations.inc_E,
    mnemonic: 'INC E',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: null,
    }
  },
  0x1D: {
    action: operations.dec_E,
    mnemonic: 'DEC E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: null,
    }
  },
  0x1E: {
    action: operations.ld_E_d8,
    mnemonic: 'LD E, d8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x20: {
    action: operations.jr_nz_r8,
    mnemonic: 'JR NZ, R8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x21: {
    action: operations.ld_HL_d16,
    mnemonic: 'LD HL, d16',
    bytes: 3,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x22: {
    action: operations.ld_HLi_A,
    mnemonic: 'LD (HL)+, A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x23: {
    action: operations.inc_HL,
    mnemonic: 'INC HL',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x24: {
    action: operations.inc_H,
    mnemonic: 'INC H',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: null,
    }
  },
  0x25: {
    action: operations.dec_H,
    mnemonic: 'DEC H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: null,
    }
  },
  0x26: {
    action: operations.ld_H_d8,
    mnemonic: 'LD H, d8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x28: {
    action: operations.jr_z_r8,
    mnemonic: 'JR Z, R8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x29: {
    action: operations.add_HL_HL,
    mnemonic: 'LD HL, HL',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x2A: {
    action: operations.ld_A_HLi,
    mnemonic: 'LD A, HL+',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x2C: {
    action: operations.inc_L,
    mnemonic: 'INC L',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: null,
    }
  },
  0x2D: {
    action: operations.dec_L,
    mnemonic: 'DEC L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: null,
    }
  },
  0x2E: {
    action: operations.ld_L_d8,
    mnemonic: 'LD L, d8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x2F: {
    action: operations.cpl,
    mnemonic: 'CPL',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: "1",
      H: "1",
      C: null,
    }
  },
  0x30: {
    action: operations.jr_nc_r8,
    mnemonic: 'JR NC, R8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x31: {
    action: operations.ld_SP_d16,
    mnemonic: 'LD SP, d16',
    bytes: 3,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x32: {
    action: operations.ld_HLDa_A,
    mnemonic: 'LD (HLD), A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x33: {
    action: operations.inc_SP,
    mnemonic: 'INC SP',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x34: {
    action: operations.inc_HLa,
    mnemonic: 'INC (HL)',
    bytes: 1,
    cycles: 12,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: null,
    }
  },
  0x35: {
    action: operations.dec_HLa,
    mnemonic: 'DEC (HL)',
    bytes: 1,
    cycles: 12,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: null,
    }
  },
  0x36: {
    action: operations.ld_HLa_d8,
    mnemonic: 'LD (HL), d8',
    bytes: 2,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x37: {
    action: operations.scf,
    mnemonic: 'SCF',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: '0',
      H: '0',
      C: '1',
    }
  },
  0x38: {
    action: operations.jr_c_r8,
    mnemonic: 'JR C, R8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x39: {
    action: operations.add_HL_SP,
    mnemonic: 'LD HL, SP',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x3A: {
    action: operations.ld_A_HLd,
    mnemonic: 'LD A,(HL-)',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x3C: {
    action: operations.inc_A,
    mnemonic: 'INC A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: null,
    }
  },
  0x3D: {
    action: operations.dec_A,
    mnemonic: 'DEC A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: null,
    }
  },
  0x3E: {
    action: operations.ld_A_d8,
    mnemonic: 'LD A, d8',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x3F: {
    action: operations.ccf,
    mnemonic: 'CCF',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: '0',
      H: '0',
      C: '!C',
    }
  },
  0x40: {
    action: operations.ld_B_B,
    mnemonic: 'LD B, B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x41: {
    action: operations.ld_B_C,
    mnemonic: 'LD B, C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x42: {
    action: operations.ld_B_D,
    mnemonic: 'LD B, D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x43: {
    action: operations.ld_B_E,
    mnemonic: 'LD B, E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x44: {
    action: operations.ld_B_H,
    mnemonic: 'LD B, H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x45: {
    action: operations.ld_B_L,
    mnemonic: 'LD B, L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x46: {
    action: operations.ld_B_HLa,
    mnemonic: 'LD B, (HL)',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x47: {
    action: operations.ld_B_A,
    mnemonic: 'LD B, A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x48: {
    action: operations.ld_C_B,
    mnemonic: 'LD C, B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x49: {
    action: operations.ld_C_C,
    mnemonic: 'LD C, C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x4A: {
    action: operations.ld_C_D,
    mnemonic: 'LD C, D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x4B: {
    action: operations.ld_C_E,
    mnemonic: 'LD C, E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x4C: {
    action: operations.ld_C_H,
    mnemonic: 'LD C, H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x4D: {
    action: operations.ld_C_L,
    mnemonic: 'LD C, L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x4E: {
    action: operations.ld_C_HLa,
    mnemonic: 'LD C, (HL)',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x4F: {
    action: operations.ld_C_A,
    mnemonic: 'LD C, A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x50: {
    action: operations.ld_D_B,
    mnemonic: 'LD D, B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x51: {
    action: operations.ld_D_C,
    mnemonic: 'LD D, C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x52: {
    action: operations.ld_D_D,
    mnemonic: 'LD D, D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x53: {
    action: operations.ld_D_E,
    mnemonic: 'LD D, E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x54: {
    action: operations.ld_D_H,
    mnemonic: 'LD D, H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x55: {
    action: operations.ld_D_L,
    mnemonic: 'LD D, L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x56: {
    action: operations.ld_D_HLa,
    mnemonic: 'LD D, (HL)',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x57: {
    action: operations.ld_D_A,
    mnemonic: 'LD D, A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x58: {
    action: operations.ld_E_B,
    mnemonic: 'LD E, B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x59: {
    action: operations.ld_E_C,
    mnemonic: 'LD E, C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x5A: {
    action: operations.ld_E_D,
    mnemonic: 'LD E, D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x5B: {
    action: operations.ld_E_E,
    mnemonic: 'LD E, E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x5C: {
    action: operations.ld_E_H,
    mnemonic: 'LD E, H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x5D: {
    action: operations.ld_E_L,
    mnemonic: 'LD E, L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x5E: {
    action: operations.ld_E_HLa,
    mnemonic: 'LD E, (HL)',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x5F: {
    action: operations.ld_E_A,
    mnemonic: 'LD E, A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x60: {
    action: operations.ld_H_B,
    mnemonic: 'LD H, B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x61: {
    action: operations.ld_H_C,
    mnemonic: 'LD H, C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x62: {
    action: operations.ld_H_D,
    mnemonic: 'LD H, D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x63: {
    action: operations.ld_H_E,
    mnemonic: 'LD H, E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x64: {
    action: operations.ld_H_H,
    mnemonic: 'LD H, H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x65: {
    action: operations.ld_H_L,
    mnemonic: 'LD H, L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x66: {
    action: operations.ld_H_HLa,
    mnemonic: 'LD H, (HL)',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x67: {
    action: operations.ld_H_A,
    mnemonic: 'LD H, A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x68: {
    action: operations.ld_L_B,
    mnemonic: 'LD L, B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x69: {
    action: operations.ld_L_C,
    mnemonic: 'LD L, C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x6A: {
    action: operations.ld_L_D,
    mnemonic: 'LD L, D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x6B: {
    action: operations.ld_L_E,
    mnemonic: 'LD L, E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x6C: {
    action: operations.ld_L_H,
    mnemonic: 'LD L, H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x6D: {
    action: operations.ld_L_L,
    mnemonic: 'LD L, L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x6E: {
    action: operations.ld_L_HLa,
    mnemonic: 'LD L, (HL)',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x6F: {
    action: operations.ld_L_A,
    mnemonic: 'LD L, A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x70: {
    action: operations.ld_HLa_B,
    mnemonic: 'LD (HL), B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x71: {
    action: operations.ld_HLa_C,
    mnemonic: 'LD (HL), C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x72: {
    action: operations.ld_HLa_D,
    mnemonic: 'LD (HL), D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x73: {
    action: operations.ld_HLa_E,
    mnemonic: 'LD (HL), E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x74: {
    action: operations.ld_HLa_H,
    mnemonic: 'LD (HL), H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x75: {
    action: operations.ld_HLa_L,
    mnemonic: 'LD (HL), L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x77: {
    action: operations.ld_HLa_A,
    mnemonic: 'LD (HL), A',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x78: {
    action: operations.ld_A_B,
    mnemonic: 'LD A, B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x79: {
    action: operations.ld_A_C,
    mnemonic: 'LD A, C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x7A: {
    action: operations.ld_A_D,
    mnemonic: 'LD A, D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x7B: {
    action: operations.ld_A_E,
    mnemonic: 'LD A, E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x7C: {
    action: operations.ld_A_H,
    mnemonic: 'LD A, H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x7D: {
    action: operations.ld_A_L,
    mnemonic: 'LD A, L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x7E: {
    action: operations.ld_A_HLa,
    mnemonic: 'LD A, (HL)',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x7F: {
    action: operations.ld_A_A,
    mnemonic: 'LD A, A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0x80: {
    action: operations.add_A_B,
    mnemonic: 'ADD A, B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: 'C',
    }
  },
  0x81: {
    action: operations.add_A_C,
    mnemonic: 'ADD A, C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: 'C',
    }
  },
  0x82: {
    action: operations.add_A_D,
    mnemonic: 'ADD A, D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: 'C',
    }
  },
  0x83: {
    action: operations.add_A_E,
    mnemonic: 'ADD A, E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: 'C',
    }
  },
  0x84: {
    action: operations.add_A_H,
    mnemonic: 'ADD A, H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: 'C',
    }
  },
  0x85: {
    action: operations.add_A_L,
    mnemonic: 'ADD A, L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: 'C',
    }
  },
  0x86: {
    action: operations.add_A_HLa,
    mnemonic: 'ADD A, (HL)',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: 'C',
    }
  },
  0x87: {
    action: operations.add_A_A,
    mnemonic: 'ADD A, A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: 'C',
    }
  },
  0x90: {
    action: operations.sub_B,
    mnemonic: 'SUB B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "1",
      H: "H",
      C: "C",
    }
  },
  0x91: {
    action: operations.sub_C,
    mnemonic: 'SUB C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "1",
      H: "H",
      C: "C",
    }
  },
  0x92: {
    action: operations.sub_D,
    mnemonic: 'SUB D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "1",
      H: "H",
      C: "C",
    }
  },
  0x93: {
    action: operations.sub_E,
    mnemonic: 'SUB E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "1",
      H: "H",
      C: "C",
    }
  },
  0x94: {
    action: operations.sub_H,
    mnemonic: 'SUB H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "1",
      H: "H",
      C: "C",
    }
  },
  0x95: {
    action: operations.sub_L,
    mnemonic: 'SUB L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "1",
      H: "H",
      C: "C",
    }
  },
  0x96: {
    action: operations.sub_HLa,
    mnemonic: 'SUB (HL)',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: "Z",
      N: "1",
      H: "H",
      C: "C",
    }
  },
  0x97: {
    action: operations.sub_A,
    mnemonic: 'SUB A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "1",
      H: "H",
      C: "C",
    }
  },
  0xA0: {
    action: operations.and_B,
    mnemonic: 'AND B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "0",
      H: "1",
      C: "0",
    }
  },
  0xA1: {
    action: operations.and_C,
    mnemonic: 'AND C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "0",
      H: "1",
      C: "0",
    }
  },
  0xA2: {
    action: operations.and_D,
    mnemonic: 'AND D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "0",
      H: "1",
      C: "0",
    }
  },
  0xA3: {
    action: operations.and_E,
    mnemonic: 'AND E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "0",
      H: "1",
      C: "0",
    }
  },
  0xA4: {
    action: operations.and_H,
    mnemonic: 'AND B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "0",
      H: "1",
      C: "0",
    }
  },
  0xA5: {
    action: operations.and_L,
    mnemonic: 'AND L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "0",
      H: "1",
      C: "0",
    }
  },
  0xA6: {
    action: operations.and_HLa,
    mnemonic: 'AND (HL)',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: "Z",
      N: "0",
      H: "1",
      C: "0",
    }
  },
  0xA7: {
    action: operations.and_A,
    mnemonic: 'AND A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: "0",
      H: "1",
      C: "0",
    }
  },
  0xA8: {
    action: operations.xor_B,
    mnemonic: 'XOR B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: null,
      H: null,
      C: null,
    }
  },
  0xA9: {
    action: operations.xor_C,
    mnemonic: 'XOR C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: null,
      H: null,
      C: null,
    }
  },
  0xAA: {
    action: operations.xor_D,
    mnemonic: 'XOR D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: null,
      H: null,
      C: null,
    }
  },
  0xAB: {
    action: operations.xor_E,
    mnemonic: 'XOR E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: null,
      H: null,
      C: null,
    }
  },
  0xAC: {
    action: operations.xor_H,
    mnemonic: 'XOR H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: null,
      H: null,
      C: null,
    }
  },
  0xAD: {
    action: operations.xor_L,
    mnemonic: 'XOR L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: null,
      H: null,
      C: null,
    }
  },
  0xAE: {
    action: operations.xor_HLa,
    mnemonic: 'XOR (HL)',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: "Z",
      N: null,
      H: null,
      C: null,
    }
  },
  0xAF: {
    action: operations.xor_A,
    mnemonic: 'XOR A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "1",
      N: null,
      H: null,
      C: null,
    }
  },
  0xB0: {
    action: operations.or_B,
    mnemonic: 'OR B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: null,
      H: null,
      C: null,
    }
  },
  0xB1: {
    action: operations.or_C,
    mnemonic: 'OR C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "1",
      N: null,
      H: null,
      C: null,
    }
  },
  0xB2: {
    action: operations.or_D,
    mnemonic: 'OR D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "1",
      N: null,
      H: null,
      C: null,
    }
  },
  0xB3: {
    action: operations.or_E,
    mnemonic: 'OR E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "1",
      N: null,
      H: null,
      C: null,
    }
  },
  0xB4: {
    action: operations.or_H,
    mnemonic: 'OR H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "1",
      N: null,
      H: null,
      C: null,
    }
  },
  0xB5: {
    action: operations.or_L,
    mnemonic: 'OR L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "1",
      N: null,
      H: null,
      C: null,
    }
  },
  0xB6: {
    action: operations.or_HLa,
    mnemonic: 'OR (HL)',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "1",
      N: null,
      H: null,
      C: null,
    }
  },
  0xB7: {
    action: operations.or_A,
    mnemonic: 'OR A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: "Z",
      N: null,
      H: null,
      C: null,
    }
  },
  0xB8: {
    action: operations.cp_B,
    mnemonic: 'CP B',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: 'C',
    }
  },
  0xB9: {
    action: operations.cp_C,
    mnemonic: 'CP C',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: 'C',
    }
  },
  0xBA: {
    action: operations.cp_D,
    mnemonic: 'CP D',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: 'C',
    }
  },
  0xBB: {
    action: operations.cp_E,
    mnemonic: 'CP E',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: 'C',
    }
  },
  0xBC: {
    action: operations.cp_H,
    mnemonic: 'CP H',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: 'C',
    }
  },
  0xBD: {
    action: operations.cp_L,
    mnemonic: 'CP L',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: 'C',
    }
  },
  0xBE: {
    action: operations.cp_HLa,
    mnemonic: 'CP (HL)',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: 'C',
    }
  },
  0xBF: {
    action: operations.cp_A,
    mnemonic: 'CP A',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: 'C',
    }
  },
  0xC0: {
    action: operations.ret_nz,
    mnemonic: 'RET NZ',
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
    action: operations.pop_BC,
    mnemonic: 'POP BC',
    bytes: 1,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC2: {
    action: operations.jp_nz_a16,
    mnemonic: 'JP NZ a16',
    bytes: 1,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC3: {
    action: operations.jp_a16,
    mnemonic: 'JP a16',
    bytes: 3,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC4: {
    action: operations.call_nz_a16,
    mnemonic: 'CALL NZ, a16',
    bytes: 3,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC5: {
    action: operations.push_BC,
    mnemonic: 'PUSH BC',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC6: {
    action: operations.add_A_d8,
    mnemonic: 'ADD A, d8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '0',
      H: 'H',
      C: 'C',
    }
  },
  0xC7: {
    action: operations.rst_00,
    mnemonic: 'RST 00',
    bytes: 1,
    cycles: 32,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xC8: {
    action: operations.ret_z,
    mnemonic: 'RET Z',
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
    action: operations.ret,
    mnemonic: 'RET',
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
    action: operations.jp_z_a16,
    mnemonic: 'JP Z a16',
    bytes: 1,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xCC: {
    action: operations.call_z_a16,
    mnemonic: 'CALL Z, a16',
    bytes: 3,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xCD: {
    action: operations.call_a16,
    mnemonic: 'CALL a16',
    bytes: 3,
    cycles: 24,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xCF: {
    action: operations.rst_08,
    mnemonic: 'RST 08',
    bytes: 1,
    cycles: 32,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD0: {
    action: operations.ret_nc,
    mnemonic: 'RET NC',
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
    action: operations.pop_DE,
    mnemonic: 'POP DE',
    bytes: 1,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD2: {
    action: operations.jp_nc_a16,
    mnemonic: 'JP NC a16',
    bytes: 1,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD4: {
    action: operations.call_nc_a16,
    mnemonic: 'CALL NC, a16',
    bytes: 3,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD5: {
    action: operations.push_DE,
    mnemonic: 'PUSH DE',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD6: {
    action: operations.sub_d8,
    mnemonic: 'SUB d8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: "Z",
      N: "1",
      H: "H",
      C: "C",
    }
  },
  0xD7: {
    action: operations.rst_10,
    mnemonic: 'RST 10',
    bytes: 1,
    cycles: 32,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xD8: {
    action: operations.ret_c,
    mnemonic: 'RET C',
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
    action: operations.reti,
    mnemonic: 'RETI',
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
    action: operations.jp_nz_a16,
    mnemonic: 'JP C a16',
    bytes: 1,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xDC: {
    action: operations.call_c_a16,
    mnemonic: 'CALL C, a16',
    bytes: 3,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xDF: {
    action: operations.rst_18,
    mnemonic: 'RST 18',
    bytes: 1,
    cycles: 32,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE0: {
    action: operations.ldh_a8_A,
    mnemonic: 'LDH a8, A',
    bytes: 2,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE1: {
    action: operations.pop_HL,
    mnemonic: 'POP HL',
    bytes: 1,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE2: {
    action: operations.ld_Ca_A,
    mnemonic: 'LD (C), A',
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
    action: operations.push_HL,
    mnemonic: 'PUSH HL',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE6: {
    action: operations.and_d8,
    mnemonic: 'AND d8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE7: {
    action: operations.rst_20,
    mnemonic: 'RST 20',
    bytes: 1,
    cycles: 32,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xE9: {
    action: operations.jp_HL,
    mnemonic: 'JP HL',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xEA: {
    action: operations.ld_a16_A,
    mnemonic: 'LDH a16, A',
    bytes: 3,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xEE: {
    action: operations.xor_d8,
    mnemonic: 'XOR d8',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: "Z",
      N: null,
      H: null,
      C: null,
    }
  },
  0xEF: {
    action: operations.rst_28,
    mnemonic: 'RST 28',
    bytes: 1,
    cycles: 32,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF0: {
    action: operations.ldh_A_a8,
    mnemonic: 'LDH A, a8',
    bytes: 2,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF1: {
    action: operations.pop_AF,
    mnemonic: 'POP AF',
    bytes: 1,
    cycles: 12,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF3: {
    action: operations.di,
    mnemonic: 'DI',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF5: {
    action: operations.push_AF,
    mnemonic: 'PUSH AF',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF6: {
    action: operations.or_d8,
    mnemonic: 'OR d8',
    bytes: 1,
    cycles: 8,
    flags: {
      Z: "1",
      N: null,
      H: null,
      C: null,
    }
  },
  0xF7: {
    action: operations.rst_30,
    mnemonic: 'RST 30',
    bytes: 1,
    cycles: 32,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xF9: {
    action: operations.ld_SP_HL,
    mnemonic: 'LD SP, HL',
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
    action: operations.ld_A_a16,
    mnemonic: 'LD A, a16',
    bytes: 1,
    cycles: 16,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xFB: {
    action: operations.ei,
    mnemonic: 'EI',
    bytes: 1,
    cycles: 4,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  },
  0xFE: {
    action: operations.cp_d8,
    mnemonic: 'CP d8',
    bytes: 2,
    cycles: 8,
    flags: {
      Z: 'Z',
      N: '1',
      H: 'H',
      C: 'C',
    }
  },
  0xFF: {
    action: operations.rst_38,
    mnemonic: 'RST 38',
    bytes: 1,
    cycles: 32,
    flags: {
      Z: null,
      N: null,
      H: null,
      C: null,
    }
  }
};

export default opCodes;
