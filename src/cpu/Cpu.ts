import MemoryMap from '../memory/MemoryMap';
import cbOpCodes from './cbOpCodes';
import {
  DIVIDER_FREQUENCY,

  REG_A,
  REG_F,
  REG_B,
  REG_C,
  REG_D,
  REG_E,
  REG_H,
  REG_L,

  REG_AF,
  REG_BC,
  REG_DE,
  REG_HL,
  REG_SP,
  REG_PC,

  BIT_FLAG_Z,
  BIT_FLAG_N,
  BIT_FLAG_H,
  BIT_FLAG_C,
  MASK_FLAG_Z,
  MASK_FLAG_N,
  MASK_FLAG_H,
  MASK_FLAG_C,
} from './constants';
import opCodes from './opCodes';

type OpHistory = {
  step: number;
  PC: number;
  codeString: string;
  mnemonic: string;
  nextBytes: number[];
  nextBytesSigned: number[];
}

const MAX_HISTORY = 1000;

/**
 * Class emulating the CPU
 */
export default class Cpu {
  private memoryMap: MemoryMap;

  private step = 0;
  private cycleOffset = 0;
  private opHistory: OpHistory[] = [];

  private registersBuffer: ArrayBuffer = new ArrayBuffer(12);
  private registersView: DataView = new DataView(this.registersBuffer);

  private dividerTick: number = 0;
  private timerTick: number = 0;

  // Interrupts
  public interruptsEnabled: boolean = false;

  public serialData: number[] = [];

  // Getters to access registers array buffer
  // 8 bit
  public get A(): number { return this.getRegister(REG_A); }
  public get F(): number { return this.getRegister(REG_F); }
  public get B(): number { return this.getRegister(REG_B); }
  public get C(): number { return this.getRegister(REG_C); }
  public get D(): number { return this.getRegister(REG_D); }
  public get E(): number { return this.getRegister(REG_E); }
  public get H(): number { return this.getRegister(REG_H); }
  public get L(): number { return this.getRegister(REG_L); }
  // 16 bit
  public get AF(): number { return this.getRegister16(REG_AF); }
  public get BC(): number { return this.getRegister16(REG_BC); }
  public get DE(): number { return this.getRegister16(REG_DE); }
  public get HL(): number { return this.getRegister16(REG_HL); }
  public get SP(): number { return this.getRegister16(REG_SP); }
  public get PC(): number { return this.getRegister16(REG_PC); }
  // Flag boolean get helpers
  public get flagZ(): boolean { return (this.F & BIT_FLAG_Z) === BIT_FLAG_Z; }
  public get flagN(): boolean { return (this.F & BIT_FLAG_N) === BIT_FLAG_N; }
  public get flagH(): boolean { return (this.F & BIT_FLAG_H) === BIT_FLAG_H; }
  public get flagC(): boolean { return (this.F & BIT_FLAG_C) === BIT_FLAG_C; }

  // Setters to access registers array buffer
  // 8 bit
  public set A(value: number) { this.setRegister(REG_A, value); }
  public set F(value: number) { this.setRegister(REG_F, value & 0xF0); }
  public set B(value: number) { this.setRegister(REG_B, value); }
  public set C(value: number) { this.setRegister(REG_C, value); }
  public set D(value: number) { this.setRegister(REG_D, value); }
  public set E(value: number) { this.setRegister(REG_E, value); }
  public set H(value: number) { this.setRegister(REG_H, value); }
  public set L(value: number) { this.setRegister(REG_L, value); }
  // 16 bit
  public set AF(value: number) { this.setRegister16(REG_AF, value & 0xFFF0) }
  public set BC(value: number) { this.setRegister16(REG_BC, value) }
  public set DE(value: number) { this.setRegister16(REG_DE, value) }
  public set HL(value: number) { this.setRegister16(REG_HL, value) }
  public set SP(value: number) { this.setRegister16(REG_SP, value) }
  public set PC(value: number) { this.setRegister16(REG_PC, value) }
  // Flag boolean set helpers
  public set flagZ(value: boolean) {
    if (value) {
      this.F = this.F | BIT_FLAG_Z;
    } else {
      this.F = this.F & MASK_FLAG_Z;
    }
  }
  public set flagN(value: boolean) {
    if (value) {
      this.F = this.F | BIT_FLAG_N;
    } else {
      this.F = this.F & MASK_FLAG_N;
    }
  }
  public set flagH(value: boolean) {
    if (value) {
      this.F = this.F | BIT_FLAG_H;
    } else {
      this.F = this.F & MASK_FLAG_H;
    }
  }
  public set flagC(value: boolean) {
    if (value) {
      this.F = this.F | BIT_FLAG_C;
    } else {
      this.F = this.F & MASK_FLAG_C;
    }
  }

