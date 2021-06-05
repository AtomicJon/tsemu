import Cpu from './Cpu';

export function nop(cpu: Cpu): void { /* No op */ }

/**
 * Load Functions
 */
// LD n,A
export function ld_A_A(cpu: Cpu): void {
  // Noop - A = A
}

export function ld_B_A(cpu: Cpu): void {
  cpu.B = cpu.A;
}

export function ld_C_A(cpu: Cpu): void {
  cpu.C = cpu.A;
}

export function ld_D_A(cpu: Cpu): void {
  cpu.D = cpu.A;
}

export function ld_E_A(cpu: Cpu): void {
  cpu.E = cpu.A;
}

export function ld_H_A(cpu: Cpu): void {
  cpu.H = cpu.A;
}

export function ld_L_A(cpu: Cpu): void {
  cpu.L = cpu.A;
}

export function ld_BCa_A(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.BC, cpu.A)
}

export function ld_DEa_A(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.DE, cpu.A)
}

export function ld_HLa_A(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.HL, cpu.A)
}

export function ld_a16_A(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.read16(), cpu.A)
  cpu.PC += 2;
}

export function ld_a16_SP(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.read16(), cpu.SP)
  cpu.PC += 2;
}

// LD A,n
export function ld_A_B(cpu: Cpu): void {
  cpu.A = cpu.B;
}

export function ld_A_C(cpu: Cpu): void {
  cpu.A = cpu.C;
}

export function ld_A_D(cpu: Cpu): void {
  cpu.A = cpu.D;
}

export function ld_A_E(cpu: Cpu): void {
  cpu.A = cpu.E;
}

export function ld_A_H(cpu: Cpu): void {
  cpu.A = cpu.H;
}

export function ld_A_L(cpu: Cpu): void {
  cpu.A = cpu.L;
}

export function ld_A_BCa(cpu: Cpu): void {
  cpu.A = cpu.memoryMap.read8(cpu.BC);
}

export function ld_A_DEa(cpu: Cpu): void {
  cpu.A = cpu.memoryMap.read8(cpu.DE);
}

export function ld_A_HLa(cpu: Cpu): void {
  cpu.A = cpu.memoryMap.read8(cpu.HL);
}

export function ld_A_a16(cpu: Cpu): void {
  cpu.A = cpu.memoryMap.read8(cpu.read16());
  cpu.PC += 2;
}

export function ld_A_d8(cpu: Cpu): void {
  cpu.A = cpu.read8();
  cpu.PC += 1;
}

// LD B,n
export function ld_B_B(cpu: Cpu): void {
  // Noop B = B
}

export function ld_B_C(cpu: Cpu): void {
  cpu.B = cpu.C;
}

export function ld_B_D(cpu: Cpu): void {
  cpu.B = cpu.D;
}

export function ld_B_E(cpu: Cpu): void {
  cpu.B = cpu.E;
}

export function ld_B_H(cpu: Cpu): void {
  cpu.B = cpu.H;
}

export function ld_B_L(cpu: Cpu): void {
  cpu.B = cpu.L;
}

export function ld_B_HLa(cpu: Cpu): void {
  cpu.B = cpu.memoryMap.read8(cpu.HL);
}

// LD C,n
export function ld_C_B(cpu: Cpu): void {
  cpu.C = cpu.B;
}

export function ld_C_C(cpu: Cpu): void {
  // Noop C = C
}

export function ld_C_D(cpu: Cpu): void {
  cpu.C = cpu.D;
}

export function ld_C_E(cpu: Cpu): void {
  cpu.C = cpu.E;
}

export function ld_C_H(cpu: Cpu): void {
  cpu.C = cpu.H;
}

export function ld_C_L(cpu: Cpu): void {
  cpu.C = cpu.L;
}

export function ld_C_HLa(cpu: Cpu): void {
  cpu.C = cpu.memoryMap.read8(cpu.HL);
}

// LD D,n
export function ld_D_B(cpu: Cpu): void {
  cpu.D = cpu.B;
}

export function ld_D_C(cpu: Cpu): void {
  cpu.D = cpu.C;
}

export function ld_D_D(cpu: Cpu): void {
  // Noop D = D
}

export function ld_D_E(cpu: Cpu): void {
  cpu.D = cpu.E;
}

export function ld_D_H(cpu: Cpu): void {
  cpu.D = cpu.H;
}

export function ld_D_L(cpu: Cpu): void {
  cpu.D = cpu.L;
}

export function ld_D_HLa(cpu: Cpu): void {
  cpu.D = cpu.memoryMap.read8(cpu.HL);
}

// LD E,n
export function ld_E_B(cpu: Cpu): void {
  cpu.E = cpu.B;
}

export function ld_E_C(cpu: Cpu): void {
  cpu.E = cpu.C;
}

export function ld_E_D(cpu: Cpu): void {
  cpu.E = cpu.D;
}

export function ld_E_E(cpu: Cpu): void {
  // Noop E = E
}

export function ld_E_H(cpu: Cpu): void {
  cpu.E = cpu.H;
}

export function ld_E_L(cpu: Cpu): void {
  cpu.E = cpu.L;
}

export function ld_E_HLa(cpu: Cpu): void {
  cpu.E = cpu.memoryMap.read8(cpu.HL);
}

// LD H,n
export function ld_H_B(cpu: Cpu): void {
  cpu.H = cpu.B;
}

export function ld_H_C(cpu: Cpu): void {
  cpu.H = cpu.C;
}

export function ld_H_D(cpu: Cpu): void {
  cpu.H = cpu.D;
}

export function ld_H_E(cpu: Cpu): void {
  cpu.H = cpu.E;
}

export function ld_H_H(cpu: Cpu): void {
  // Noop H = H
}

export function ld_H_L(cpu: Cpu): void {
  cpu.H = cpu.L;
}

export function ld_H_HLa(cpu: Cpu): void {
  cpu.H = cpu.memoryMap.read8(cpu.HL);
}

// LD L,n
export function ld_L_B(cpu: Cpu): void {
  cpu.L = cpu.B;
}

export function ld_L_C(cpu: Cpu): void {
  cpu.L = cpu.C;
}

export function ld_L_D(cpu: Cpu): void {
  cpu.L = cpu.D;
}

export function ld_L_E(cpu: Cpu): void {
  cpu.L = cpu.E;
}

export function ld_L_H(cpu: Cpu): void {
  cpu.L = cpu.H;
}

export function ld_L_L(cpu: Cpu): void {
  // Noop L = L
}

export function ld_L_HLa(cpu: Cpu): void {
  cpu.L = cpu.memoryMap.read8(cpu.HL);
}

