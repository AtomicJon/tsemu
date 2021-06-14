import {
  REG_A,
  REG_AF,
  REG_B,
  REG_BC,
  REG_C,
  REG_D,
  REG_DE,
  REG_E,
  REG_H,
  REG_HL,
  REG_L,
  REG_SP,
} from '../constants';
import { adc } from '../operations/adc';
import add from '../operations/add';
import addSp from '../operations/addSp';
import and from '../operations/and';
import call from '../operations/call';
import callC from '../operations/callC';
import callNc from '../operations/callNc';
import callNz from '../operations/callNz';
import callZ from '../operations/callZ';
import ccf from '../operations/ccf';
import cp from '../operations/cp';
import cpl from '../operations/cpl';
import daa from '../operations/daa';
import dec from '../operations/dec';
import di from '../operations/di';
import ei from '../operations/ei';
import inc from '../operations/inc';
import jp from '../operations/jp';
import jpC from '../operations/jpc';
import jpNc from '../operations/jpnc';
import jpNz from '../operations/jpnz';
import jpZ from '../operations/jpz';
import jr from '../operations/jr';
import jrC from '../operations/jrc';
import jrNc from '../operations/jrnc';
import jrNz from '../operations/jrnz';
import jrZ from '../operations/jrz';
import ld from '../operations/ld';
import ldHlSpE8 from '../operations/ldHlSpE8';
import nop from '../operations/nop';
import or from '../operations/or';
import pop from '../operations/pop';
import push from '../operations/push';
import ret from '../operations/ret';
import retC from '../operations/retc';
import reti from '../operations/reti';
import retNc from '../operations/retnc';
import retNz from '../operations/retnz';
import retZ from '../operations/retz';
import rl from '../operations/rl';
import rlc from '../operations/rlc';
import rr from '../operations/rr';
import rrc from '../operations/rrc';
import rst00 from '../operations/rst00';
import rst08 from '../operations/rst08';
import rst10 from '../operations/rst10';
import rst18 from '../operations/rst18';
import rst20 from '../operations/rst20';
import rst28 from '../operations/rst28';
import rst30 from '../operations/rst30';
import rst38 from '../operations/rst38';
import sbc from '../operations/sbc';
import scf from '../operations/scf';
import sub from '../operations/sub';
import xor from '../operations/xor';
import { OpCode, OperandModifier, OperandType } from '../types';

