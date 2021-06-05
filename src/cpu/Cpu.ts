import MemoryMap from '../memory/MemoryMap';
import cbOpCodes from './cbOpCodes';
import opCodes from './opCodes';

type OpHistory = {
  step: number;
  PC: number;
  codeString: string;
  mnemonic: string;
  nextBytes: number[];
  nextBytesSigned: number[];
}

export default class Cpu {
  private memoryMap: MemoryMap;

  private step = 0;
  private cycleOffset = 0;
  private opHistory: OpHistory[] = [];

  private registersBuffer: ArrayBuffer = new ArrayBuffer(12);
  private registers: Uint8Array = new Uint8Array(this.registersBuffer);
  private registers16: Uint16Array = new Uint16Array(this.registersBuffer);

  // Interrupts
  public interruptsEnabled: boolean = false;

  // Getters to access registers array buffer
  // 8 bit
  public get A(): number { return this.registers[1]; }
  public get F(): number { return this.registers[0]; }
  public get B(): number { return this.registers[3]; }
  public get C(): number { return this.registers[2]; }
  public get D(): number { return this.registers[5]; }
  public get E(): number { return this.registers[4]; }
  public get H(): number { return this.registers[7]; }
  public get L(): number { return this.registers[6]; }
  // 16 bit
  public get AF(): number { return this.registers16[0]; }
  public get BC(): number { return this.registers16[1]; }
  public get DE(): number { return this.registers16[2]; }
  public get HL(): number { return this.registers16[3]; }
  public get SP(): number { return this.registers16[4]; }
  public get PC(): number { return this.registers16[5]; }
  // Flag boolean get helpers
  public get flagZ(): boolean { return (this.F & 0x80) === 0x80; }
  public get flagN(): boolean { return (this.F & 0x40) === 0x40; }
  public get flagH(): boolean { return (this.F & 0x20) === 0x20; }
  public get flagC(): boolean { return (this.F & 0x10) === 0x10; }

  // Setters to access registers array buffer
  // 8 bit
  public set A(value: number) { this.registers[1] = value; }
  public set F(value: number) { this.registers[0] = value & 0xF0; }
  public set B(value: number) { this.registers[3] = value; }
  public set C(value: number) { this.registers[2] = value; }
  public set D(value: number) { this.registers[5] = value; }
  public set E(value: number) { this.registers[4] = value; }
  public set H(value: number) { this.registers[7] = value; }
  public set L(value: number) { this.registers[6] = value; }
  // 16 bit
  public set AF(value: number) { this.registers16[0] = value; }
  public set BC(value: number) { this.registers16[1] = value; }
  public set DE(value: number) { this.registers16[2] = value; }
  public set HL(value: number) { this.registers16[3] = value; }
  public set SP(value: number) { this.registers16[4] = value; }
  public set PC(value: number) { this.registers16[5] = value; }
  // Flag boolean set helpers
  public set flagZ(value: boolean) {
    if (value) {
      this.F = this.F | 0x80;
    } else {
      this.F = this.F & 0x7F;
    }
  }
  public set flagN(value: boolean) {
    if (value) {
      this.F = this.F | 0x40;
    } else {
      this.F = this.F & 0xBF;
    }
  }
  public set flagH(value: boolean) {
    if (value) {
      this.F = this.F | 0x20;
    } else {
      this.F = this.F & 0xDF;
    }
  }
  public set flagC(value: boolean) {
    if (value) {
      this.F = this.F | 0x10;
    } else {
      this.F = this.F & 0xEF;
    }
  }

  constructor(memoryMap: MemoryMap) {
    this.memoryMap = memoryMap;
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

  public tick(): boolean {
    // Wait for main clock to catch up
    this.cycleOffset -= 1;
    if (this.cycleOffset > 0) {
      return true;
    }

    // TODO: Proper IRQ handling
    const irq = this.memoryMap.read8(0xFF0F); // Interrupt Request Flag
    const irqe = this.memoryMap.read8(0xFFFF); // Interrupt Request Enable
    if (this.interruptsEnabled && irq & irqe & 0x01) {
      // Disable any further interrupts until re-enabled
      this.interruptsEnabled = false;

      // Determine the vector based on which bit is set
      // Prioritized from bit 0 - 4
      let interruptVector = 0;
      let bitMask = 0x1F; // Default to no clearing
      if (irq && irqe && 0x01) { // VSync
        bitMask = 0x1E;
        interruptVector = 0x0040;
      } else if (irq && irqe && 0x02) { // LCD STAT
        bitMask = 0x1D;
        interruptVector = 0x0048;
      } else if (irq && irqe && 0x04) { // Timer
        bitMask = 0x1B;
        interruptVector = 0x0050;
      } else if (irq && irqe && 0x08) { // Serial
        bitMask = 0x17;
        interruptVector = 0x0058;
      } else if (irq && irqe && 0x10) { // Joypad
        bitMask = 0x0F;
        interruptVector = 0x0060;
      }

      // Clear the flag for the interrupt being processed
      this.memoryMap.write8(0xFF0F, irq & bitMask);
      // Push the current PC onto the stack
      this.SP -= 2;
      this.memoryMap.write16(this.SP, this.PC);

      // Jump to the VSync Interrupt Vector
      this.PC = interruptVector;
      this.cycleOffset = 5;
      return true;
    }

    let opCode = this.memoryMap.read8(this.PC);
    this.PC += 1;

    let opCodeTable = opCodes;
    let isCbCode = false;
    // Prefixed op code
    if (opCode === 0xCB) {
      isCbCode = true;
      opCode = this.memoryMap.read8(this.PC);
      this.PC += 1
      opCodeTable = cbOpCodes;
    }

    if (!opCodeTable[opCode]) {
      console.log('Unknown opcode: ', `${isCbCode ? '0xCB ' : ''}${opCode.toString(16)}`);
      return false;
    }
    const operation = opCodeTable[opCode];

    // + DEBUG ---
    const codeString = opCode.toString(16)
    const paddedCodeString = `0x${'0'.repeat(2 - codeString.length)}${codeString}`

    this.opHistory.push({
      step: this.step,
      PC: this.PC - 1,
      codeString,
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

    if (this.opHistory.length > 100) {
      this.opHistory.shift();
    }
    // - DEBUG ---

    operation.action(this);
    this.step++;

    // Set how many cycles to wait before next operation
    this.cycleOffset = operation.cycles - 1;
    return true;
  }

  // Memory access helpers
  // Reading
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

  // Writing
  public write8(address: number, value: number): void {
    // TODO: Masked/blocked writes, etc.
    this.memoryMap.write8(address, value);
  }

  public write16(address: number, value: number): void {
    // TODO: Masked/blocked writes, etc.
    this.memoryMap.write16(address, value);
  }
}