// LD (HL),n
export function ld_HLa_B(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.HL, cpu.B)
}

export function ld_HLa_C(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.HL, cpu.C)
}

export function ld_HLa_D(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.HL, cpu.D)
}

export function ld_HLa_E(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.HL, cpu.E)
}

export function ld_HLa_H(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.HL, cpu.H)
}

export function ld_HLa_L(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.HL, cpu.L)
}

// LD nn,n
export function ld_B_d8(cpu: Cpu): void {
  cpu.B = cpu.read8();
  cpu.PC += 1;
}

export function ld_C_d8(cpu: Cpu): void {
  cpu.C = cpu.read8();
  cpu.PC += 1;
}

export function ld_D_d8(cpu: Cpu): void {
  cpu.D = cpu.read8();
  cpu.PC += 1;
}

export function ld_E_d8(cpu: Cpu): void {
  cpu.E = cpu.read8();
  cpu.PC += 1;
}

export function ld_H_d8(cpu: Cpu): void {
  cpu.C = cpu.read8();
  cpu.PC += 1;
}

export function ld_L_d8(cpu: Cpu): void {
  cpu.L = cpu.read8();
  cpu.PC += 1;
}

export function ld_A_HLi(cpu: Cpu): void {
  cpu.A = cpu.memoryMap.read8(cpu.HL);
  cpu.HL += 1;
}

export function ld_A_HLd(cpu: Cpu): void {
  cpu.A = cpu.memoryMap.read16(cpu.HL);
  cpu.HL -= 1;
}

export function ld_HLDa_A(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.HL, cpu.A);
  cpu.HL -= 1;
}

export function ld_HLa_d8(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.HL, cpu.read8());
  cpu.PC += 1;
}

// Others
export function ld_HLi_A(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.HL, cpu.A);
  cpu.HL += 1;
}

export function ld_SP_HL(cpu: Cpu): void {
  cpu.SP = cpu.HL;
}

// 16 bit Loads - LD n,nn
export function ld_BC_d16(cpu: Cpu): void {
  cpu.BC = cpu.read16();
  cpu.PC += 2;
}

export function ld_DE_d16(cpu: Cpu): void {
  cpu.DE = cpu.read16();
  cpu.PC += 2;
}

export function ld_HL_d16(cpu: Cpu): void {
  cpu.HL = cpu.read16();
  cpu.PC += 2;
}

export function ld_SP_d16(cpu: Cpu): void {
  cpu.SP = cpu.read16();
  cpu.PC += 2;
}

/**
 * Jump Relative Functions
 */
export function jr_r8(cpu: Cpu): void {
  const jumpOffset = cpu.read8Signed();
  cpu.PC = cpu.PC + jumpOffset + 1;
}

export function jr_nz_r8(cpu: Cpu): void {
  if (!cpu.flagZ) {
    const jumpOffset = cpu.read8Signed();
    cpu.PC = cpu.PC + jumpOffset;
  }

  cpu.PC += 1;
}

export function jr_z_r8(cpu: Cpu): void {
  if (cpu.flagZ) {
    const jumpOffset = cpu.read8Signed();
    cpu.PC = cpu.PC + jumpOffset;
  }

  cpu.PC += 1;
}

export function jr_nc_r8(cpu: Cpu): void {
  if (!cpu.flagC) {
    const jumpOffset = cpu.read8Signed();
    cpu.PC = cpu.PC + jumpOffset;
  }

  cpu.PC += 1;
}

export function jr_c_r8(cpu: Cpu): void {
  if (cpu.flagC) {
    const jumpOffset = cpu.read8Signed();
    cpu.PC = cpu.PC + jumpOffset;
  }

  cpu.PC += 1;
}

/**
 * Jump Functions
 */
export function jp_a16(cpu: Cpu): void {
  cpu.PC = cpu.read16();
}

export function jp_HL(cpu: Cpu): void {
  cpu.PC = cpu.HL;
}

export function jp_nz_a16(cpu: Cpu): void {
  if (!cpu.flagZ) {
    cpu.PC = cpu.read16();
  } else {
    cpu.PC += 2;
  }
}

export function jp_z_a16(cpu: Cpu): void {
  if (cpu.flagZ) {
    cpu.PC = cpu.read16();
  } else {
    cpu.PC += 2;
  }
}

export function jp_nc_a16(cpu: Cpu): void {
  if (!cpu.flagC) {
    cpu.PC = cpu.read16();
  } else {
    cpu.PC += 2;
  }
}

export function jp_c_a16(cpu: Cpu): void {
  if (cpu.flagC) {
    cpu.PC = cpu.read16();
  } else {
    cpu.PC += 2;
  }
}

/**
 * Call Functions
 */
export function call_a16(cpu: Cpu): void {
  const toAddress = cpu.read16();
  cpu.PC += 2;
  push_common(cpu, cpu.PC);
  cpu.PC = toAddress;
}

export function call_nz_a16(cpu: Cpu): void {
  const toAddress = cpu.read16();
  cpu.PC += 2;
  if (!cpu.flagZ) {
    push_common(cpu, cpu.PC);
    cpu.PC = toAddress;
  }
}

export function call_z_a16(cpu: Cpu): void {
  const toAddress = cpu.read16();
  cpu.PC += 2;
  if (cpu.flagZ) {
    push_common(cpu, cpu.PC);
    cpu.PC = toAddress;
  }
}

export function call_nc_a16(cpu: Cpu): void {
  const toAddress = cpu.read16();
  cpu.PC += 2;
  if (!cpu.flagC) {
    push_common(cpu, cpu.PC);
    cpu.PC = toAddress;
  }
}

export function call_c_a16(cpu: Cpu): void {
  const toAddress = cpu.read16();
  cpu.PC += 2;
  if (cpu.flagC) {
    push_common(cpu, cpu.PC);
    cpu.PC = toAddress;
  }
}


/**
 * Returns
 */
export function ret(cpu: Cpu): void {
  const address = pop_common(cpu);
  cpu.PC = address;
}

export function reti(cpu: Cpu): void {
  ret(cpu);
  ei(cpu);
}

export function ret_nz(cpu: Cpu): void {
  if (!cpu.flagZ) {
    ret(cpu);
  }
}

export function ret_z(cpu: Cpu): void {
  if (cpu.flagZ) {
    ret(cpu);
  }
}

export function ret_nc(cpu: Cpu): void {
  if (!cpu.flagC) {
    ret(cpu);
  }
}

export function ret_c(cpu: Cpu): void {
  if (cpu.flagC) {
    ret(cpu);
  }
}

/**
 * Push functions
 */
function push_common(cpu: Cpu, value: number): void {
  cpu.SP -= 2;
  cpu.memoryMap.write16(cpu.SP, value);
}