  constructor(memoryMap: MemoryMap) {
    this.memoryMap = memoryMap;
  }

  /**
   * Get the value of a register
   * @param register The register offset
   */
  public getRegister(register: number): number {
    return this.registersView.getUint8(register);
  }

  /**
   * Get the value of a 16bit register (2 8bit combined)
   * @param register The register offset
   */
  public getRegister16(register: number): number {
    return this.registersView.getUint16(register, false);
  }

  /**
   * Set the value of a register
   * @param register The register offset
   * @param value The value to set
   */
  public setRegister(register: number, value: number): void {
    // Need to mask the lower 4 bits of register F
    if (register === REG_F) {
      this.registersView.setUint8(register, value & 0xF0);
    } else {
      this.registersView.setUint8(register, value);
    }
  }

  /**
   * Set the value of a 16bit register (2 8bit combined)
   * @param register The register offset
   * @param value The value to set
   */
  public setRegister16(register: number, value: number): void {
    // Need to mask the lower 4 bits of register F
    if (register === REG_AF) {
      this.registersView.setUint16(register, value & 0xFFF0, false);
    } else {
      this.registersView.setUint16(register, value, false);
    }
  }

  /**
   * Reset the CPU
   */
  public reset() {
    // Clear registers
    for (let i = 0; i < this.registersView.byteLength; i++) {
      this.registersView.setUint8(i, 0);
    }

    // Point the program counter at the entry point and stack pointer to the top of ram
    this.PC = 0x100;
    this.SP = 0xFFFE;
  }

  /**
   * Run one clock cycle of the CPU
   */
  public tick(): boolean {
    this.updateDivider();
    this.updateTimer();

    // Wait for main clock to catch up
    this.cycleOffset -= 1;
    if (this.cycleOffset > 0) {
      return true;
    }

    if (this.handleInterrupt()) {
      return true;
    }

    let opCode = this.read8();
    const isCbCode = opCode === 0xCB;
    const opCodeTable = isCbCode ? cbOpCodes : opCodes;
    // Prefixed op code, read actual op code
    if (isCbCode) {
      opCode = this.read8();
    }

    if (!opCodeTable[opCode]) {
      console.log('Unknown opcode: ', `${isCbCode ? '0xCB ' : ''}${opCode.toString(16)}`);
      return false;
    }
    const operation = opCodeTable[opCode];

    // + DEBUG ---
    this.opHistory.push({
      step: this.step,
      PC: this.PC - 1,
      codeString: opCode.toString(16),
      mnemonic: operation.mnemonic,
      nextBytes: [
        this.memoryMap.read8(this.PC),
        this.memoryMap.read8(this.PC + 1),
      ],
      nextBytesSigned: [
        this.memoryMap.read8Signed(this.PC),
        this.memoryMap.read8Signed(this.PC + 1),
      ],
    });

    if (this.opHistory.length > MAX_HISTORY) {
      this.opHistory.shift();
    }
    // - DEBUG ---

    operation.action(this);
    this.step++;

    // Set how many cycles to wait before next operation
    this.cycleOffset = operation.cycles - 1;
    return true;
  }

  /**
   * Read an 8bit int from memory at the given offset
   * Update the PC for direct reads (no address specified)
   * @param address The address offset (PC if not set)
   */
  public read8(address: number | null = null): number {
    const targetAddress = address ?? this.PC;

    // TODO: Masked/blocked reads, etc.
    const value = this.memoryMap.read8(targetAddress);

    // Advance the program counter if read is immediate
    if (address === null) {
      this.PC += 1;
    }
    return value;
  }

  /**
   * Read an 8bit signed int from memory at the given offset
   * Update the PC for direct reads (no address specified)
   * @param address The address offset (PC if not set)
   */
  public read8Signed(address: number | null = null): number {
    const targetAddress = address ?? this.PC;

    // TODO: Masked/blocked reads, etc.
    const value = this.memoryMap.read8Signed(targetAddress);

    // Advance the program counter if read is immediate
    if (address === null) {
      this.PC += 1;
    }
    return value;
  }

  /**
   * Read an 16bit int from memory at the given offset
   * Update the PC for direct reads (no address specified)
   * @param address The address offset (PC if not set)
   */
  public read16(address: number | null = null): number {
    const targetAddress = address ?? this.PC;

    // TODO: Masked/blocked reads, etc.
    const value = this.memoryMap.read16(targetAddress);

    // Advance the program counter if read is immediate
    if (address === null) {
      this.PC +=2;
    }
    return value;
  }