const main: Record<number, OpCode> = {
  0x00: {
    action: nop,
    operands: [],
    mnemonic: 'NOP',
    bytes: 1,
    cycles: 4,
  },
  0x01: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_BC,
      },
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'LD BC, d16',
    bytes: 3,
    cycles: 12,
  },
  0x02: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_BC,
        isAddress: true,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD (BC), A',
    bytes: 1,
    cycles: 8,
  },
  0x03: {
    action: inc,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_BC,
      },
    ],
    mnemonic: 'INC BC',
    bytes: 1,
    cycles: 8,
  },
  0x04: {
    action: inc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'INC B',
    bytes: 1,
    cycles: 8,
  },
  0x05: {
    action: dec,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'DEC B',
    bytes: 1,
    cycles: 4,
  },
  0x06: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'LD B, d8',
    bytes: 2,
    cycles: 8,
  },
  0x07: {
    action: rlc,
    mnemonic: 'RLCA',
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    bytes: 1,
    cycles: 4,
  },
  0x08: {
    action: ld,
    operands: [
      {
        type: OperandType.Immediate16,
        isAddress: true,
      },
      {
        type: OperandType.Register16,
        target: REG_SP,
      },
    ],
    mnemonic: 'LD (a16), SP',
    bytes: 3,
    cycles: 20,
  },
  0x09: {
    action: add,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
      },
      {
        type: OperandType.Register16,
        target: REG_BC,
      },
    ],
    mnemonic: 'ADD HL, BC',
    bytes: 1,
    cycles: 8,
  },
  0x0a: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_BC,
        isAddress: true,
      },
    ],
    mnemonic: 'LD A, (BC)',
    bytes: 1,
    cycles: 4,
  },
  0x0b: {
    action: dec,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_BC,
      },
    ],
    mnemonic: 'DEC BC',
    bytes: 1,
    cycles: 8,
  },
  0x0c: {
    action: inc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'INC C',
    bytes: 1,
    cycles: 4,
  },
  0x0d: {
    action: dec,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'DEC C',
    bytes: 1,
    cycles: 4,
  },
  0x0e: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'LD C, d8',
    bytes: 2,
    cycles: 8,
  },
  0x0f: {
    action: rrc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RRCA',
    bytes: 1,
    cycles: 4,
  },
  0x10: {
    action: nop, // TODO: Handle low power mode
    operands: [],
    mnemonic: 'STOP d8',
    bytes: 2,
    cycles: 4,
  },
  0x11: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_DE,
      },
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'LD DE, d16',
    bytes: 3,
    cycles: 12,
  },
  0x12: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_DE,
        isAddress: true,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD (DE), A',
    bytes: 1,
    cycles: 8,
  },
  0x13: {
    action: inc,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_DE,
      },
    ],
    mnemonic: 'INC DE',
    bytes: 1,
    cycles: 8,
  },
  0x14: {
    action: inc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'INC D',
    bytes: 1,
    cycles: 8,
  },
  0x15: {
    action: dec,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'DEC D',
    bytes: 1,
    cycles: 4,
  },
  0x16: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'LD D, d8',
    bytes: 2,
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
    mnemonic: 'RLA',
    bytes: 1,
    cycles: 4,
  },
  0x18: {
    action: jr,
    operands: [
      {
        type: OperandType.Immediate8Signed,
      },
    ],
    mnemonic: 'JR n',
    bytes: 2,
    cycles: 12,
  },
  0x19: {
    action: add,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
      },
      {
        type: OperandType.Register16,
        target: REG_DE,
      },
    ],
    mnemonic: 'ADD HL, DE',
    bytes: 1,
    cycles: 8,
  },
  0x1a: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_DE,
        isAddress: true,
      },
    ],
    mnemonic: 'LD A, (DE)',
    bytes: 1,
    cycles: 4,
  },
  0x1b: {
    action: dec,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_DE,
      },
    ],
    mnemonic: 'DEC DE',
    bytes: 1,
    cycles: 8,
  },
  0x1c: {
    action: inc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'INC E',
    bytes: 1,
    cycles: 8,
  },
  0x1d: {
    action: dec,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'DEC E',
    bytes: 1,
    cycles: 4,
  },
  0x1e: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'LD E, d8',
    bytes: 2,
    cycles: 8,
  },
  0x1f: {
    action: rr,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'RRA',
    bytes: 1,
    cycles: 4,
  },
  0x20: {
    action: jrNz,
    operands: [
      {
        type: OperandType.Immediate8Signed,
      },
    ],
    mnemonic: 'JR NZ, R8',
    bytes: 2,
    cycles: 8,
  },
  0x21: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
      },
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'LD HL, d16',
    bytes: 3,
    cycles: 12,
  },
  0x22: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
        modifier: OperandModifier.Increment,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD (HL)+, A',
    bytes: 1,
    cycles: 8,
  },
  0x23: {
    action: inc,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
      },
    ],
    mnemonic: 'INC HL',
    bytes: 1,
    cycles: 8,
  },
  0x24: {
    action: inc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'INC H',
    bytes: 1,
    cycles: 8,
  },
  0x25: {
    action: dec,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'DEC H',
    bytes: 1,
    cycles: 4,
  },
  0x26: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'LD H, d8',
    bytes: 2,
    cycles: 8,
  },
  0x27: {
    action: daa,
    operands: [],
    mnemonic: 'DAA',
    bytes: 1,
    cycles: 4,
  },
  0x28: {
    action: jrZ,
    operands: [
      {
        type: OperandType.Immediate8Signed,
      },
    ],
    mnemonic: 'JR Z, R8',
    bytes: 2,
    cycles: 8,
  },
  0x29: {
    action: add,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
      },
    ],
    mnemonic: 'ADD HL, HL',
    bytes: 1,
    cycles: 8,
  },
  0x2a: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
        modifier: OperandModifier.Increment,
      },
    ],
    mnemonic: 'LD A, (HL+)',
    bytes: 1,
    cycles: 8,
  },
  0x2b: {
    action: dec,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
      },
    ],
    mnemonic: 'DEC HL',
    bytes: 1,
    cycles: 8,
  },
  0x2c: {
    action: inc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'INC L',
    bytes: 1,
    cycles: 8,
  },
  0x2d: {
    action: dec,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'DEC L',
    bytes: 1,
    cycles: 4,
  },
  0x2e: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'LD L, d8',
    bytes: 2,
    cycles: 8,
  },
  0x2f: {
    action: cpl,
    operands: [],
    mnemonic: 'CPL',
    bytes: 1,
    cycles: 4,
  },
  0x30: {
    action: jrNc,
    operands: [
      {
        type: OperandType.Immediate8Signed,
      },
    ],
    mnemonic: 'JR NC, R8',
    bytes: 2,
    cycles: 8,
  },
  0x31: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_SP,
      },
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'LD SP, d16',
    bytes: 3,
    cycles: 12,
  },
  0x32: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
        modifier: OperandModifier.Decrement,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD (HLD), A',
    bytes: 1,
    cycles: 8,
  },
  0x33: {
    action: inc,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_SP,
      },
    ],
    mnemonic: 'INC SP',
    bytes: 1,
    cycles: 8,
  },
  0x34: {
    action: inc,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'INC (HL)',
    bytes: 1,
    cycles: 12,
  },
  0x35: {
    action: dec,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'DEC (HL)',
    bytes: 1,
    cycles: 12,
  },
  0x36: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'LD (HL), d8',
    bytes: 2,
    cycles: 12,
  },
  0x37: {
    action: scf,
    operands: [],
    mnemonic: 'SCF',
    bytes: 1,
    cycles: 4,
  },
  0x38: {
    action: jrC,
    operands: [
      {
        type: OperandType.Immediate8Signed,
      },
    ],
    mnemonic: 'JR C, R8',
    bytes: 2,
    cycles: 8,
  },
  0x39: {
    action: add,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
      },
      {
        type: OperandType.Register16,
        target: REG_SP,
      },
    ],
    mnemonic: 'ADD HL, SP',
    bytes: 1,
    cycles: 8,
  },
  0x3a: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
        modifier: OperandModifier.Decrement,
      },
    ],
    mnemonic: 'LD A, (HL-)',
    bytes: 1,
    cycles: 8,
  },
  0x3b: {
    action: dec,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_SP,
      },
    ],
    mnemonic: 'DEC SP',
    bytes: 1,
    cycles: 8,
  },
  0x3c: {
    action: inc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'INC A',
    bytes: 1,
    cycles: 8,
  },
  0x3d: {
    action: dec,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'DEC A',
    bytes: 1,
    cycles: 4,
  },
  0x3e: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'LD A, d8',
    bytes: 1,
    cycles: 8,
  },
  0x3f: {
    action: ccf,
    operands: [],
    mnemonic: 'CCF',
    bytes: 1,
    cycles: 4,
  },
  0x40: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'LD B, B',
    bytes: 1,
    cycles: 4,
  },
  0x41: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'LD B, C',
    bytes: 1,
    cycles: 4,
  },
  0x42: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'LD B, D',
    bytes: 1,
    cycles: 4,
  },
  0x43: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'LD B, E',
    bytes: 1,
    cycles: 4,
  },
  0x44: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'LD B, H',
    bytes: 1,
    cycles: 4,
  },
  0x45: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'LD B, L',
    bytes: 1,
    cycles: 4,
  },
  0x46: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'LD B, (HL)',
    bytes: 1,
    cycles: 4,
  },
  0x47: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_B,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD B, A',
    bytes: 1,
    cycles: 4,
  },
  0x48: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'LD C, B',
    bytes: 1,
    cycles: 4,
  },
  0x49: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'LD C, C',
    bytes: 1,
    cycles: 4,
  },
  0x4a: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'LD C, D',
    bytes: 1,
    cycles: 4,
  },
  0x4b: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'LD C, E',
    bytes: 1,
    cycles: 4,
  },
  0x4c: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'LD C, H',
    bytes: 1,
    cycles: 4,
  },
  0x4d: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'LD C, L',
    bytes: 1,
    cycles: 4,
  },
  0x4e: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'LD C, (HL)',
    bytes: 1,
    cycles: 4,
  },
  0x4f: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD C, A',
    bytes: 1,
    cycles: 4,
  },
  0x50: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'LD D, B',
    bytes: 1,
    cycles: 4,
  },
  0x51: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'LD D, C',
    bytes: 1,
    cycles: 4,
  },
  0x52: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'LD D, D',
    bytes: 1,
    cycles: 4,
  },
  0x53: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'LD D, E',
    bytes: 1,
    cycles: 4,
  },
  0x54: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'LD D, H',
    bytes: 1,
    cycles: 4,
  },
  0x55: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'LD D, L',
    bytes: 1,
    cycles: 4,
  },
  0x56: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'LD D, (HL)',
    bytes: 1,
    cycles: 4,
  },
  0x57: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_D,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD D, A',
    bytes: 1,
    cycles: 4,
  },
  0x58: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'LD E, B',
    bytes: 1,
    cycles: 4,
  },
  0x59: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'LD E, C',
    bytes: 1,
    cycles: 4,
  },
  0x5a: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'LD E, D',
    bytes: 1,
    cycles: 4,
  },
  0x5b: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'LD E, E',
    bytes: 1,
    cycles: 4,
  },
  0x5c: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'LD E, H',
    bytes: 1,
    cycles: 4,
  },
  0x5d: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'LD E, L',
    bytes: 1,
    cycles: 4,
  },
  0x5e: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'LD E, (HL)',
    bytes: 1,
    cycles: 8,
  },
  0x5f: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_E,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD E, A',
    bytes: 1,
    cycles: 4,
  },
  0x60: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'LD H, B',
    bytes: 1,
    cycles: 4,
  },
  0x61: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'LD H, C',
    bytes: 1,
    cycles: 4,
  },
  0x62: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'LD H, D',
    bytes: 1,
    cycles: 4,
  },
  0x63: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'LD H, E',
    bytes: 1,
    cycles: 4,
  },
  0x64: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'LD H, H',
    bytes: 1,
    cycles: 4,
  },
  0x65: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'LD H, L',
    bytes: 1,
    cycles: 4,
  },
  0x66: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'LD H, (HL)',
    bytes: 1,
    cycles: 8,
  },
  0x67: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_H,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD H, A',
    bytes: 1,
    cycles: 4,
  },
  0x68: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'LD L, B',
    bytes: 1,
    cycles: 4,
  },
  0x69: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'LD L, C',
    bytes: 1,
    cycles: 4,
  },
  0x6a: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'LD L, D',
    bytes: 1,
    cycles: 4,
  },
  0x6b: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'LD L, E',
    bytes: 1,
    cycles: 4,
  },
  0x6c: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'LD L, H',
    bytes: 1,
    cycles: 4,
  },
  0x6d: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'LD L, L',
    bytes: 1,
    cycles: 4,
  },
  0x6e: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'LD L, (HL)',
    bytes: 1,
    cycles: 8,
  },
  0x6f: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_L,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD L, A',
    bytes: 1,
    cycles: 4,
  },
  0x70: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'LD (HL), B',
    bytes: 1,
    cycles: 4,
  },
  0x71: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'LD (HL), C',
    bytes: 1,
    cycles: 4,
  },
  0x72: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'LD (HL), D',
    bytes: 1,
    cycles: 4,
  },
  0x73: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'LD (HL), E',
    bytes: 1,
    cycles: 4,
  },
  0x74: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'LD (HL), H',
    bytes: 1,
    cycles: 4,
  },
  0x75: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'LD (HL), L',
    bytes: 1,
    cycles: 4,
  },
  0x76: {
    action: nop, // TODO: Handle low power mode
    operands: [],
    mnemonic: 'HALT',
    bytes: 1,
    cycles: 4,
  },
  0x77: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD (HL), A',
    bytes: 1,
    cycles: 8,
  },
  0x78: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'LD A, B',
    bytes: 1,
    cycles: 4,
  },
  0x79: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'LD A, C',
    bytes: 1,
    cycles: 4,
  },
  0x7a: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'LD A, D',
    bytes: 1,
    cycles: 4,
  },
  0x7b: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'LD A, E',
    bytes: 1,
    cycles: 4,
  },
  0x7c: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'LD A, H',
    bytes: 1,
    cycles: 4,
  },
  0x7d: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'LD A, L',
    bytes: 1,
    cycles: 4,
  },
  0x7e: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'LD A, (HL)',
    bytes: 1,
    cycles: 4,
  },
  0x7f: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD A, A',
    bytes: 1,
    cycles: 4,
  },
  0x80: {
    action: add,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'ADD A, B',
    bytes: 1,
    cycles: 4,
  },
  0x81: {
    action: add,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'ADD A, C',
    bytes: 1,
    cycles: 4,
  },
  0x82: {
    action: add,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'ADD A, D',
    bytes: 1,
    cycles: 4,
  },
  0x83: {
    action: add,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'ADD A, E',
    bytes: 1,
    cycles: 4,
  },
  0x84: {
    action: add,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'ADD A, H',
    bytes: 1,
    cycles: 4,
  },
  0x85: {
    action: add,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'ADD A, L',
    bytes: 1,
    cycles: 4,
  },
  0x86: {
    action: add,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'ADD A, (HL)',
    bytes: 1,
    cycles: 8,
  },
  0x87: {
    action: add,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'ADD A, A',
    bytes: 1,
    cycles: 4,
  },
  0x88: {
    action: adc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'ADC A, B',
    bytes: 1,
    cycles: 4,
  },
  0x89: {
    action: adc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'ADC A, C',
    bytes: 1,
    cycles: 4,
  },
  0x8a: {
    action: adc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'ADC A, D',
    bytes: 1,
    cycles: 4,
  },
  0x8b: {
    action: adc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'ADC A, E',
    bytes: 1,
    cycles: 4,
  },
  0x8c: {
    action: adc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'ADC A, H',
    bytes: 1,
    cycles: 4,
  },
  0x8d: {
    action: adc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'ADC A, L',
    bytes: 1,
    cycles: 4,
  },
  0x8e: {
    action: adc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'ADC A, (HL)',
    bytes: 1,
    cycles: 8,
  },
  0x8f: {
    action: adc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'ADC A, A',
    bytes: 1,
    cycles: 4,
  },
  0x90: {
    action: sub,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SUB B',
    bytes: 1,
    cycles: 4,
  },
  0x91: {
    action: sub,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SUB C',
    bytes: 1,
    cycles: 4,
  },
  0x92: {
    action: sub,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SUB D',
    bytes: 1,
    cycles: 4,
  },
  0x93: {
    action: sub,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SUB E',
    bytes: 1,
    cycles: 4,
  },
  0x94: {
    action: sub,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SUB H',
    bytes: 1,
    cycles: 4,
  },
  0x95: {
    action: sub,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SUB L',
    bytes: 1,
    cycles: 4,
  },
  0x96: {
    action: sub,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SUB (HL)',
    bytes: 1,
    cycles: 8,
  },
  0x97: {
    action: sub,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SUB A',
    bytes: 1,
    cycles: 4,
  },
  0x98: {
    action: sbc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SBC A, B',
    bytes: 1,
    cycles: 4,
  },
  0x99: {
    action: sbc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'SBC A, C',
    bytes: 1,
    cycles: 4,
  },
  0x9a: {
    action: sbc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'SBC A, D',
    bytes: 1,
    cycles: 4,
  },
  0x9b: {
    action: sbc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'SBC A, E',
    bytes: 1,
    cycles: 4,
  },
  0x9c: {
    action: sbc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'SBC A, H',
    bytes: 1,
    cycles: 4,
  },
  0x9d: {
    action: sbc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'SBC A, L',
    bytes: 1,
    cycles: 4,
  },
  0x9e: {
    action: sbc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'SBC A, (HL)',
    bytes: 1,
    cycles: 4,
  },
  0x9f: {
    action: sbc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'SBC A, A',
    bytes: 1,
    cycles: 4,
  },
  0xa0: {
    action: and,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'AND B',
    bytes: 1,
    cycles: 4,
  },
  0xa1: {
    action: and,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'AND C',
    bytes: 1,
    cycles: 4,
  },
  0xa2: {
    action: and,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'AND D',
    bytes: 1,
    cycles: 4,
  },
  0xa3: {
    action: and,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'AND E',
    bytes: 1,
    cycles: 4,
  },
  0xa4: {
    action: and,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'AND H',
    bytes: 1,
    cycles: 4,
  },
  0xa5: {
    action: and,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'AND L',
    bytes: 1,
    cycles: 4,
  },
  0xa6: {
    action: and,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'AND (HL)',
    bytes: 1,
    cycles: 8,
  },
  0xa7: {
    action: and,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'AND A',
    bytes: 1,
    cycles: 4,
  },
  0xa8: {
    action: xor,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'XOR B',
    bytes: 1,
    cycles: 4,
  },
  0xa9: {
    action: xor,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'XOR C',
    bytes: 1,
    cycles: 4,
  },
  0xaa: {
    action: xor,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'XOR D',
    bytes: 1,
    cycles: 4,
  },
  0xab: {
    action: xor,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'XOR E',
    bytes: 1,
    cycles: 4,
  },
  0xac: {
    action: xor,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'XOR H',
    bytes: 1,
    cycles: 4,
  },
  0xad: {
    action: xor,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'XOR L',
    bytes: 1,
    cycles: 4,
  },
  0xae: {
    action: xor,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'XOR (HL)',
    bytes: 1,
    cycles: 8,
  },
  0xaf: {
    action: xor,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'XOR A',
    bytes: 1,
    cycles: 4,
  },
  0xb0: {
    action: or,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'OR B',
    bytes: 1,
    cycles: 4,
  },
  0xb1: {
    action: or,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'OR C',
    bytes: 1,
    cycles: 4,
  },
  0xb2: {
    action: or,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'OR D',
    bytes: 1,
    cycles: 4,
  },
  0xb3: {
    action: or,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'OR E',
    bytes: 1,
    cycles: 4,
  },
  0xb4: {
    action: or,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'OR H',
    bytes: 1,
    cycles: 4,
  },
  0xb5: {
    action: or,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'OR L',
    bytes: 1,
    cycles: 4,
  },
  0xb6: {
    action: or,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'OR (HL)',
    bytes: 1,
    cycles: 4,
  },
  0xb7: {
    action: or,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'OR A',
    bytes: 1,
    cycles: 4,
  },
  0xb8: {
    action: cp,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'CP B',
    bytes: 1,
    cycles: 4,
  },
  0xb9: {
    action: cp,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
      },
    ],
    mnemonic: 'CP C',
    bytes: 1,
    cycles: 4,
  },
  0xba: {
    action: cp,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_D,
      },
    ],
    mnemonic: 'CP D',
    bytes: 1,
    cycles: 4,
  },
  0xbb: {
    action: cp,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_E,
      },
    ],
    mnemonic: 'CP E',
    bytes: 1,
    cycles: 4,
  },
  0xbc: {
    action: cp,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_H,
      },
    ],
    mnemonic: 'CP H',
    bytes: 1,
    cycles: 4,
  },
  0xbd: {
    action: cp,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_L,
      },
    ],
    mnemonic: 'CP L',
    bytes: 1,
    cycles: 4,
  },
  0xbe: {
    action: cp,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
        isAddress: true,
      },
    ],
    mnemonic: 'CP (HL)',
    bytes: 1,
    cycles: 8,
  },
  0xbf: {
    action: cp,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'CP A',
    bytes: 1,
    cycles: 4,
  },
  0xc0: {
    action: retNz,
    operands: [],
    mnemonic: 'RET NZ',
    bytes: 1,
    cycles: 8,
  },
  0xc1: {
    action: pop,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_BC,
      },
    ],
    mnemonic: 'POP BC',
    bytes: 1,
    cycles: 12,
  },
  0xc2: {
    action: jpNz,
    operands: [
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'JP NZ a16',
    bytes: 1,
    cycles: 12,
  },
  0xc3: {
    action: jp,
    operands: [
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'JP a16',
    bytes: 3,
    cycles: 12,
  },
  0xc4: {
    action: callNz,
    operands: [
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'CALL NZ, a16',
    bytes: 3,
    cycles: 12,
  },
  0xc5: {
    action: push,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_BC,
      },
    ],
    mnemonic: 'PUSH BC',
    bytes: 1,
    cycles: 16,
  },
  0xc6: {
    action: add,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'ADD A, d8',
    bytes: 2,
    cycles: 8,
  },
  0xc7: {
    action: rst00,
    operands: [],
    mnemonic: 'RST 00',
    bytes: 1,
    cycles: 32,
  },
  0xc8: {
    action: retZ,
    operands: [],
    mnemonic: 'RET Z',
    bytes: 1,
    cycles: 8,
  },
  0xc9: {
    action: ret,
    operands: [],
    mnemonic: 'RET',
    bytes: 1,
    cycles: 8,
  },
  0xca: {
    action: jpZ,
    operands: [
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'JP Z a16',
    bytes: 1,
    cycles: 12,
  },
  0xcc: {
    action: callZ,
    operands: [
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'CALL Z, a16',
    bytes: 3,
    cycles: 12,
  },
  0xcd: {
    action: call,
    operands: [
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'CALL a16',
    bytes: 3,
    cycles: 24,
  },
  0xce: {
    action: adc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'ADC A, d8',
    bytes: 2,
    cycles: 8,
  },
  0xcf: {
    action: rst08,
    operands: [],
    mnemonic: 'RST 08',
    bytes: 1,
    cycles: 32,
  },
  0xd0: {
    action: retNc,
    operands: [],
    mnemonic: 'RET NC',
    bytes: 1,
    cycles: 8,
  },
  0xd1: {
    action: pop,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_DE,
      },
    ],
    mnemonic: 'POP DE',
    bytes: 1,
    cycles: 12,
  },
  0xd2: {
    action: jpNc,
    operands: [
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'JP NC a16',
    bytes: 1,
    cycles: 12,
  },
  0xd4: {
    action: callNc,
    operands: [
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'CALL NC, a16',
    bytes: 3,
    cycles: 12,
  },
  0xd5: {
    action: push,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_DE,
      },
    ],
    mnemonic: 'PUSH DE',
    bytes: 1,
    cycles: 16,
  },
  0xd6: {
    action: sub,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'SUB d8',
    bytes: 2,
    cycles: 8,
  },
  0xd7: {
    action: rst10,
    operands: [],
    mnemonic: 'RST 10',
    bytes: 1,
    cycles: 32,
  },
  0xd8: {
    action: retC,
    operands: [],
    mnemonic: 'RET C',
    bytes: 1,
    cycles: 8,
  },
  0xd9: {
    action: reti,
    operands: [],
    mnemonic: 'RETI',
    bytes: 1,
    cycles: 8,
  },
  0xda: {
    action: jpC,
    operands: [
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'JP C a16',
    bytes: 1,
    cycles: 12,
  },
  0xdc: {
    action: callC,
    operands: [
      {
        type: OperandType.Immediate16,
      },
    ],
    mnemonic: 'CALL C, a16',
    bytes: 3,
    cycles: 12,
  },
  0xde: {
    action: sbc,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_B,
      },
    ],
    mnemonic: 'SBC A, B',
    bytes: 2,
    cycles: 8,
  },
  0xdf: {
    action: rst18,
    operands: [],
    mnemonic: 'RST 18',
    bytes: 1,
    cycles: 32,
  },
  0xe0: {
    action: ld,
    operands: [
      {
        type: OperandType.Immediate8,
        isAddress: true,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LDH a8, A',
    bytes: 2,
    cycles: 12,
  },
  0xe1: {
    action: pop,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
      },
    ],
    mnemonic: 'POP HL',
    bytes: 1,
    cycles: 12,
  },
  0xe2: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_C,
        isAddress: true,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LD (C), A',
    bytes: 1,
    cycles: 8,
  },
  0xe5: {
    action: push,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
      },
    ],
    mnemonic: 'PUSH HL',
    bytes: 1,
    cycles: 16,
  },
  0xe6: {
    action: and,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'AND d8',
    bytes: 2,
    cycles: 8,
  },
  0xe7: {
    action: rst20,
    operands: [],
    mnemonic: 'RST 20',
    bytes: 1,
    cycles: 32,
  },
  0xe8: {
    action: addSp,
    operands: [
      {
        type: OperandType.Immediate8Signed,
      },
    ],
    mnemonic: 'ADD SP, r8',
    bytes: 2,
    cycles: 16,
  },
  0xe9: {
    action: jp,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_HL,
      },
    ],
    mnemonic: 'JP HL',
    bytes: 1,
    cycles: 4,
  },
  0xea: {
    action: ld,
    operands: [
      {
        type: OperandType.Immediate16,
        isAddress: true,
      },
      {
        type: OperandType.Register8,
        target: REG_A,
      },
    ],
    mnemonic: 'LDH a16, A',
    bytes: 3,
    cycles: 16,
  },
  0xee: {
    action: xor,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'XOR d8',
    bytes: 1,
    cycles: 8,
  },
  0xef: {
    action: rst28,
    operands: [],
    mnemonic: 'RST 28',
    bytes: 1,
    cycles: 32,
  },
  0xf0: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Immediate8,
        isAddress: true,
      },
    ],
    mnemonic: 'LDH A, a8',
    bytes: 2,
    cycles: 12,
  },
  0xf1: {
    action: pop,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_AF,
      },
    ],
    mnemonic: 'POP AF',
    bytes: 1,
    cycles: 12,
  },
  0xf2: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Register8,
        target: REG_C,
        isAddress: true,
      },
    ],
    mnemonic: 'POP AF',
    bytes: 1,
    cycles: 12,
  },
  0xf3: {
    action: di,
    operands: [],
    mnemonic: 'DI',
    bytes: 1,
    cycles: 4,
  },
  0xf5: {
    action: push,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_AF,
      },
    ],
    mnemonic: 'PUSH AF',
    bytes: 1,
    cycles: 16,
  },
  0xf6: {
    action: or,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
        isAddress: true,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'OR d8',
    bytes: 1,
    cycles: 8,
  },
  0xf7: {
    action: rst30,
    operands: [],
    mnemonic: 'RST 30',
    bytes: 1,
    cycles: 32,
  },
  0xf8: {
    action: ldHlSpE8,
    operands: [],
    mnemonic: 'LD HL, SP + r8',
    bytes: 2,
    cycles: 12,
  },
  0xf9: {
    action: ld,
    operands: [
      {
        type: OperandType.Register16,
        target: REG_SP,
      },
      {
        type: OperandType.Register16,
        target: REG_HL,
      },
    ],
    mnemonic: 'LD SP, HL',
    bytes: 1,
    cycles: 8,
  },
  0xfa: {
    action: ld,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Immediate16,
        isAddress: true,
      },
    ],
    mnemonic: 'LD A, a16',
    bytes: 1,
    cycles: 16,
  },
  0xfb: {
    action: ei,
    operands: [],
    mnemonic: 'EI',
    bytes: 1,
    cycles: 4,
  },
  0xfe: {
    action: cp,
    operands: [
      {
        type: OperandType.Register8,
        target: REG_A,
      },
      {
        type: OperandType.Immediate8,
      },
    ],
    mnemonic: 'CP d8',
    bytes: 2,
    cycles: 8,
  },
  0xff: {
    action: rst38,
    operands: [],
    mnemonic: 'RST 38',
    bytes: 1,
    cycles: 32,
  },
};

export default main;