export function push_AF(cpu: Cpu): void {
  push_common(cpu, cpu.AF);
}

export function push_BC(cpu: Cpu): void {
  push_common(cpu, cpu.BC);
}

export function push_DE(cpu: Cpu): void {
  push_common(cpu, cpu.DE);
}

export function push_HL(cpu: Cpu): void {
  push_common(cpu, cpu.HL);
}

/**
 * Pop functions
 */
function pop_common(cpu: Cpu): number {
  const value = cpu.memoryMap.read16(cpu.SP);
  cpu.SP += 2;
  return value;
}

export function pop_AF(cpu: Cpu): void {
  cpu.AF = pop_common(cpu);
}

export function pop_BC(cpu: Cpu): void {
  cpu.BC = pop_common(cpu);
}

export function pop_DE(cpu: Cpu): void {
  cpu.DE = pop_common(cpu);
}

export function pop_HL(cpu: Cpu): void {
  cpu.HL = pop_common(cpu);
}

/**
 * Restart functions
 */
function rst(cpu: Cpu, value: number): void {
  push_common(cpu, cpu.PC);
  cpu.PC = value;
}

export function rst_00(cpu: Cpu): void {
  rst(cpu, 0x00);
}

export function rst_08(cpu: Cpu): void {
  rst(cpu, 0x08);
}

export function rst_10(cpu: Cpu): void {
  rst(cpu, 0x10);
}

export function rst_18(cpu: Cpu): void {
  rst(cpu, 0x18);
}

export function rst_20(cpu: Cpu): void {
  rst(cpu, 0x20);
}

export function rst_28(cpu: Cpu): void {
  rst(cpu, 0x28);
}

export function rst_30(cpu: Cpu): void {
  rst(cpu, 0x00);
}

export function rst_38(cpu: Cpu): void {
  rst(cpu, 0x38);
}

/**
 * Decrement Functions
 */
function dec_common(cpu: Cpu, result: number): void {
  cpu.flagZ = result === 0;
  cpu.flagN = true;
  cpu.flagH = (((result + 1) & 0x10) === 0x10) && ((result & 0x10) !== 0x10);
}

export function dec_A(cpu: Cpu): void {
  cpu.A -= 1;
  dec_common(cpu, cpu.A);
}

export function dec_B(cpu: Cpu): void {
  cpu.B -= 1;
  dec_common(cpu, cpu.B);
}

export function dec_C(cpu: Cpu): void {
  cpu.C -= 1;
  dec_common(cpu, cpu.C);
}

export function dec_D(cpu: Cpu): void {
  cpu.D -= 1;
  dec_common(cpu, cpu.D);
}

export function dec_E(cpu: Cpu): void {
  cpu.E -= 1;
  dec_common(cpu, cpu.E);
}

export function dec_H(cpu: Cpu): void {
  cpu.H -= 1;
  dec_common(cpu, cpu.H);
}

export function dec_L(cpu: Cpu): void {
  cpu.L -= 1;
  dec_common(cpu, cpu.L);
}

export function dec_HLa(cpu: Cpu): void {
  const result = cpu.memoryMap.read8(cpu.HL) - 1;
  cpu.memoryMap.write8(cpu.HL, result);
  dec_common(cpu, result);
}

// (DEC nn) - no flags affected
export function dec_BC(cpu: Cpu): void {
  cpu.BC -= 1;
}

/**
 * Increment Functions
 */
function inc_common(cpu: Cpu, value: number): number {
  const result = value + 1;
  cpu.flagZ = result === 0;
  cpu.flagN = false;
  cpu.flagH = ((value & 0x10) !== 0x10) && ((result & 0x10) === 0x10);

  return result & 0xFF;
}

export function inc_A(cpu: Cpu): void {
  cpu.A = inc_common(cpu, cpu.A);
}

export function inc_B(cpu: Cpu): void {
  cpu.B = inc_common(cpu, cpu.B);
}

export function inc_C(cpu: Cpu): void {
  cpu.C = inc_common(cpu, cpu.C);
}

export function inc_D(cpu: Cpu): void {
  cpu.D = inc_common(cpu, cpu.D);
}

export function inc_E(cpu: Cpu): void {
  cpu.E = inc_common(cpu, cpu.E);
}

export function inc_H(cpu: Cpu): void {
  cpu.H = inc_common(cpu, cpu.H);
}

export function inc_L(cpu: Cpu): void {
  cpu.L = inc_common(cpu, cpu.L);
}

export function inc_HLa(cpu: Cpu): void {
  const value = cpu.memoryMap.read8(cpu.HL) + 1;
  cpu.memoryMap.write8(cpu.HL, inc_common(cpu, value));
}

export function inc_BC(cpu: Cpu): void {
  cpu.BC += 1;
}

export function inc_DE(cpu: Cpu): void {
  cpu.DE += 1;
}

export function inc_HL(cpu: Cpu): void {
  cpu.HL += 1;
}

export function inc_SP(cpu: Cpu): void {
  cpu.SP += 1;
}

/**
 * 8 bit Add Functions
 */
function add_common(cpu: Cpu) {
  cpu.flagZ = cpu.A === 0;

  cpu.flagN = false;
  cpu.flagH = (((cpu.A - 1) & 0x10) !== 0x10) && ((cpu.A & 0x10) === 0x10);
  cpu.flagC = (cpu.A & 0x100) === 0x100;

  cpu.A = cpu.A & 0xFF;
}

export function add_A_A(cpu: Cpu): void {
  cpu.A = cpu.A + cpu.A;
  add_common(cpu);
}

export function add_A_B(cpu: Cpu): void {
  cpu.A = cpu.A + cpu.B;
  add_common(cpu);
}

export function add_A_C(cpu: Cpu): void {
  cpu.A = cpu.A + cpu.C;
  add_common(cpu);
}

export function add_A_D(cpu: Cpu): void {
  cpu.A = cpu.A + cpu.D;
  add_common(cpu);
}

export function add_A_E(cpu: Cpu): void {
  cpu.A = cpu.A + cpu.E;
  add_common(cpu);
}

export function add_A_H(cpu: Cpu): void {
  cpu.A = cpu.A + cpu.H;
  add_common(cpu);
}

export function add_A_L(cpu: Cpu): void {
  cpu.A = cpu.A + cpu.L;
  add_common(cpu);
}

export function add_A_HLa(cpu: Cpu): void {
  cpu.A = cpu.A + cpu.memoryMap.read8(cpu.HL);
  add_common(cpu);
}

export function add_A_d8(cpu: Cpu): void {
  cpu.A = cpu.A + cpu.read8();
  add_common(cpu);

  cpu.PC += 1;
}

