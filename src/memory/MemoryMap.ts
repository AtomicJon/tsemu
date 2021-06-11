const ADDRESS_OAM_DMA_REQUEST = 0xFF46;
const SPRITES_OFFSET = 0xFE00;
/**
 * Class to manage memory access
 */
export default class MemoryMap {
  /**
   * Memory buffer
   * 0x0000 -> 0x3FFF : (16K) Cart ROM Bank 0
   * 0x4000 -> 0x7FFF : (16K) Cart ROM Bank 1
   * 0x8000 -> 0x9FFF : (8K) Video RAM
   * 0xA000 -> 0xBFFF : (8K) Cart RAM
   * 0xC000 -> 0xCFFF : (4K) Internal RAM Bank 0 (WRAM)
   * 0xD000 -> 0xDFFF : (4K) Internal RAM Bank 1 (WRAM)
   * 0xE000 -> 0xFDFF : (7.5K) Mirror of C000 -> DDFF
   * 0xFE00 -> 0xFE9F : (160) Sprites (OAM)
   * 0xFEA0 -> 0xFEFF : (95) Unusable
   * 0xFF00 -> 0xFF7F : (128) IO Registers
   * 0xFF80 -> 0xFFFE : (127) High RAM (HRAM)
   * 0xFFFF           : (1) Interrupt Enable Register
  */
  private memoryBuffer: ArrayBuffer = new ArrayBuffer(0x10000);
  private memoryView: DataView = new DataView(this.memoryBuffer);

  private cartDataBuffer: ArrayBuffer | null = null; // The cart itself
  private cartData: Uint8Array | null = null;

  /**
   * Load a game cart into memory
   * @param cartDataBuffer An ArrayBuffer containing the cart data
   */
  public loadCart(cartDataBuffer: ArrayBuffer) {
    this.cartDataBuffer = cartDataBuffer;
    this.cartData = new Uint8Array(this.cartDataBuffer);
    for (let i = 0; i < 0x8000; i++) {
      this.memoryView.setUint8(i, this.cartData[i]);
    }
  }

  /**
   * Read 1 byte of data as an 8bit int
   * @param address The address to read
   */
  public read8(address: number): number {
    if (!this.canRead(address)) {
      return 0;
    }

    return this.memoryView.getUint8(address);
  }

  /**
   * Read 1 byte of data as an 8bit signed int
   * @param address The address to read
   */
  public read8Signed(address: number): number {
    if (!this.canRead(address)) {
      return 0;
    }

    return this.memoryView.getInt8(address);
  }

  /**
   * Read 2 bytes of data as a 16bit int
   * @param address The address to read
   */
  public read16(address: number): number {
    if (!this.canRead(address)) {
      return 0;
    }

    return this.memoryView.getUint16(address, true);
  }

  /**
   * Write an 8bit int
   * @param address The address to write the value to
   * @param value The integer value to write
   */
  public write8(address: number, value: number): void {
    // DMA Transfer
    if (address == ADDRESS_OAM_DMA_REQUEST) {
      const fromAddress = value << 8;
      for (let i = 0; i < 0x9F; i++) {
        this.memoryView.setUint8(SPRITES_OFFSET + i, this.read8(fromAddress + i));
      }

      return;
    }

    this.memoryView.setUint8(address, value);
  }

  /**
   * Write a 16bit int
   * @param address The address to write the value to
   * @param value The integer value to write
   */
  public write16(address: number, value: number): void {
    this.memoryView.setUint16(address, value, true);
  }

  /**
   * Check if an address is readable (within bounds / not restricted)
   * @param address The address to check
   */
  private canRead(address: number): boolean {
    // Restricted / unknown for 0xFEA0 -> 0xFEFF
    if (address >= 0xFEA0 && address <= 0xFEFF) {
      return false;
    }

    // Bounds check
    if (address < 0 || address >= this.memoryBuffer.byteLength) {
      return false;
    }

    return true;
  }
}