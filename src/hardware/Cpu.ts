import MemoryMap from './MemoryMap';

type FlagsType = {
  Z: string|null;
  N: string|null;
  H: string|null;
  C: string|null;
}

type OpCode = {
  mnemonic: string;
  bytes: number;
  cycles: number;
  flags: FlagsType;
  action: (operand1?: any, operand2?: any) => void;
}


export default class Cpu {
  private memoryMap: MemoryMap;

  private stack: number[] = [];

  private registersBuffer: ArrayBuffer = new ArrayBuffer(12);
  private registers: Uint8Array = new Uint8Array(this.registersBuffer);
  private registers16: Uint16Array = new Uint16Array(this.registersBuffer);

  private flags: Uint8Array = new Uint8Array([0]);
  private flagZ = false;
  private flagN = false;
  private flagH = false;
  private flagC = false;

  private opCodes: Record<number, OpCode> = {
    0x00: {
      action: this.nop.bind(this),
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
      action: this.ld_BC_d16.bind(this),
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
      action: this.ld_BCa_A.bind(this),
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
      action: this.inc_BC.bind(this),
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
      action: this.inc_B.bind(this),
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
      action: this.dec_B.bind(this),
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
      action: this.ld_B_d8.bind(this),
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
      action: this.rlca.bind(this),
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
    0x09: {
      action: this.add_HL_BC.bind(this),
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
      action: this.ld_A_BCa.bind(this),
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
      action: this.dec_BC.bind(this),
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
      action: this.inc_C.bind(this),
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
      action: this.dec_C.bind(this),
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
      action: this.ld_C_d8.bind(this),
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
      action: this.ld_DE_d16.bind(this),
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
      action: this.ld_DEa_A.bind(this),
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
      action: this.inc_DE.bind(this),
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
      action: this.inc_D.bind(this),
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
    0x16: {
      action: this.ld_D_d8.bind(this),
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
      action: this.rla.bind(this),
      mnemonic: 'RLA',
      bytes: 1,
      cycles: 4,
      flags: {
        Z: null,
        N: null,
        H: null,
        C: null,
      }
    },
    0x18: {
      action: this.jr_r8.bind(this),
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
      action: this.add_HL_DE.bind(this),
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
      action: this.ld_A_DEa.bind(this),
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
      action: this.inc_E.bind(this),
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
    0x1E: {
      action: this.ld_E_d8.bind(this),
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
      action: this.jr_nz_r8.bind(this),
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
      action: this.ld_HL_d16.bind(this),
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
      action: this.ld_HLi_A.bind(this),
      mnemonic: 'LD HLi, A',
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
      action: this.inc_HL.bind(this),
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
      action: this.inc_H.bind(this),
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
    0x26: {
      action: this.ld_H_d8.bind(this),
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
      action: this.jr_z_r8.bind(this),
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
      action: this.add_HL_HL.bind(this),
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
      action: this.ld_A_HLi.bind(this),
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
      action: this.inc_L.bind(this),
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
    0x2E: {
      action: this.ld_L_d8.bind(this),
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
      action: this.cpl.bind(this),
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
      action: this.jr_nc_r8.bind(this),
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
      action: this.ld_SP_d16.bind(this),
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
      action: this.ld_HLDa_A.bind(this),
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
      action: this.inc_SP.bind(this),
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
      action: this.inc_HLa.bind(this),
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
    0x36: {
      action: this.ld_HLa_d8.bind(this),
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
    0x38: {
      action: this.jr_c_r8.bind(this),
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
      action: this.add_HL_SP.bind(this),
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
    0x3C: {
      action: this.inc_A.bind(this),
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
    0x3E: {
      action: this.ld_A_d8.bind(this),
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
    0x40: {
      action: this.ld_B_B.bind(this),
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
      action: this.ld_B_C.bind(this),
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
      action: this.ld_B_D.bind(this),
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
      action: this.ld_B_E.bind(this),
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
      action: this.ld_B_H.bind(this),
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
      action: this.ld_B_L.bind(this),
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
      action: this.ld_B_HLa.bind(this),
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
      action: this.ld_B_A.bind(this),
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
      action: this.ld_C_B.bind(this),
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
      action: this.ld_C_C.bind(this),
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
      action: this.ld_C_D.bind(this),
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
      action: this.ld_C_E.bind(this),
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
      action: this.ld_C_H.bind(this),
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
      action: this.ld_C_L.bind(this),
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
      action: this.ld_C_HLa.bind(this),
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
      action: this.ld_C_A.bind(this),
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
      action: this.ld_D_B.bind(this),
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
      action: this.ld_D_C.bind(this),
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
      action: this.ld_D_D.bind(this),
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
      action: this.ld_D_E.bind(this),
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
      action: this.ld_D_H.bind(this),
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
      action: this.ld_D_L.bind(this),
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
      action: this.ld_D_HLa.bind(this),
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
      action: this.ld_D_A.bind(this),
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
      action: this.ld_E_B.bind(this),
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
      action: this.ld_E_C.bind(this),
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
      action: this.ld_E_D.bind(this),
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
      action: this.ld_E_E.bind(this),
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
      action: this.ld_E_H.bind(this),
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
      action: this.ld_E_L.bind(this),
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
      action: this.ld_E_HLa.bind(this),
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
      action: this.ld_E_A.bind(this),
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
      action: this.ld_H_B.bind(this),
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
      action: this.ld_H_C.bind(this),
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
      action: this.ld_H_D.bind(this),
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
      action: this.ld_H_E.bind(this),
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
      action: this.ld_H_H.bind(this),
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
      action: this.ld_H_L.bind(this),
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
      action: this.ld_H_HLa.bind(this),
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
      action: this.ld_H_A.bind(this),
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
      action: this.ld_L_B.bind(this),
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
      action: this.ld_L_C.bind(this),
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
      action: this.ld_L_D.bind(this),
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
      action: this.ld_L_E.bind(this),
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
      action: this.ld_L_H.bind(this),
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
      action: this.ld_L_L.bind(this),
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
      action: this.ld_L_HLa.bind(this),
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
      action: this.ld_L_A.bind(this),
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
      action: this.ld_HLa_B.bind(this),
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
      action: this.ld_HLa_C.bind(this),
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
      action: this.ld_HLa_D.bind(this),
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
      action: this.ld_HLa_E.bind(this),
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
      action: this.ld_HLa_H.bind(this),
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
      action: this.ld_HLa_L.bind(this),
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
      action: this.ld_HLa_A.bind(this),
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
      action: this.ld_A_B.bind(this),
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
      action: this.ld_A_C.bind(this),
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
      action: this.ld_A_D.bind(this),
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
      action: this.ld_A_E.bind(this),
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
      action: this.ld_A_H.bind(this),
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
      action: this.ld_A_L.bind(this),
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
      action: this.ld_A_HLa.bind(this),
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
      action: this.ld_A_A.bind(this),
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
      action: this.add_A_B.bind(this),
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
      action: this.add_A_C.bind(this),
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
      action: this.add_A_D.bind(this),
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
      action: this.add_A_E.bind(this),
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
      action: this.add_A_H.bind(this),
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
      action: this.add_A_L.bind(this),
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
      action: this.add_A_HLa.bind(this),
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
      action: this.add_A_A.bind(this),
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
    0xA0: {
      action: this.and_B.bind(this),
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
      action: this.and_C.bind(this),
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
      action: this.and_D.bind(this),
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
      action: this.and_E.bind(this),
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
      action: this.and_H.bind(this),
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
      action: this.and_L.bind(this),
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
      action: this.and_HLa.bind(this),
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
      action: this.and_A.bind(this),
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
      action: this.xor_B.bind(this),
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
      action: this.xor_C.bind(this),
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
      action: this.xor_D.bind(this),
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
      action: this.xor_E.bind(this),
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
      action: this.xor_H.bind(this),
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
      action: this.xor_L.bind(this),
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
      action: this.xor_HLa.bind(this),
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
      action: this.xor_A.bind(this),
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
      action: this.or_B.bind(this),
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
      action: this.or_C.bind(this),
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
      action: this.or_D.bind(this),
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
      action: this.or_E.bind(this),
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
      action: this.or_H.bind(this),
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
      action: this.or_L.bind(this),
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
      action: this.or_HLa.bind(this),
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
    0xC0: {
      action: this.ret_nz.bind(this),
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
      action: this.pop_BC.bind(this),
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
    0xC3: {
      action: this.jp_a16.bind(this),
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
    0xC5: {
      action: this.push_BC.bind(this),
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
      action: this.add_A_d8.bind(this),
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
      action: this.rst_00.bind(this),
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
      action: this.ret_z.bind(this),
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
      action: this.ret.bind(this),
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
    0xCD: {
      action: this.call_a16.bind(this),
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
      action: this.rst_08.bind(this),
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
      action: this.ret_nc.bind(this),
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
      action: this.pop_DE.bind(this),
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
    0xD5: {
      action: this.push_DE.bind(this),
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
    0xD7: {
      action: this.rst_10.bind(this),
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
      action: this.ret_c.bind(this),
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
    0xDF: {
      action: this.rst_18.bind(this),
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
      action: this.ldh_a8_A.bind(this),
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
      action: this.pop_HL.bind(this),
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
      action: this.ld_Ca_A.bind(this),
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
      action: this.push_HL.bind(this),
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
      action: this.and_d8.bind(this),
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
      action: this.rst_20.bind(this),
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
      action: this.jp_HL.bind(this),
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
      action: this.ld_a16_A.bind(this),
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
      action: this.xor_d8.bind(this),
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
      action: this.rst_28.bind(this),
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
      action: this.ldh_A_a8.bind(this),
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
      action: this.pop_AF.bind(this),
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
      action: this.di.bind(this),
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
      action: this.push_AF.bind(this),
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
      action: this.or_d8.bind(this),
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
      action: this.rst_30.bind(this),
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
    0xFA: {
      action: this.ld_A_a16.bind(this),
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
      action: this.ei.bind(this),
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
      action: this.cp_d8.bind(this),
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
      action: this.rst_38.bind(this),
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

  // Prefixed Op Codes
  private cbOpCodes: Record<number, OpCode> = {
    0x30: {
      action: this.swp_B.bind(this),
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
      action: this.swp_C.bind(this),
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
      action: this.swp_D.bind(this),
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
      action: this.swp_E.bind(this),
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
      action: this.swp_H.bind(this),
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
      action: this.swp_L.bind(this),
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
      action: this.swp_HLa.bind(this),
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
      action: this.swp_A.bind(this),
      mnemonic: 'SWP A',
      bytes: 1,
      cycles: 8,
      flags: {
        Z: 'Z',
        N: null,
        H: null,
        C: null,
      }
    }
  }

  constructor(memoryMap: MemoryMap) {
    this.memoryMap = memoryMap;
  }

  public tick(): boolean {
    let cycles = 0;

    while (cycles < 66667) {
      let opCode = this.memoryMap.read8(this.PC);
      this.PC += 1;

      let opCodeTable = this.opCodes;
      let isCbCode = false;
      // Prefixed op code
      if (opCode === 0xCB) {
        isCbCode = true;
        opCode = this.memoryMap.read8(this.PC);
        this.PC += 1
        opCodeTable = this.cbOpCodes;
      }

      if (!opCodeTable[opCode]) {
        console.log('Unknown opcode: ', `${isCbCode ? '0xCB ' : ''}${opCode.toString(16)}`);
        return false;
      }
      const operation = opCodeTable[opCode];

      // + DEBUG ---
      const codeString = opCode.toString(16)
      const paddedCodeString = `0x${'0'.repeat(2 - codeString.length)}${codeString}`
      // console.log('Running', `(${isCbCode ? '0xCB ' : ''}${paddedCodeString}) ${operation.mnemonic}`);
      // - DEBUG ---

      // if (opCode === 0x18) {
      //   debugger;
      // }

      operation.action();
      cycles += operation.cycles;
    }

    return true;
  }

  public reset() {
    // Clear registers
    for (let i = 0; i < this.registers.length; i++) {
      this.registers[i] = 0;
    }

    // Point the program counter at the entry point and stack pointer to the top of ram
    this.PC = 0x100;
    this.SP = 0xFFFE;
  }


  public loadRom() {
    // TODO: Load rom
  }

  // Getters to access registers array buffer
  // 8 bit
  private get A() { return this.registers[0]; }
  private get F() { return this.registers[1]; }
  private get B() { return this.registers[2]; }
  private get C() { return this.registers[3]; }
  private get D() { return this.registers[4]; }
  private get E() { return this.registers[5]; }
  private get H() { return this.registers[6]; }
  private get L() { return this.registers[7]; }
  // 16 bit
  private get AF() { return this.registers16[0]; }
  private get BC() { return this.registers16[1]; }
  private get DE() { return this.registers16[2]; }
  private get HL() { return this.registers16[3]; }
  private get SP() { return this.registers16[4]; }
  private get PC() { return this.registers16[5]; }

  // Setters to access registers array buffer
  // 8 bit
  private set A(value: number) { this.registers[0] = value; }
  private set F(value: number) { this.registers[1] = value; }
  private set B(value: number) { this.registers[2] = value; }
  private set C(value: number) { this.registers[3] = value; }
  private set D(value: number) { this.registers[4] = value; }
  private set E(value: number) { this.registers[5] = value; }
  private set H(value: number) { this.registers[6] = value; }
  private set L(value: number) { this.registers[7] = value; }

  // 16 bit
  private set AF(value: number) { this.registers16[0] = value; }
  private set BC(value: number) { this.registers16[1] = value; }
  private set DE(value: number) { this.registers16[2] = value; }
  private set HL(value: number) { this.registers16[3] = value; }
  private set SP(value: number) { this.registers16[4] = value; }
  private set PC(value: number) { this.registers16[5] = value; }

  // Memory access
  // Reading
  private read8(): number {
    // TODO:
    return this.memoryMap.read8(this.PC);
  }

  private read8Signed(): number {
    // TODO:
    return this.memoryMap.read8Signed(this.PC);
  }

  private read16(): number {
    // TODO:
    return this.memoryMap.read16(this.PC);
  }

  // Operations
  nop(): void { /* No op */ }

  /**
   * Load Functions
   */
  // LD n,A
  ld_A_A(): void {
    // Noop - A = A
  }

  ld_B_A(): void {
    this.B = this.A;
  }

  ld_C_A(): void {
    this.C = this.A;
  }

  ld_D_A(): void {
    this.D = this.A;
  }

  ld_E_A(): void {
    this.E = this.A;
  }

  ld_H_A(): void {
    this.H = this.A;
  }

  ld_L_A(): void {
    this.L = this.A;
  }

  ld_BCa_A(): void {
    this.memoryMap.write8(this.BC, this.A)
  }

  ld_DEa_A(): void {
    this.memoryMap.write8(this.DE, this.A)
  }

  ld_HLa_A(): void {
    this.memoryMap.write8(this.HL, this.A)
  }

  ld_a16_A(): void {
    this.memoryMap.write8(this.read16(), this.A)
    this.PC += 2;
  }

  // LD A,n
  ld_A_B(): void {
    this.A = this.B;
  }

  ld_A_C(): void {
    this.A = this.C;
  }

  ld_A_D(): void {
    this.A = this.D;
  }

  ld_A_E(): void {
    this.A = this.E;
  }

  ld_A_H(): void {
    this.A = this.H;
  }

  ld_A_L(): void {
    this.A = this.L;
  }

  ld_A_BCa(): void {
    this.A = this.memoryMap.read8(this.BC);
  }

  ld_A_DEa(): void {
    this.A = this.memoryMap.read8(this.DE);
  }

  ld_A_HLa(): void {
    this.A = this.memoryMap.read8(this.HL);
  }

  ld_A_a16(): void {
    this.A = this.memoryMap.read8(this.read16());
    this.PC += 2;
  }

  ld_A_d8(): void {
    this.A = this.read8();
    this.PC += 1;
  }

  // LD B,n
  ld_B_B(): void {
    // Noop B = B
  }

  ld_B_C(): void {
    this.B = this.C;
  }

  ld_B_D(): void {
    this.B = this.D;
  }

  ld_B_E(): void {
    this.B = this.E;
  }

  ld_B_H(): void {
    this.B = this.H;
  }

  ld_B_L(): void {
    this.B = this.L;
  }

  ld_B_HLa(): void {
    this.B = this.memoryMap.read8(this.HL);
  }

  // LD C,n
  ld_C_B(): void {
    this.C = this.B;
  }

  ld_C_C(): void {
    // Noop C = C
  }

  ld_C_D(): void {
    this.C = this.D;
  }

  ld_C_E(): void {
    this.C = this.E;
  }

  ld_C_H(): void {
    this.C = this.H;
  }

  ld_C_L(): void {
    this.C = this.L;
  }

  ld_C_HLa(): void {
    this.C = this.memoryMap.read8(this.HL);
  }

  // LD D,n
  ld_D_B(): void {
    this.D = this.B;
  }

  ld_D_C(): void {
    this.D = this.C;
  }

  ld_D_D(): void {
    // Noop D = D
  }

  ld_D_E(): void {
    this.D = this.E;
  }

  ld_D_H(): void {
    this.D = this.H;
  }

  ld_D_L(): void {
    this.D = this.L;
  }

  ld_D_HLa(): void {
    this.D = this.memoryMap.read8(this.HL);
  }

  // LD E,n
  ld_E_B(): void {
    this.E = this.B;
  }

  ld_E_C(): void {
    this.E = this.C;
  }

  ld_E_D(): void {
    this.E = this.D;
  }

  ld_E_E(): void {
    // Noop E = E
  }

  ld_E_H(): void {
    this.E = this.H;
  }

  ld_E_L(): void {
    this.E = this.L;
  }

  ld_E_HLa(): void {
    this.E = this.memoryMap.read8(this.HL);
  }

  // LD H,n
  ld_H_B(): void {
    this.H = this.B;
  }

  ld_H_C(): void {
    this.H = this.C;
  }

  ld_H_D(): void {
    this.H = this.D;
  }

  ld_H_E(): void {
    this.H = this.E;
  }

  ld_H_H(): void {
    // Noop H = H
  }

  ld_H_L(): void {
    this.H = this.L;
  }

  ld_H_HLa(): void {
    this.H = this.memoryMap.read8(this.HL);
  }

  // LD L,n
  ld_L_B(): void {
    this.L = this.B;
  }

  ld_L_C(): void {
    this.L = this.C;
  }

  ld_L_D(): void {
    this.L = this.D;
  }

  ld_L_E(): void {
    this.L = this.E;
  }

  ld_L_H(): void {
    this.L = this.H;
  }

  ld_L_L(): void {
    // Noop L = L
  }

  ld_L_HLa(): void {
    this.L = this.memoryMap.read8(this.HL);
  }

  // LD (HL),n
  ld_HLa_B(): void {
    this.memoryMap.write8(this.HL, this.B)
  }

  ld_HLa_C(): void {
    this.memoryMap.write8(this.HL, this.C)
  }

  ld_HLa_D(): void {
    this.memoryMap.write8(this.HL, this.D)
  }

  ld_HLa_E(): void {
    this.memoryMap.write8(this.HL, this.E)
  }

  ld_HLa_H(): void {
    this.memoryMap.write8(this.HL, this.H)
  }

  ld_HLa_L(): void {
    this.memoryMap.write8(this.HL, this.L)
  }

  // LD nn,n
  ld_B_d8(): void {
    this.B = this.read8();
    this.PC += 1;
  }

  ld_C_d8(): void {
    this.C = this.read8();
    this.PC += 1;
  }

  ld_D_d8(): void {
    this.D = this.read8();
    this.PC += 1;
  }

  ld_E_d8(): void {
    this.E = this.read8();
    this.PC += 1;
  }

  ld_H_d8(): void {
    this.C = this.read8();
    this.PC += 1;
  }

  ld_L_d8(): void {
    this.C = this.read8();
    this.PC += 1;
  }

  ld_A_HLi(): void {
    this.A = this.memoryMap.read8(this.HL);
    this.HL += 1;
  }

  ld_HLDa_A(): void {
    this.memoryMap.write8(this.HL, this.A);
    this.HL -= 1;
  }

  ld_HLa_d8(): void {
    this.memoryMap.write8(this.HL, this.read8());
    this.PC += 1;
  }

  // Others
  ld_HLi_A(): void {
    this.memoryMap.write8(this.HL, this.A);
    this.HL += 1;
  }

  // 16 bit Loads - LD n,nn
  ld_BC_d16(): void {
    this.BC = this.read16();
    this.PC += 2;
  }

  ld_DE_d16(): void {
    this.DE = this.read16();
    this.PC += 2;
  }

  ld_HL_d16(): void {
    this.HL = this.read16();
    this.PC += 2;
  }

  ld_SP_d16(): void {
    this.SP = this.read16();
    this.PC += 2;
  }

  /**
   * Jump Relative Functions
   */
  jr_r8(): void {
    const jumpOffset = this.read8Signed();
    this.PC = this.PC + jumpOffset + 1;
  }

  jr_nz_r8(): void {
    if (!this.flagZ) {
      const jumpOffset = this.read8Signed();
      this.PC = this.PC + jumpOffset;
    }

    this.PC += 1;
  }

  jr_z_r8(): void {
    if (this.flagZ) {
      const jumpOffset = this.read8Signed();
      this.PC = this.PC + jumpOffset;
    }

    this.PC += 1;
  }

  jr_nc_r8(): void {
    if (!this.flagC) {
      const jumpOffset = this.read8Signed();
      this.PC = this.PC + jumpOffset;
    }

    this.PC += 1;
  }

  jr_c_r8(): void {
    if (this.flagC) {
      const jumpOffset = this.read8Signed();
      this.PC = this.PC + jumpOffset;
    }

    this.PC += 1;
  }

  /**
   * Jump Functions
   */
  jp_a16(): void {
    this.PC = this.read16();
  }

  jp_HL(): void {
    this.PC = this.HL;
  }

  /**
   * Call Functions
   */
  call_a16(): void {
    const toAddress = this.read16();
    this.PC += 2;
    this.stack.push(this.PC)
    this.PC = toAddress;
  }

  /**
   * Returns
   */
  ret(): void {
    const address = this.pop();
    this.PC = address;
  }

  ret_nz(): void {
    if (!this.flagZ) {
      this.ret();
    }
  }

  ret_z(): void {
    if (this.flagZ) {
      this.ret();
    }
  }

  ret_nc(): void {
    if (!this.flagC) {
      this.ret();
    }
  }

  ret_c(): void {
    if (this.flagC) {
      this.ret();
    }
  }

  /**
   * Push functions
   */
  push_common(value: number): void {
    this.stack.push(value);
    this.SP -= 2;
  }

  push_AF(): void {
    this.push_common(this.AF);
  }

  push_BC(): void {
    this.push_common(this.BC);
  }

  push_DE(): void {
    this.push_common(this.DE);
  }

  push_HL(): void {
    this.push_common(this.HL);
  }

  /**
   * Pop functions
   */
  pop(): number {
    if (this.stack.length < 1) {
      throw new Error('Attempting to pop value with empty stack')
    }
    return this.stack.pop()!;
  }

  pop_common(): number {
    this.SP += 2;
    return this.pop();
  }

  pop_AF(): void {
    this.AF = this.pop_common();
  }

  pop_BC(): void {
    this.BC = this.pop_common();
  }

  pop_DE(): void {
    this.DE = this.pop_common();
  }

  pop_HL(): void {
    this.HL = this.pop_common();
  }

  /**
   * Restart functions
   */
  rst(value: number): void {
    this.stack.push(this.PC);
    this.PC = value;
  }

  rst_00(): void {
    this.rst(0x00);
  }

  rst_08(): void {
    this.rst(0x08);
  }

  rst_10(): void {
    this.rst(0x10);
  }

  rst_18(): void {
    this.rst(0x18);
  }

  rst_20(): void {
    this.rst(0x20);
  }

  rst_28(): void {
    this.rst(0x28);
  }

  rst_30(): void {
    this.rst(0x00);
  }

  rst_38(): void {
    this.rst(0x38);
  }

  /**
   * Decrement Functions
   */
  dec_common(result: number): void {
    this.flagZ = result === 0;
    // if (result === 0) {
    //   this.flagZ = true;
    // }
    this.flagN = true;
    // TODO: Set H if no borrow from bit 4
    // this.flagH = ?
  }

  dec_B(): void {
    this.B -= 1;
    this.dec_common(this.B);
  }

  dec_C(): void {
    this.C -= 1;
    this.dec_common(this.C);
  }

  // (DEC nn) - no flags affected
  dec_BC(): void {
    this.BC -= 1;
  }

  /**
   * Increment Functions
   */
  inc_common(result: number): void {
    this.flagZ = result === 0;
    // if (result === 0) {
    //   this.flagZ = true;
    // }
    this.flagN = false;
    // TODO: this.flagH - set if carry from bit 3
  }

  inc_A(): void {
    this.A += 1;
    this.inc_common(this.A);
  }

  inc_B(): void {
    this.B += 1;
    this.inc_common(this.B);
  }

  inc_C(): void {
    this.C += 1;
    this.inc_common(this.C);
  }

  inc_D(): void {
    this.D += 1;
    this.inc_common(this.D);
  }

  inc_E(): void {
    this.E += 1;
    this.inc_common(this.E);
  }

  inc_H(): void {
    this.H += 1;
    this.inc_common(this.H);
  }

  inc_L(): void {
    this.L += 1;
    this.inc_common(this.L);
  }

  inc_HLa(): void {
    const value = this.memoryMap.read8(this.HL) + 1;
    this.memoryMap.write8(this.HL, value);
    this.inc_common(value);
  }

  inc_BC(): void {
    this.BC += 1;
  }

  inc_DE(): void {
    this.DE += 1;
  }

  inc_HL(): void {
    this.HL += 1;
  }

  inc_SP(): void {
    this.SP += 1;
  }

  /**
   * 8 bit Add Functions
   */
  add_common() {
    this.flagZ = this.A === 0;
    // if (this.A === 0) {
    //   this.flagZ = true;
    // }

    this.flagN = false;
    // TODO: this.flagH = if carry from bit 3
    // TODO: this.flagC = if carry from bit 7
  }

  add_A_A(): void {
    this.A = this.A + this.A;
    this.add_common();
  }

  add_A_B(): void {
    this.A = this.A + this.B;
    this.add_common();
  }

  add_A_C(): void {
    this.A = this.A + this.C;
    this.add_common();
  }

  add_A_D(): void {
    this.A = this.A + this.D;
    this.add_common();
  }

  add_A_E(): void {
    this.A = this.A + this.E;
    this.add_common();
  }

  add_A_H(): void {
    this.A = this.A + this.H;
    this.add_common();
  }

  add_A_L(): void {
    this.A = this.A + this.L;
    this.add_common();
  }

  add_A_HLa(): void {
    this.A = this.A + this.memoryMap.read8(this.HL);
    this.add_common();
  }

  add_A_d8(): void {
    this.A = this.A + this.read8();
    this.add_common();

    this.PC += 1;
  }

  /**
   * 16 bit Add Functions
   */
  add_16_common() {
    this.flagN = false;
    // TODO: this.flagH = if carry from bit 11
    // TODO: this.flagC = if carry from bit 15
  }

  add_HL_BC(): void {
    this.HL = this.HL + this.BC;
    this.add_16_common();
  }

  add_HL_DE(): void {
    this.HL = this.HL + this.DE;
    this.add_16_common();
  }

  add_HL_HL(): void {
    this.HL = this.HL + this.HL;
    this.add_16_common();
  }

  add_HL_SP(): void {
    this.HL = this.HL + this.SP;
    this.add_16_common();
  }

  /**
   * AND Functions
   */
  and_common() {
    this.flagZ = this.A === 0;
    // if (this.A === 0) {
    //   this.flagZ = true;
    // }
    this.flagN = false;
    this.flagH = true;
    this.flagC = false;
  }

  and_A(): void {
    // Noop? A & A = A
    this.and_common();
  }

  and_B(): void {
    this.A = this.A & this.B;
    this.and_common();
  }

  and_C(): void {
    this.A = this.A & this.C;
    this.and_common();
  }

  and_D(): void {
    this.A = this.A & this.D;
    this.and_common();
  }

  and_E(): void {
    this.A = this.A & this.E;
    this.and_common();
  }

  and_H(): void {
    this.A = this.A & this.H;
    this.and_common();
  }

  and_L(): void {
    this.A = this.A & this.L;
    this.and_common();
  }

  and_HLa(): void {
    this.A = this.A & this.memoryMap.read8(this.HL);
    this.and_common();
  }

  and_d8(): void {
    this.A = this.A & this.read8();
    this.and_common();
    this.PC += 1;
  }


  /**
   * OR  Functions
   */
  or_common(): void {
    this.flagZ = this.A === 0;
    // if (this.A === 0) {
    //   this.flagZ = true;
    // }
    this.flagN = false;
    this.flagH = false;
    this.flagC = false;
  }

  or_B(): void {
    this.A = this.A | this.B;
    this.or_common();
  }

  or_C(): void {
    this.A = this.A | this.C;
    this.or_common();
  }

  or_D(): void {
    this.A = this.A | this.D;
    this.or_common();
  }

  or_E(): void {
    this.A = this.A | this.E;
    this.or_common();
  }

  or_H(): void {
    this.A = this.A | this.H;
    this.or_common();
  }

  or_L(): void {
    this.A = this.A | this.L;
    this.or_common();
  }

  or_HLa(): void {
    this.A = this.A | this.memoryMap.read8(this.HL);
    this.or_common();
  }

  or_d8(): void {
    this.A = this.A | this.read8();
    this.PC += 1;
    this.or_common();
  }

  /**
   * XOR  Functions
   */
  xor_common(): void {
    this.flagZ = this.A === 0;
    // if (this.A === 0) {
    //   this.flagZ = true;
    // }
    this.flagN = false;
    this.flagH = false;
    this.flagC = false;
  }

  xor_A(): void {
    // Not sure - XOR A with A? Noop?
    this.xor_common();
  }

  xor_B(): void {
    this.A = this.A ^ this.B;
    this.xor_common();
  }

  xor_C(): void {
    this.A = this.A ^ this.C;
    this.xor_common();
  }

  xor_D(): void {
    this.A = this.A ^ this.D;
    this.xor_common();
  }

  xor_E(): void {
    this.A = this.A ^ this.E;
    this.xor_common();
  }

  xor_H(): void {
    this.A = this.A ^ this.H;
    this.xor_common();
  }

  xor_L(): void {
    this.A = this.A ^ this.L;
    this.xor_common();
  }

  xor_HLa(): void {
    this.A = this.A ^ this.memoryMap.read8(this.HL);
  }

  xor_d8(): void {
    this.A = this.A ^ this.read8();
    this.xor_common();
    this.PC += 1;
  }


  /**
   * Rotate  Functions
   */
  rlca(): void {
    const rotatedValue = this.A << 1;
    let result = rotatedValue;
    // Move carry to carry flag (existing flag discarded)
    this.flagC = (result & 256) === 256;
    this.flagZ = result === 0;
    // if (result === 0) {
    //   this.flagZ = true;
    // }

    // Shift the carry flag in
    if (this.flagC) {
      result = result | 0x01;
    }

    this.flagN = false;
    this.flagH = false;

    this.A = result & 0xFF;
  }

  rla(): void {
    const rotatedValue = this.A << 1;
    let result = rotatedValue;
    // Shift the carry flag in
    if (this.flagC) {
      result = result | 0x01;
    }
    // Move carry to carry flag
    this.flagC = (result & 256) === 256;
    this.flagZ = result === 0;
    // if (result === 0) {
    //   this.flagZ = true;
    // }

    this.flagN = false;
    this.flagH = false;

    this.A = result & 0xFF;
  }

  /**
   * Swap  Functions
   */
  static swap(value: number) {
    return ((value << 4) | (value >> 4)) & 0xFF; // Have to mask to 1 byte
  }

  swp_common(result: number): void {
    this.flagZ = result === 0;
    // if (result === 0) {
    //   this.flagZ = true;
    // }
  }

  swp_A(): void {
    this.A = Cpu.swap(this.A);
    this.swp_common(this.A);
  }

  swp_B(): void {
    this.B = Cpu.swap(this.B);
    this.swp_common(this.B);
  }

  swp_C(): void {
    this.C = Cpu.swap(this.C);
    this.swp_common(this.C);
  }

  swp_D(): void {
    this.D = Cpu.swap(this.D);
    this.swp_common(this.D);
  }

  swp_E(): void {
    this.E = Cpu.swap(this.E);
    this.swp_common(this.E);
  }

  swp_H(): void {
    this.H = Cpu.swap(this.H);
    this.swp_common(this.H);
  }

  swp_L(): void {
    this.L = Cpu.swap(this.L);
    this.swp_common(this.L);
  }

  swp_HLa(): void {
    const value = this.memoryMap.read8(this.HL);
    const result = Cpu.swap(value);
    this.memoryMap.write8(this.HL, result);
    this.swp_common(result);
  }

  ld_Ca_A(): void {
    this.memoryMap.write8(0xFF00 + this.C, this.A);
  }

  ldh_a8_A(): void {
    const memOffset = this.read8();
    this.memoryMap.write8(0xFF00 + memOffset, this.A);
    this.PC += 1;
  }

  ldh_A_a8(): void {
    const memOffset = this.read8();
    this.A = this.memoryMap.read8(0xFF00 + memOffset);
    this.PC += 1;
  }

  di(): void {
    // TODO: Disable interrupts
  }

  ei(): void {
    // TODO: Enable interrupts
  }

  cpl(): void {
    this.A = this.A ^ 0xFF;
    this.flagN = true;
    this.flagH = true;
  }

  cp_d8(): void {
    const value = this.read8();
    const diff = this.A - value;

    this.flagZ = diff === 0;
    // if (diff === 0) {
    //   this.flagZ = true;
    // }
    this.flagN = true;
    this.flagH = false; // TODO: if no borrow from bit 4?
    this.flagC = diff > 0;

    this.PC += 1;
  }
}