/**
 * 16 bit Add Functions
 */
function add_16_common(cpu: Cpu) {
  cpu.flagN = false;
  // If carry to bit 11
  cpu.flagH = (((cpu.HL - 1) & 0x1000) !== 0x1000) && ((cpu.HL & 0x1000) === 0x1000);
  // If carry to bit 15
  cpu.flagC = (cpu.HL & 0x10000) === 0x10000;

  cpu.HL = cpu.HL & 0xFFFF;
}

export function add_HL_BC(cpu: Cpu): void {
  cpu.HL = cpu.HL + cpu.BC;
  add_16_common(cpu);
}

export function add_HL_DE(cpu: Cpu): void {
  cpu.HL = cpu.HL + cpu.DE;
  add_16_common(cpu);
}

export function add_HL_HL(cpu: Cpu): void {
  cpu.HL = cpu.HL + cpu.HL;
  add_16_common(cpu);
}

export function add_HL_SP(cpu: Cpu): void {
  cpu.HL = cpu.HL + cpu.SP;
  add_16_common(cpu);
}

/**
 * Subtraction functions
 */
function sub_common(cpu: Cpu): void {
  cpu.flagZ = cpu.A === 0;
  cpu.flagN = true;

  cpu.flagH = (((cpu.A + 1) & 0x10) === 0x10) && ((cpu.A & 0x10) !== 0x10);
  cpu.flagC = cpu.A < 0;
  cpu.A = cpu.A & 0xFF;
}

export function sub_A(cpu: Cpu): void {
  cpu.A = cpu.A - cpu.A;
  sub_common(cpu);
}

export function sub_B(cpu: Cpu): void {
  cpu.A = cpu.A - cpu.B;
  sub_common(cpu);
}

export function sub_C(cpu: Cpu): void {
  cpu.A = cpu.A - cpu.C;
  sub_common(cpu);
}

export function sub_D(cpu: Cpu): void {
  cpu.A = cpu.A - cpu.D;
  sub_common(cpu);
}

export function sub_E(cpu: Cpu): void {
  cpu.A = cpu.A - cpu.E;
  sub_common(cpu);
}

export function sub_H(cpu: Cpu): void {
  cpu.A = cpu.A - cpu.H;
  sub_common(cpu);
}

export function sub_L(cpu: Cpu): void {
  cpu.A = cpu.A - cpu.L;
  sub_common(cpu);
}

export function sub_HLa(cpu: Cpu): void {
  cpu.A = cpu.A - cpu.memoryMap.read8(cpu.HL);
  sub_common(cpu);
}

export function sub_d8(cpu: Cpu): void {
  cpu.A = cpu.A - cpu.read8();
  sub_common(cpu);
  cpu.PC += 1;
}

/**
 * AND Functions
 */
function and_common(cpu: Cpu): void {
  cpu.flagZ = cpu.A === 0;
  cpu.flagN = false;
  cpu.flagH = true;
  cpu.flagC = false;
}

export function and_A(cpu: Cpu): void {
  // Noop? A & A = A
  and_common(cpu);
}

export function and_B(cpu: Cpu): void {
  cpu.A = cpu.A & cpu.B;
  and_common(cpu);
}

export function and_C(cpu: Cpu): void {
  cpu.A = cpu.A & cpu.C;
  and_common(cpu);
}

export function and_D(cpu: Cpu): void {
  cpu.A = cpu.A & cpu.D;
  and_common(cpu);
}

export function and_E(cpu: Cpu): void {
  cpu.A = cpu.A & cpu.E;
  and_common(cpu);
}

export function and_H(cpu: Cpu): void {
  cpu.A = cpu.A & cpu.H;
  and_common(cpu);
}

export function and_L(cpu: Cpu): void {
  cpu.A = cpu.A & cpu.L;
  and_common(cpu);
}

export function and_HLa(cpu: Cpu): void {
  cpu.A = cpu.A & cpu.memoryMap.read8(cpu.HL);
  and_common(cpu);
}

export function and_d8(cpu: Cpu): void {
  cpu.A = cpu.A & cpu.read8();
  and_common(cpu);
  cpu.PC += 1;
}


/**
 * OR Functions
 */
function or_common(cpu: Cpu): void {
  cpu.flagZ = cpu.A === 0;
  cpu.flagN = false;
  cpu.flagH = false;
  cpu.flagC = false;
}

export function or_A(cpu: Cpu): void {
  cpu.A = cpu.A | cpu.A;
  or_common(cpu);
}

export function or_B(cpu: Cpu): void {
  cpu.A = cpu.A | cpu.B;
  or_common(cpu);
}

export function or_C(cpu: Cpu): void {
  cpu.A = cpu.A | cpu.C;
  or_common(cpu);
}

export function or_D(cpu: Cpu): void {
  cpu.A = cpu.A | cpu.D;
  or_common(cpu);
}

export function or_E(cpu: Cpu): void {
  cpu.A = cpu.A | cpu.E;
  or_common(cpu);
}

export function or_H(cpu: Cpu): void {
  cpu.A = cpu.A | cpu.H;
  or_common(cpu);
}

export function or_L(cpu: Cpu): void {
  cpu.A = cpu.A | cpu.L;
  or_common(cpu);
}

export function or_HLa(cpu: Cpu): void {
  cpu.A = cpu.A | cpu.memoryMap.read8(cpu.HL);
  or_common(cpu);
}

export function or_d8(cpu: Cpu): void {
  cpu.A = cpu.A | cpu.read8();
  cpu.PC += 1;
  or_common(cpu);
}

/**
 * XOR Functions
 */
function xor_common(cpu: Cpu): void {
  cpu.flagZ = cpu.A === 0;
  cpu.flagN = false;
  cpu.flagH = false;
  cpu.flagC = false;
}

export function xor_A(cpu: Cpu): void {
  // cpu.A = 0 - xor number with itself should zero bits?
  cpu.A = cpu.A ^ cpu.A;
  xor_common(cpu);
}

export function xor_B(cpu: Cpu): void {
  cpu.A = cpu.A ^ cpu.B;
  xor_common(cpu);
}

export function xor_C(cpu: Cpu): void {
  cpu.A = cpu.A ^ cpu.C;
  xor_common(cpu);
}

export function xor_D(cpu: Cpu): void {
  cpu.A = cpu.A ^ cpu.D;
  xor_common(cpu);
}

export function xor_E(cpu: Cpu): void {
  cpu.A = cpu.A ^ cpu.E;
  xor_common(cpu);
}

export function xor_H(cpu: Cpu): void {
  cpu.A = cpu.A ^ cpu.H;
  xor_common(cpu);
}

