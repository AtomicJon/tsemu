import MemoryMap from 'memory/MemoryMap';
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
  public memoryMap: MemoryMap;

  private step = 0;
  private stack: number[] = [];
  private opHistory: OpHistory[] = [];

  private gpuScanLine = 0;

  private registersBuffer: ArrayBuffer = new ArrayBuffer(12);
  private registers: Uint8Array = new Uint8Array(this.registersBuffer);
  private registers16: Uint16Array = new Uint16Array(this.registersBuffer);

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

  // Memory access helpers
  // Reading
  public read8(): number {
    // TODO:
    return this.memoryMap.read8(this.PC);
  }

  public read8Signed(): number {
    // TODO:
    return this.memoryMap.read8Signed(this.PC);
  }

  public read16(): number {
    // TODO:
    return this.memoryMap.read16(this.PC);
  }

  public push(value: number): void {
    this.stack.push(value);
  }

  public pop(): number {
    if (this.stack.length < 1) {
      throw new Error('Attempting to pop value with empty stack')
    }
    return this.stack.pop()!;
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
    let cycles = 0;

    while (cycles < 66667) {
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
        PC: this.PC,
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

      // TODO: Move to GPU emulation
      this.memoryMap.write8(0xFF44, this.gpuScanLine);
      if (this.step % 64 == 0) this.gpuScanLine += 1;
      if (this.gpuScanLine >= 144) {
        this.memoryMap.write8(0xFF41, 0x01);
      }
      if (this.gpuScanLine > 153) {
        this.memoryMap.write8(0xFF41, 0x00);
        this.gpuScanLine = 0;
      }

      operation.action(this);
      cycles += operation.cycles;
      this.step++;
    }

    return true;
  }
}