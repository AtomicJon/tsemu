import MemoryMap from '../memory/MemoryMap';
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
import { mainOpCodes, prefixedOpCodes } from './opCodeMaps';
import { Operand, OperandModifier, OperandType } from './types';

type OpHistory = {
  step: number;
  PC: string;
  codeString: string;
  mnemonic: string;
  nextBytes: number[];
  nextBytesSigned: number[];
};

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
  public get A(): number {
    return this.getRegister(REG_A);
  }
  public get F(): number {
    return this.getRegister(REG_F);
  }
  public get B(): number {
    return this.getRegister(REG_B);
  }
  public get C(): number {
    return this.getRegister(REG_C);
  }
  public get D(): number {
    return this.getRegister(REG_D);
  }
  public get E(): number {
    return this.getRegister(REG_E);
  }
  public get H(): number {
    return this.getRegister(REG_H);
  }
  public get L(): number {
    return this.getRegister(REG_L);
  }
  // 16 bit
  public get AF(): number {
    return this.getRegister16(REG_AF);
  }
  public get BC(): number {
    return this.getRegister16(REG_BC);
  }
  public get DE(): number {
    return this.getRegister16(REG_DE);
  }
  public get HL(): number {
    return this.getRegister16(REG_HL);
  }
  public get SP(): number {
    return this.getRegister16(REG_SP);
  }
  public get PC(): number {
    return this.getRegister16(REG_PC);
  }
  // Flag boolean get helpers
  public get flagZ(): boolean {
    return (this.F & BIT_FLAG_Z) === BIT_FLAG_Z;
  }
  public get flagN(): boolean {
    return (this.F & BIT_FLAG_N) === BIT_FLAG_N;
  }
  public get flagH(): boolean {
    return (this.F & BIT_FLAG_H) === BIT_FLAG_H;
  }
  public get flagC(): boolean {
    return (this.F & BIT_FLAG_C) === BIT_FLAG_C;
  }

  // Setters to access registers array buffer
  // 8 bit
  public set A(value: number) {
    this.setRegister(REG_A, value);
  }
  public set F(value: number) {
    this.setRegister(REG_F, value & 0xf0);
  }
  public set B(value: number) {
    this.setRegister(REG_B, value);
  }
  public set C(value: number) {
    this.setRegister(REG_C, value);
  }
  public set D(value: number) {
    this.setRegister(REG_D, value);
  }
  public set E(value: number) {
    this.setRegister(REG_E, value);
  }
  public set H(value: number) {
    this.setRegister(REG_H, value);
  }
  public set L(value: number) {
    this.setRegister(REG_L, value);
  }
  // 16 bit
  public set AF(value: number) {
    this.setRegister16(REG_AF, value & 0xfff0);
  }
  public set BC(value: number) {
    this.setRegister16(REG_BC, value);
  }
  public set DE(value: number) {
    this.setRegister16(REG_DE, value);
  }
  public set HL(value: number) {
    this.setRegister16(REG_HL, value);
  }
  public set SP(value: number) {
    this.setRegister16(REG_SP, value);
  }
  public set PC(value: number) {
    this.setRegister16(REG_PC, value);
  }
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
   * Read the value of an operand from its specified location
   * @param operand The operand details
   */
  public readOperand(operand: Operand): number {
    let value: number;
    switch (operand.type) {
      case OperandType.Immediate8: {
        value = this.read8();
        break;
      }
      case OperandType.Immediate8Signed: {
        value = this.read8Signed();
        break;
      }
      case OperandType.Immediate16: {
        value = this.read16();
        break;
      }
      case OperandType.Register8: {
        value = this.getRegister(operand.target!);
        break;
      }
      case OperandType.Register16: {
        value = this.getRegister16(operand.target!);
        // Special cases for HL that modify it on access
        if (operand.modifier === OperandModifier.Increment) {
          this.HL += 1;
        } else if (operand.modifier === OperandModifier.Decrement) {
          this.HL -= 1;
        }
        break;
      }
      case OperandType.Value: {
        // Values are stored in the operand (e.g. BIT 7, A)
        return operand.target!;
      }
    }

    if (
      operand.isAddress &&
      (operand.type === OperandType.Immediate8 ||
        operand.type === OperandType.Register8)
    ) {
      return this.read8(0xff00 | value);
    } else if (operand.isAddress) {
      return this.read8(value);
    }

    return value;
  }

  /**
   * Write a value to the location specified by an operand
   * @param operand The operand details
   * @param value The value to set
   */
  public writeToOperand(operand: Operand, value: number): void {
    if (operand.isAddress) {
      // Get the address stored at the operand target to write at
      let targetAddress: number;
      switch (operand.type) {
        case OperandType.Immediate8: {
          targetAddress = this.read8() | 0xff00;
          break;
        }
        case OperandType.Immediate8Signed: {
          throw new Error('Immediate8Signed cannot be an address');
        }
        case OperandType.Immediate16: {
          targetAddress = this.read16();
          break;
        }
        case OperandType.Register8: {
          targetAddress = this.getRegister(operand.target!) | 0xff00;
          break;
        }
        case OperandType.Register16: {
          targetAddress = this.getRegister16(operand.target!);
          break;
        }
        case OperandType.Value: {
          throw Error('Invalid operand type - cannot write direct value');
        }
      }
      this.write8(targetAddress, value);
    } else {
      // If target isn't an address, only registers can be targeted
      switch (operand.type) {
        case OperandType.Register8: {
          this.setRegister(operand.target!, value);
          break;
        }
        case OperandType.Register16: {
          this.setRegister16(operand.target!, value);
          break;
        }
        default: {
          throw new Error(
            `Invalid direct target operand for write: ${operand.type}`,
          );
        }
      }
    }

    // Special cases for HL that modify it on access
    if (operand.modifier === OperandModifier.Increment) {
      this.HL += 1;
    } else if (operand.modifier === OperandModifier.Decrement) {
      this.HL -= 1;
    }
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
      this.registersView.setUint8(register, value & 0xf0);
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
      this.registersView.setUint16(register, value & 0xfff0, false);
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
    this.SP = 0xfffe;
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
    const isCbCode = opCode === 0xcb;
    const opCodeTable = isCbCode ? prefixedOpCodes : mainOpCodes;
    // Prefixed op code, read actual op code
    if (isCbCode) {
      opCode = this.read8();
    }

    if (!opCodeTable[opCode]) {
      console.log(
        'Unknown opcode: ',
        `${isCbCode ? '0xCB ' : ''}${opCode.toString(16)}`,
      );
      return false;
    }
    const operation = opCodeTable[opCode];

    // + DEBUG ---
    this.opHistory.push({
      step: this.step,
      PC: `${(this.PC - 1)} [${(this.PC - 1).toString(16)}]`,
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

    const resultFlags = operation.action(this, operation.operands);
    this.flagZ = resultFlags.Z ?? this.flagZ;
    this.flagN = resultFlags.N ?? this.flagN;
    this.flagH = resultFlags.H ?? this.flagH;
    this.flagC = resultFlags.C ?? this.flagC;

    this.step += 1;

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
      this.PC += 2;
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
    // TODO: ROM Bank Select
    if (address === 0x2000) {
      return true;
    }

    // Serial port
    if (address === 0xff01) {
      this.serialData.push(value);
    }

    if (address === 0xff04) {
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
      const divider = this.memoryMap.read8(0xff04) + 1;
      this.memoryMap.write8(0xff04, divider & 0xff);
    }
  }

  /**
   * Update the timer each cycle
   */
  private updateTimer(): void {
    const timerControl = this.memoryMap.read8(0xff07);
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
        const timer = this.memoryMap.read8(0xff05) + 1;

        // Overflow, write modulo to timer and trigger IRQ
        if (timer > 0xff) {
          const timerModulo = this.memoryMap.read8(0xff06);
          this.memoryMap.write8(0xff05, timerModulo);
          // Trigger IRQ
          const irq = this.memoryMap.read8(0xff0f) | 0x04;
          this.memoryMap.write8(0xff0f, irq);
        } else {
          this.memoryMap.write8(0xff05, timer & 0xff);
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
      const irq = this.memoryMap.read8(0xff0f); // Interrupt Request Flag
      const irqe = this.memoryMap.read8(0xffff); // Interrupt Request Enable

      // Determine the vector based on which bit is set
      // Prioritized from bit 0 - 4
      let interruptVector = 0;
      let bitMask = 0x1f; // Default to no clearing
      if ((irq & irqe & 0x01) === 0x01) {
        // VSync
        bitMask = 0x1e;
        interruptVector = 0x0040;
      } else if ((irq & irqe & 0x02) === 0x02) {
        // LCD STAT
        bitMask = 0x1d;
        interruptVector = 0x0048;
      } else if ((irq & irqe & 0x04) === 0x04) {
        // Timer
        bitMask = 0x1b;
        interruptVector = 0x0050;
      } else if ((irq & irqe & 0x08) === 0x08) {
        // Serial
        bitMask = 0x17;
        interruptVector = 0x0058;
      } else if ((irq & irqe & 0x10) === 0x10) {
        // Joypad
        bitMask = 0x0f;
        interruptVector = 0x0060;
      }

      // No interrupts matched
      if (interruptVector === 0) {
        return false;
      }

      // Disable any further interrupts until re-enabled
      this.interruptsEnabled = false;

      // Clear the flag for the interrupt being processed
      this.memoryMap.write8(0xff0f, irq & bitMask);
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