export function xor_L(cpu: Cpu): void {
  cpu.A = cpu.A ^ cpu.L;
  xor_common(cpu);
}

export function xor_HLa(cpu: Cpu): void {
  cpu.A = cpu.A ^ cpu.memoryMap.read8(cpu.HL);
}

export function xor_d8(cpu: Cpu): void {
  cpu.A = cpu.A ^ cpu.read8();
  xor_common(cpu);
  cpu.PC += 1;
}


/**
 * Rotate  Functions
 */
export function rlca(cpu: Cpu): void {
  const rotatedValue = cpu.A << 1;
  let result = rotatedValue;
  // Move carry to carry flag (existing flag discarded)
  cpu.flagC = (result & 256) === 256;
  cpu.flagZ = result === 0;

  // Shift the carry flag in
  if (cpu.flagC) {
    result = result | 0x01;
  }

  cpu.flagN = false;
  cpu.flagH = false;

  cpu.A = result & 0xFF;
}

function rl(cpu: Cpu, value: number): number {
  const rotatedValue = value << 1;
  let result = rotatedValue;
  // Shift the carry flag in
  if (cpu.flagC) {
    result = result | 0x01;
  }
  // Move carry to carry flag
  cpu.flagC = (result & 256) === 256;
  cpu.flagZ = result === 0;

  cpu.flagN = false;
  cpu.flagH = false;

  return result & 0xFF;
}

export function rlA(cpu: Cpu): void {
  cpu.A = rl(cpu, cpu.A);
}

export function rlB(cpu: Cpu): void {
  cpu.B = rl(cpu, cpu.B);
}

export function rlC(cpu: Cpu): void {
  cpu.C = rl(cpu, cpu.C);
}

export function rlD(cpu: Cpu): void {
  cpu.D = rl(cpu, cpu.D);
}

export function rlE(cpu: Cpu): void {
  cpu.E = rl(cpu, cpu.E);
}

export function rlH(cpu: Cpu): void {
  cpu.H = rl(cpu, cpu.H);
}

export function rlL(cpu: Cpu): void {
  cpu.L = rl(cpu, cpu.L);
}

export function rlHLa(cpu: Cpu): void {
  cpu.memoryMap.write8(cpu.HL, rl(cpu, cpu.memoryMap.read8(cpu.HL)));
}

/**
 * Swap  Functions
 */
function swap(value: number) {
  return ((value << 4) | (value >> 4)) & 0xFF; // Have to mask to 1 byte
}

function swp_common(cpu: Cpu, result: number): void {
  cpu.flagZ = result === 0;
}

export function swp_A(cpu: Cpu): void {
  cpu.A = swap(cpu.A);
  swp_common(cpu, cpu.A);
}

export function swp_B(cpu: Cpu): void {
  cpu.B = swap(cpu.B);
  swp_common(cpu, cpu.B);
}

export function swp_C(cpu: Cpu): void {
  cpu.C = swap(cpu.C);
  swp_common(cpu, cpu.C);
}

export function swp_D(cpu: Cpu): void {
  cpu.D = swap(cpu.D);
  swp_common(cpu, cpu.D);
}

export function swp_E(cpu: Cpu): void {
  cpu.E = swap(cpu.E);
  swp_common(cpu, cpu.E);
}

export function swp_H(cpu: Cpu): void {
  cpu.H = swap(cpu.H);
  swp_common(cpu, cpu.H);
}

export function swp_L(cpu: Cpu): void {
  cpu.L = swap(cpu.L);
  swp_common(cpu, cpu.L);
}

export function swp_HLa(cpu: Cpu): void {
  const value = cpu.memoryMap.read8(cpu.HL);
  const result = swap(value);
  cpu.memoryMap.write8(cpu.HL, result);
  swp_common(cpu, result);
}

/**
 * Bit Check Functions
 */
function bit_common(cpu: Cpu, result: boolean): void {
  cpu.flagZ = !result;
  cpu.flagN = false;
  cpu.flagH = true;
}

// BIT 0
export function bit_0_A(cpu: Cpu): void {
  bit_common(cpu, (cpu.A & 0x01) > 0);
}

export function bit_0_B(cpu: Cpu): void {
  bit_common(cpu, (cpu.B & 0x01) > 0);
}

export function bit_0_C(cpu: Cpu): void {
  bit_common(cpu, (cpu.C & 0x01) > 0);
}

export function bit_0_D(cpu: Cpu): void {
  bit_common(cpu, (cpu.D & 0x01) > 0);
}

export function bit_0_E(cpu: Cpu): void {
  bit_common(cpu, (cpu.E & 0x01) > 0);
}

export function bit_0_H(cpu: Cpu): void {
  bit_common(cpu, (cpu.H & 0x01) > 0);
}

export function bit_0_L(cpu: Cpu): void {
  bit_common(cpu, (cpu.L & 0x01) > 0);
}

export function bit_0_HLa(cpu: Cpu): void {
  bit_common(cpu, (cpu.memoryMap.read8(cpu.HL) & 0x01) > 0);
}

// BIT 1
export function bit_1_A(cpu: Cpu): void {
  bit_common(cpu, (cpu.A & 0x02) > 0);
}

export function bit_1_B(cpu: Cpu): void {
  bit_common(cpu, (cpu.B & 0x02) > 0);
}

export function bit_1_C(cpu: Cpu): void {
  bit_common(cpu, (cpu.C & 0x02) > 0);
}

export function bit_1_D(cpu: Cpu): void {
  bit_common(cpu, (cpu.D & 0x02) > 0);
}

export function bit_1_E(cpu: Cpu): void {
  bit_common(cpu, (cpu.E & 0x02) > 0);
}

export function bit_1_H(cpu: Cpu): void {
  bit_common(cpu, (cpu.H & 0x02) > 0);
}

export function bit_1_L(cpu: Cpu): void {
  bit_common(cpu, (cpu.L & 0x02) > 0);
}

export function bit_1_HLa(cpu: Cpu): void {
  bit_common(cpu, (cpu.memoryMap.read8(cpu.HL) & 0x02) > 0);
}

// BIT 2
export function bit_2_A(cpu: Cpu): void {
  bit_common(cpu, (cpu.A & 0x04) > 0);
}

export function bit_2_B(cpu: Cpu): void {
  bit_common(cpu, (cpu.B & 0x04) > 0);
}

export function bit_2_C(cpu: Cpu): void {
  bit_common(cpu, (cpu.C & 0x04) > 0);
}

export function bit_2_D(cpu: Cpu): void {
  bit_common(cpu, (cpu.D & 0x04) > 0);
}