  /**
   * Write an 8bit int to memory at the given offset
   * @param address The address to write to
   * @param value The 8bit value to write
   */
  public write8(address: number, value: number): void {
    if (this.writeMasking(address, value)) {
      return;
    }

    this.memoryMap.write8(address, value);
  }

  /**
   * Write a 16bit int to memory at the given offset
   * @param address The address to write to
   * @param value The 16bit value to write
   */
  public write16(address: number, value: number): void {
    if (this.writeMasking(address, value)) {
      return;
    }

    this.memoryMap.write16(address, value);
  }

  /**
   * Helper to intercept writing to special addresses
   * @param address The address to check before writing
   * @param value The value that is being written
   * @returns Whether the write was intercepted
   */
  private writeMasking(address: number, value: number): boolean {
    // Serial port
    if (address === 0xFF01) {
      this.serialData.push(value);
    }

    if (address === 0xFF04) {
      // Divider register - reset to 0 when any value is written to it
      this.memoryMap.write8(address, 0);
      return true;
    }

    return false;
  }

  /**
   * Update the divider each cycle
   */
  private updateDivider(): void {
    this.dividerTick += 1;
    if (this.dividerTick === DIVIDER_FREQUENCY) {
      this.dividerTick = 0;
      const divider = this.memoryMap.read8(0xFF04) + 1;
      this.memoryMap.write8(0xFF04, divider & 0xFF);
    }
  }

  /**
   * Update the timer each cycle
   */
  private updateTimer(): void {
    const timerControl = this.memoryMap.read8(0xFF07);
    const timerEnabled = (timerControl & 0x04) === 0x04;
    if (timerEnabled) {
      const timerFreqFlag = timerControl & 0x02;
      let timerFreq = 4096;
      if (timerFreqFlag === 0x01) {
        timerFreq = 262144;
      } else if (timerFreqFlag === 0x02) {
        timerFreq = 65536;
      } else if (timerFreqFlag === 0x03) {
        timerFreq = 16384;
      }
      this.timerTick += 1;

      if (this.timerTick === timerFreq) {
        this.timerTick = 0;
        const timer = this.memoryMap.read8(0xFF05) + 1;

        // Overflow, write modulo to timer and trigger IRQ
        if (timer > 0xFF) {
          const timerModulo = this.memoryMap.read8(0xFF06);
          this.memoryMap.write8(0xFF05, timerModulo);
          // Trigger IRQ
          const irq = this.memoryMap.read8(0xFF0F) | 0x04;
          this.memoryMap.write8(0xFF0F, irq);
        } else {
          this.memoryMap.write8(0xFF05, timer & 0xFF);
        }
      }
    }
  }

  /**
   * Check for and handle interrupts
   * @returns Whether an interrupt was handled
   */
  private handleInterrupt(): boolean {
    if (this.interruptsEnabled) {
      const irq = this.memoryMap.read8(0xFF0F); // Interrupt Request Flag
      const irqe = this.memoryMap.read8(0xFFFF); // Interrupt Request Enable

      // Determine the vector based on which bit is set
      // Prioritized from bit 0 - 4
      let interruptVector = 0;
      let bitMask = 0x1F; // Default to no clearing
      if ((irq & irqe & 0x01) === 0x01) { // VSync
        bitMask = 0x1E;
        interruptVector = 0x0040;
      } else if ((irq & irqe & 0x02) === 0x02) { // LCD STAT
        bitMask = 0x1D;
        interruptVector = 0x0048;
      } else if ((irq & irqe & 0x04) === 0x04) { // Timer
        bitMask = 0x1B;
        interruptVector = 0x0050;
      } else if ((irq & irqe & 0x08) === 0x08) { // Serial
        bitMask = 0x17;
        interruptVector = 0x0058;
      } else if ((irq & irqe & 0x10) === 0x10) { // Joypad
        bitMask = 0x0F;
        interruptVector = 0x0060;
      }

      // No interrupts matched
      if (interruptVector === 0) {
        return false;
      }

      // Disable any further interrupts until re-enabled
      this.interruptsEnabled = false;

      // Clear the flag for the interrupt being processed
      this.memoryMap.write8(0xFF0F, irq & bitMask);
      // Push the current PC onto the stack
      this.SP -= 2;
      this.memoryMap.write16(this.SP, this.PC);

      // Jump to the Interrupt Vector
      this.PC = interruptVector;
      this.cycleOffset = 5;
      return true;
    }

    return false;
  }
}
