export default class MemoryMap {
  private cartDataBuffer: ArrayBuffer | null = null; // The cart itself
  private cartData: Uint8Array | null = null;

  // Memory mapping buffers
  private cartRomBank0Buffer = new ArrayBuffer(16 * 1024);  // 0x0000 -> 0x3FFF
  private cartRomBank1Buffer = new ArrayBuffer(16 * 1024);  // 0x4000 -> 0x7FFF
  private videoRamBuffer     = new ArrayBuffer(8 * 1024);   // 0x8000 -> 0x9FFF
  private cartRamBuffer      = new ArrayBuffer(8 * 1024);   // 0xA000 -> 0xBFFF
  private internalRamBuffer  = new ArrayBuffer(8 * 1024);   // 0xC000 -> 0xDFFF
  // Next range is a mirror so re-use C000~DDFF             // 0xE000 -> 0xFDFF
  private spritesBuffer       = new ArrayBuffer(160);       // 0xFE00 -> 0xFE9F
  // Unknown/unused?                                        // 0xFEA0 -> 0xFEFF
  private ioRegistersBuffer  = new ArrayBuffer(128);        // 0xFF00 -> 0xFF7F
  private highRamBuffer      = new ArrayBuffer(127);        // 0xFF80 -> 0xFFFE
  // Interrupt is single value                              // 0xFFFF

  private cartRomBank0 = new Uint8Array(this.cartRomBank0Buffer);
  private cartRomBank1 = new Uint8Array(this.cartRomBank1Buffer);
  private videoRam = new Uint8Array(this.videoRamBuffer);
  private cartRam = new Uint8Array(this.cartRamBuffer);
  private internalRam = new Uint8Array(this.internalRamBuffer);
  private sprites = new Uint8Array(this.spritesBuffer);
  private ioRegisters = new Uint8Array(this.ioRegistersBuffer);
  private highRam = new Uint8Array(this.highRamBuffer);
  private interrupt: number = 0;

  private cartRomBank0Signed = new Int8Array(this.cartRomBank0Buffer);
  private cartRomBank1Signed = new Int8Array(this.cartRomBank1Buffer);
  private videoRamSigned = new Int8Array(this.videoRamBuffer);
  private cartRamSigned = new Int8Array(this.cartRamBuffer);
  private internalRamSigned = new Int8Array(this.internalRamBuffer);
  private spritesSigned = new Int8Array(this.spritesBuffer);
  private ioRegistersSigned = new Int8Array(this.ioRegistersBuffer);
  private highRamSigned = new Int8Array(this.highRamBuffer);

  public loadCart(cartDataBuffer: ArrayBuffer) {
    this.cartDataBuffer = cartDataBuffer;
    this.cartData = new Uint8Array(this.cartDataBuffer);
    for (let i = 0; i < 0x4000; i++) {
      this.cartRomBank0[i] = this.cartData[i];
      this.cartRomBank1[i] = this.cartData[i + 0x4000];
    }
  }

  public read8(address: number): number {
    if (address < 0x4000) {
      return this.cartRomBank0[address];
    } else if (address < 0x8000) {
      return this.cartRomBank1[address - 0x4000];
    } else if (address < 0xA000) {
      return this.videoRam[address - 0x8000];
    } else if (address < 0xC000) {
      return this.cartRam[address - 0xA000];
    } else if (address < 0xE000) {
      return this.internalRam[address - 0xC000];
    } else if (address < 0xFE00) {
      return this.internalRam[address - 0xE000];
    } else if (address < 0xFEA0) {
      return this.sprites[address - 0xFE00];
    } else if (address < 0xFF00) {
      return 0; // Restricted / unknown for 0xFEA0 -> 0xFEFF
    } else if (address < 0xFF80) {
      return this.ioRegisters[address - 0xFF00];
    } else if (address < 0xFFFF) {
      return this.highRam[address - 0xFF80];
    } else if (address === 0xFFFF) {
      return this.interrupt;
    }

    return 0;
  }

  public read8Signed(address: number): number {
    if (address < 0x4000) {
      return this.cartRomBank0Signed[address];
    } else if (address < 0x8000) {
      return this.cartRomBank1Signed[address - 0x4000];
    } else if (address < 0xA000) {
      return this.videoRamSigned[address - 0x8000];
    } else if (address < 0xC000) {
      return this.cartRamSigned[address - 0xA000];
    } else if (address < 0xE000) {
      return this.internalRamSigned[address - 0xC000];
    } else if (address < 0xFE00) {
      return this.internalRamSigned[address - 0xE000];
    } else if (address < 0xFEA0) {
      return this.spritesSigned[address - 0xFE00];
    } else if (address < 0xFF00) {
      return 0; // Restricted / unknown for 0xFEA0 -> 0xFEFF
    } else if (address < 0xFF80) {
      return this.ioRegistersSigned[address - 0xFF00];
    } else if (address < 0xFFFF) {
      return this.highRamSigned[address - 0xFF80];
    } else if (address === 0xFFFF) {
      return this.interrupt;
    }

    return 0;
  }

  public read16(address: number): number {
    const arrayBuffer: ArrayBuffer = new ArrayBuffer(2)
    const uInt8Array = new Uint8Array(arrayBuffer);
    const uInt16Array = new Uint16Array(arrayBuffer);

    uInt8Array[0] = this.read8(address);
    uInt8Array[1] = this.read8(address + 1);

    return uInt16Array[0];
  }

  public write8(address: number, value: number): void {
    if (address == 0xFF46) {
      debugger;
    }
    if (address < 0x4000) {
      this.cartRomBank0[address] = value;
    } else if (address < 0x8000) {
      this.cartRomBank1[address - 0x4000] = value;
    } else if (address < 0xA000) {
      this.videoRam[address - 0x8000] = value;
    } else if (address < 0xC000) {
      this.cartRam[address - 0xA000] = value;
    } else if (address < 0xE000) {
      this.internalRam[address - 0xC000] = value;
    } else if (address < 0xFE00) {
      this.internalRam[address - 0xE000] = value;
    } else if (address < 0xFEA0) {
      this.sprites[address - 0xFE00] = value;
    } else if (address < 0xFF00) {
      // Restricted / unknown for 0xFEA0 -> 0xFEFF
    } else if (address < 0xFF80) {
      this.ioRegisters[address - 0xFF00] = value;
    } else if (address < 0xFFFF) {
      this.highRam[address - 0xFF80] = value;
    } else if (address === 0xFFFF) {
      this.interrupt = value;
    }
  }
}