export function bit_2_E(cpu: Cpu): void {
  bit_common(cpu, (cpu.E & 0x04) > 0);
}

export function bit_2_H(cpu: Cpu): void {
  bit_common(cpu, (cpu.H & 0x04) > 0);
}

export function bit_2_L(cpu: Cpu): void {
  bit_common(cpu, (cpu.L & 0x04) > 0);
}

export function bit_2_HLa(cpu: Cpu): void {
  bit_common(cpu, (cpu.memoryMap.read8(cpu.HL) & 0x04) > 0);
}

// BIT 3
export function bit_3_A(cpu: Cpu): void {
  bit_common(cpu, (cpu.A & 0x08) > 0);
}

export function bit_3_B(cpu: Cpu): void {
  bit_common(cpu, (cpu.B & 0x08) > 0);
}

export function bit_3_C(cpu: Cpu): void {
  bit_common(cpu, (cpu.C & 0x08) > 0);
}

export function bit_3_D(cpu: Cpu): void {
  bit_common(cpu, (cpu.D & 0x08) > 0);
}

export function bit_3_E(cpu: Cpu): void {
  bit_common(cpu, (cpu.E & 0x08) > 0);
}

export function bit_3_H(cpu: Cpu): void {
  bit_common(cpu, (cpu.H & 0x08) > 0);
}

export function bit_3_L(cpu: Cpu): void {
  bit_common(cpu, (cpu.L & 0x08) > 0);
}

export function bit_3_HLa(cpu: Cpu): void {
  bit_common(cpu, (cpu.memoryMap.read8(cpu.HL) & 0x08) > 0);
}

// BIT 4
export function bit_4_A(cpu: Cpu): void {
  bit_common(cpu, (cpu.A & 0x10) > 0);
}

export function bit_4_B(cpu: Cpu): void {
  bit_common(cpu, (cpu.B & 0x10) > 0);
}

export function bit_4_C(cpu: Cpu): void {
  bit_common(cpu, (cpu.C & 0x10) > 0);
}

export function bit_4_D(cpu: Cpu): void {
  bit_common(cpu, (cpu.D & 0x10) > 0);
}

export function bit_4_E(cpu: Cpu): void {
  bit_common(cpu, (cpu.E & 0x10) > 0);
}

export function bit_4_H(cpu: Cpu): void {
  bit_common(cpu, (cpu.H & 0x10) > 0);
}

export function bit_4_L(cpu: Cpu): void {
  bit_common(cpu, (cpu.L & 0x10) > 0);
}

export function bit_4_HLa(cpu: Cpu): void {
  bit_common(cpu, (cpu.memoryMap.read8(cpu.HL) & 0x10) > 0);
}

// BIT 5
export function bit_5_A(cpu: Cpu): void {
  bit_common(cpu, (cpu.A & 0x20) > 0);
}

export function bit_5_B(cpu: Cpu): void {
  bit_common(cpu, (cpu.B & 0x20) > 0);
}

export function bit_5_C(cpu: Cpu): void {
  bit_common(cpu, (cpu.C & 0x20) > 0);
}

export function bit_5_D(cpu: Cpu): void {
  bit_common(cpu, (cpu.D & 0x20) > 0);
}

export function bit_5_E(cpu: Cpu): void {
  bit_common(cpu, (cpu.E & 0x20) > 0);
}

export function bit_5_H(cpu: Cpu): void {
  bit_common(cpu, (cpu.H & 0x20) > 0);
}

export function bit_5_L(cpu: Cpu): void {
  bit_common(cpu, (cpu.L & 0x20) > 0);
}

export function bit_5_HLa(cpu: Cpu): void {
  bit_common(cpu, (cpu.memoryMap.read8(cpu.HL) & 0x20) > 0);
}

// BIT 6
export function bit_6_A(cpu: Cpu): void {
  bit_common(cpu, (cpu.A & 0x40) > 0);
}

export function bit_6_B(cpu: Cpu): void {
  bit_common(cpu, (cpu.B & 0x40) > 0);
}

export function bit_6_C(cpu: Cpu): void {
  bit_common(cpu, (cpu.C & 0x40) > 0);
}

export function bit_6_D(cpu: Cpu): void {
  bit_common(cpu, (cpu.D & 0x40) > 0);
}

export function bit_6_E(cpu: Cpu): void {
  bit_common(cpu, (cpu.E & 0x40) > 0);
}

export function bit_6_H(cpu: Cpu): void {
  bit_common(cpu, (cpu.H & 0x40) > 0);
}

export function bit_6_L(cpu: Cpu): void {
  bit_common(cpu, (cpu.L & 0x40) > 0);
}

export function bit_6_HLa(cpu: Cpu): void {
  bit_common(cpu, (cpu.memoryMap.read8(cpu.HL) & 0x40) > 0);
}

// BIT 7
export function bit_7_A(cpu: Cpu): void {
  bit_common(cpu, (cpu.A & 0x80) > 0);
}

export function bit_7_B(cpu: Cpu): void {
  bit_common(cpu, (cpu.B & 0x80) > 0);
}

export function bit_7_C(cpu: Cpu): void {
  bit_common(cpu, (cpu.C & 0x80) > 0);
}

export function bit_7_D(cpu: Cpu): void {
  bit_common(cpu, (cpu.D & 0x80) > 0);
}

export function bit_7_E(cpu: Cpu): void {
  bit_common(cpu, (cpu.E & 0x80) > 0);
}

export function bit_7_H(cpu: Cpu): void {
  bit_common(cpu, (cpu.H & 0x80) > 0);
}

export function bit_7_L(cpu: Cpu): void {
  bit_common(cpu, (cpu.L & 0x80) > 0);
}

export function bit_7_HLa(cpu: Cpu): void {
  bit_common(cpu, (cpu.memoryMap.read8(cpu.HL) & 0x80) > 0);
}

/**
 * Bit Reset Functions
 */
export function res_0_A(cpu: Cpu): void {
  cpu.A = cpu.A & 0xFE;
}

export function res_0_B(cpu: Cpu): void {
  cpu.B = cpu.B & 0xFE;
}

export function res_0_C(cpu: Cpu): void {
  cpu.C = cpu.C & 0xFE;
}

export function res_0_D(cpu: Cpu): void {
  cpu.D = cpu.D & 0xFE;
}

export function res_0_E(cpu: Cpu): void {
  cpu.E = cpu.E & 0xFE;
}

export function res_0_H(cpu: Cpu): void {
  cpu.H = cpu.H & 0xFE;
}

export function res_0_L(cpu: Cpu): void {
  cpu.L = cpu.L & 0xFE;
}

export function res_0_HLa(cpu: Cpu): void {
  const value = cpu.memoryMap.read8(cpu.HL);
  cpu.memoryMap.write8(cpu.HL, value & 0xFE);
}

export function res_1_A(cpu: Cpu): void {
  cpu.A = cpu.A & 0xFD;
}

export function res_1_B(cpu: Cpu): void {
  cpu.B = cpu.B & 0xFD;
}

export function res_1_C(cpu: Cpu): void {
  cpu.C = cpu.C & 0xFD;
}

export function res_1_D(cpu: Cpu): void {
  cpu.D = cpu.D & 0xFD;
}

export function res_1_E(cpu: Cpu): void {
  cpu.E = cpu.E & 0xFD;
}

export function res_1_H(cpu: Cpu): void {
  cpu.H = cpu.H & 0xFD;
}

export function res_1_L(cpu: Cpu): void {
  cpu.L = cpu.L & 0xFD;
}

export function res_1_HLa(cpu: Cpu): void {
  const value = cpu.memoryMap.read8(cpu.HL);
  cpu.memoryMap.write8(cpu.HL, value & 0xFD);
}

export function res_2_A(cpu: Cpu): void {
  cpu.A = cpu.A & 0xFB;
}

export function res_2_B(cpu: Cpu): void {
  cpu.B = cpu.B & 0xFB;
}

export function res_2_C(cpu: Cpu): void {
  cpu.C = cpu.C & 0xFB;
}

export function res_2_D(cpu: Cpu): void {
  cpu.D = cpu.D & 0xFB;
}

export function res_2_E(cpu: Cpu): void {
  cpu.E = cpu.E & 0xFB;
}

export function res_2_H(cpu: Cpu): void {
  cpu.H = cpu.H & 0xFB;
}

export function res_2_L(cpu: Cpu): void {
  cpu.L = cpu.L & 0xFB;
}

export function res_2_HLa(cpu: Cpu): void {
  const value = cpu.memoryMap.read8(cpu.HL);
  cpu.memoryMap.write8(cpu.HL, value & 0xFB);
}

export function res_3_A(cpu: Cpu): void {
  cpu.A = cpu.A & 0xF7;
}

export function res_3_B(cpu: Cpu): void {
  cpu.B = cpu.B & 0xF7;
}

export function res_3_C(cpu: Cpu): void {
  cpu.C = cpu.C & 0xF7;
}

export function res_3_D(cpu: Cpu): void {
  cpu.D = cpu.D & 0xF7;
}

export function res_3_E(cpu: Cpu): void {
  cpu.E = cpu.E & 0xF7;
}

export function res_3_H(cpu: Cpu): void {
  cpu.H = cpu.H & 0xF7;
}

export function res_3_L(cpu: Cpu): void {
  cpu.L = cpu.L & 0xF7;
}

export function res_3_HLa(cpu: Cpu): void {
  const value = cpu.memoryMap.read8(cpu.HL);
  cpu.memoryMap.write8(cpu.HL, value & 0xF7);
}

export function res_4_A(cpu: Cpu): void {
  cpu.A = cpu.A & 0xEF;
}

export function res_4_B(cpu: Cpu): void {
  cpu.B = cpu.B & 0xEF;
}

export function res_4_C(cpu: Cpu): void {
  cpu.C = cpu.C & 0xEF;
}

export function res_4_D(cpu: Cpu): void {
  cpu.D = cpu.D & 0xEF;
}

export function res_4_E(cpu: Cpu): void {
  cpu.E = cpu.E & 0xEF;
}

export function res_4_H(cpu: Cpu): void {
  cpu.H = cpu.H & 0xEF;
}

export function res_4_L(cpu: Cpu): void {
  cpu.L = cpu.L & 0xEF;
}

export function res_4_HLa(cpu: Cpu): void {
  const value = cpu.memoryMap.read8(cpu.HL);
  cpu.memoryMap.write8(cpu.HL, value & 0xEF);
}

export function res_5_A(cpu: Cpu): void {
  cpu.A = cpu.A & 0xDF;
}

export function res_5_B(cpu: Cpu): void {
  cpu.B = cpu.B & 0xDF;
}

export function res_5_C(cpu: Cpu): void {
  cpu.C = cpu.C & 0xDF;
}

export function res_5_D(cpu: Cpu): void {
  cpu.D = cpu.D & 0xDF;
}

export function res_5_E(cpu: Cpu): void {
  cpu.E = cpu.E & 0xDF;
}

export function res_5_H(cpu: Cpu): void {
  cpu.H = cpu.H & 0xDF;
}

export function res_5_L(cpu: Cpu): void {
  cpu.L = cpu.L & 0xDF;
}

export function res_5_HLa(cpu: Cpu): void {
  const value = cpu.memoryMap.read8(cpu.HL);
  cpu.memoryMap.write8(cpu.HL, value & 0xDF);
}

export function res_6_A(cpu: Cpu): void {
  cpu.A = cpu.A & 0xBF;
}

export function res_6_B(cpu: Cpu): void {
  cpu.B = cpu.B & 0xBF;
}

export function res_6_C(cpu: Cpu): void {
  cpu.C = cpu.C & 0xBF;
}

export function res_6_D(cpu: Cpu): void {
  cpu.D = cpu.D & 0xBF;
}

export function res_6_E(cpu: Cpu): void {
  cpu.E = cpu.E & 0xBF;
}

export function res_6_H(cpu: Cpu): void {
  cpu.H = cpu.H & 0xBF;
}

export function res_6_L(cpu: Cpu): void {
  cpu.L = cpu.L & 0xBF;
}

export function res_6_HLa(cpu: Cpu): void {
  const value = cpu.memoryMap.read8(cpu.HL);
  cpu.memoryMap.write8(cpu.HL, value & 0xBF);
}

export function res_7_A(cpu: Cpu): void {
  cpu.A = cpu.A & 0x7F;
}

export function res_7_B(cpu: Cpu): void {
  cpu.B = cpu.B & 0x7F;
}

export function res_7_C(cpu: Cpu): void {
  cpu.C = cpu.C & 0x7F;
}

export function res_7_D(cpu: Cpu): void {
  cpu.D = cpu.D & 0x7F;
}

export function res_7_E(cpu: Cpu): void {
  cpu.E = cpu.E & 0x7F;
}

export function res_7_H(cpu: Cpu): void {
  cpu.H = cpu.H & 0x7F;
}

export function res_7_L(cpu: Cpu): void {
  cpu.L = cpu.L & 0x7F;
}

export function res_7_HLa(cpu: Cpu): void {
  const value = cpu.memoryMap.read8(cpu.HL);
  cpu.memoryMap.write8(cpu.HL, value & 0x7F);
}

export function ld_Ca_A(cpu: Cpu): void {
  cpu.memoryMap.write8(0xFF00 + cpu.C, cpu.A);
}

export function ldh_a8_A(cpu: Cpu): void {
  const memOffset = cpu.read8();
  cpu.memoryMap.write8(0xFF00 + memOffset, cpu.A);
  cpu.PC += 1;
}

export function ldh_A_a8(cpu: Cpu): void {
  const memOffset = cpu.read8();
  cpu.A = cpu.memoryMap.read8(0xFF00 + memOffset);
  cpu.PC += 1;
}

export function di(cpu: Cpu): void {
  cpu.interruptsEnabled = false;
}

export function ei(cpu: Cpu): void {
  cpu.interruptsEnabled = true;
}

export function scf(cpu: Cpu): void {
  cpu.flagN = false;
  cpu.flagH = false;
  cpu.flagC = true;
}

export function ccf(cpu: Cpu): void {
  cpu.flagN = false;
  cpu.flagH = false;
  cpu.flagC = !cpu.flagC;
}

export function cpl(cpu: Cpu): void {
  cpu.A = cpu.A ^ 0xFF;
  cpu.flagN = true;
  cpu.flagH = true;
}

/**
 * Compare functions
 */
function cp_common(cpu: Cpu, diff: number) {
  cpu.flagZ = diff === 0;
  cpu.flagN = true;
  cpu.flagH = false; // TODO: if no borrow from bit 4?
  cpu.flagC = diff > 0;
}

export function cp_A(cpu: Cpu): void {
  cp_common(cpu, cpu.A - cpu.A);
}

export function cp_B(cpu: Cpu): void {
  cp_common(cpu, cpu.A - cpu.B);
}

export function cp_C(cpu: Cpu): void {
  cp_common(cpu, cpu.A - cpu.C);
}

export function cp_D(cpu: Cpu): void {
  cp_common(cpu, cpu.A - cpu.D);
}

export function cp_E(cpu: Cpu): void {
  cp_common(cpu, cpu.A - cpu.E);
}

export function cp_H(cpu: Cpu): void {
  cp_common(cpu, cpu.A - cpu.H);
}

export function cp_L(cpu: Cpu): void {
  cp_common(cpu, cpu.A - cpu.L);
}

export function cp_HLa(cpu: Cpu): void {
  cp_common(cpu, cpu.A - cpu.memoryMap.read8(cpu.HL));
}

export function cp_d8(cpu: Cpu): void {
  cp_common(cpu, cpu.A - cpu.read8());

  cpu.PC += 1;
}

/**
 * Shift Left to Carry functions
 */
function sla_common(cpu: Cpu, value: number): number {
  const shiftedLeft = value << 1;
  cpu.flagC = (shiftedLeft & 0x100) === 0x100;
  cpu.flagZ = (shiftedLeft & 0xFF) === 0;
  cpu.flagN = false;
  cpu.flagH = false;
  return shiftedLeft & 0xFF;
}

export function sla_A(cpu: Cpu): void {
  cpu.A = sla_common(cpu, cpu.A);
}

export function sla_B(cpu: Cpu): void {
  cpu.B = sla_common(cpu, cpu.B);
}

export function sla_C(cpu: Cpu): void {
  cpu.C = sla_common(cpu, cpu.C);
}

export function sla_D(cpu: Cpu): void {
  cpu.D = sla_common(cpu, cpu.D);
}

export function sla_E(cpu: Cpu): void {
  cpu.E = sla_common(cpu, cpu.E);
}

export function sla_H(cpu: Cpu): void {
  cpu.H = sla_common(cpu, cpu.H);
}

export function sla_L(cpu: Cpu): void {
  cpu.L = sla_common(cpu, cpu.L);
}

export function sla_HLa(cpu: Cpu): void {
  const result = sla_common(cpu, cpu.memoryMap.read8(cpu.HL));
  cpu.memoryMap.write8(cpu.HL, result);
}

/**
 * SRA Shift right into carry - leave 7th bit
 */
function sra_common(cpu: Cpu, value: number): number {
  const shiftedRight = (value >> 1) & (value & 0x80);

  cpu.flagC = (value & 0x01) === 0x01;
  cpu.flagZ = shiftedRight === 0;
  cpu.flagN = false;
  cpu.flagH = false;

  return shiftedRight;
}

export function sra_A(cpu: Cpu): void {
  cpu.A = sra_common(cpu, cpu.A);
}

export function sra_B(cpu: Cpu): void {
  cpu.B = sra_common(cpu, cpu.B);
}

export function sra_C(cpu: Cpu): void {
  cpu.C = sra_common(cpu, cpu.C);
}

export function sra_D(cpu: Cpu): void {
  cpu.D = sra_common(cpu, cpu.D);
}

export function sra_E(cpu: Cpu): void {
  cpu.E = sra_common(cpu, cpu.E);
}

export function sra_H(cpu: Cpu): void {
  cpu.H = sra_common(cpu, cpu.H);
}

export function sra_L(cpu: Cpu): void {
  cpu.L = sra_common(cpu, cpu.L);
}

export function sra_HLa(cpu: Cpu): void {
  const result = sra_common(cpu, cpu.memoryMap.read8(cpu.HL));
  cpu.memoryMap.write8(cpu.HL, result);
}


/**
 * SRL Shift right into carry
 */
function srl_common(cpu: Cpu, value: number): number {
  const shiftedRight = value >> 1;

  cpu.flagC = (value & 0x01) === 0x01;
  cpu.flagZ = shiftedRight === 0;
  cpu.flagN = false;
  cpu.flagH = false;

  return shiftedRight;
}

export function srl_A(cpu: Cpu): void {
  cpu.A = srl_common(cpu, cpu.A);
}

export function srl_B(cpu: Cpu): void {
  cpu.B = srl_common(cpu, cpu.B);
}

export function srl_C(cpu: Cpu): void {
  cpu.C = srl_common(cpu, cpu.C);
}

export function srl_D(cpu: Cpu): void {
  cpu.D = srl_common(cpu, cpu.D);
}

export function srl_E(cpu: Cpu): void {
  cpu.E = srl_common(cpu, cpu.E);
}

export function srl_H(cpu: Cpu): void {
  cpu.H = srl_common(cpu, cpu.H);
}

export function srl_L(cpu: Cpu): void {
  cpu.L = srl_common(cpu, cpu.L);
}

export function srl_HLa(cpu: Cpu): void {
  const result = srl_common(cpu, cpu.memoryMap.read8(cpu.HL));
  cpu.memoryMap.write8(cpu.HL, result);
}
