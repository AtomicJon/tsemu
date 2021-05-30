import MemoryMap from './MemoryMap';

const colors = [
  0x00000000,
  0xffAAAAAA,
  0xff555555,
  0xff000000
];

const screenWidth = 160;
const screenHeight = 144;

export default class Ppu {
  private memoryMap: MemoryMap;
  private ctx: CanvasRenderingContext2D;
  private imageData: ImageData;
  private pixelArray: Uint32Array;

  private lastUpdate: number = 0;
  private updateSamples: number[] = [];
  private updateAverage: number | null = null;
  private fpsSampleRate = 50;

  constructor(memoryMap: MemoryMap, canvas: HTMLCanvasElement) {
    this.memoryMap = memoryMap;

    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('Failed to get canvas 2D Context.');
    }

    this.imageData = ctx.createImageData(screenWidth, screenHeight);
    this.imageData.data.fill(0x00);
    this.pixelArray = new Uint32Array(this.imageData.data.buffer);
    this.ctx = ctx;
  }

  public tick() {
    const lcdc = this.memoryMap.read8(0xFF40);
    const bgWindowEnable =  (lcdc & 1);
    const objEnable =       (lcdc & 2) >> 1;
    const objSize =         (lcdc & 4) >> 2;
    const bgTileArea =      (lcdc & 8) >> 3;
    const bgTileData =      (lcdc & 16) >> 4;
    const windowEnable =    (lcdc & 32) >> 5;
    const windowTileArea =  (lcdc & 64) >> 6;
    const lcdPpuEnable =    (lcdc & 128) >> 7;

    const stat = this.memoryMap.read8(0xFF41);
    const mode =          (stat & 3); // Uses first two bits
    const coincidence =   (stat & 4) >> 2;
    const mode0HBlank =   (stat & 8) >> 3;
    const mode1VBlank =   (stat & 16) >> 4;
    const mode2Oam =      (stat & 32) >> 5;
    const myCoincidence = (stat & 64) >> 6;
    // 7th bit unused?

    const scrollY = this.memoryMap.read8(0xFF42);
    const scrollX = this.memoryMap.read8(0xFF43);
    const lcdY = this.memoryMap.read8(0xFF44);
    const lyCompare = this.memoryMap.read8(0xFF45);
    // const dmaTransfer = this.memoryMap.read8(0xFF46);
    const windowY = this.memoryMap.read8(0xFF4A);
    const windowX = this.memoryMap.read8(0xFF4B);

    this.ctx.clearRect(0, 0, screenWidth, screenHeight);


    // Test rendering the first sprite
    this.ctx.save();
    this.ctx.scale(2, 2);
    this.renderBackground(0x9800, bgTileData);
    this.renderBackground(0x9C00, bgTileData);
    // TODO Window
    this.renderSprites();
    // this.renderTile(0, 20, 0);
    this.ctx.putImageData(this.imageData, 0, 0);
    this.ctx.restore();

    // this.ctx.fillRect(Math.random() * 160, Math.random() * 144, Math.random() * 160, Math.random() * 144);

    // FPS Helper
    this.renderFps();
  }

  private renderBackground(address: number, tileDataLocationFlag: number) {
    for (let i = 0; i < 1024; i++)  {
      const y = Math.floor(i / 32);
      const x = i - y * 32;

      const tileNumber = (tileDataLocationFlag === 0)
        ? this.memoryMap.read8Signed(address + i)
        : this.memoryMap.read8(address + i);
      this.renderTile(x * 8, y * 8, tileNumber, tileDataLocationFlag);
    }
  }

  private renderSprites() {
    for (let i = 0; i < 40; i++) {
      const y = this.memoryMap.read8(0xFE00 + i);
      const x = this.memoryMap.read8(0xFE00 + i + 1);
      const tileNumber = this.memoryMap.read8(0xFE00 + i + 2);
      const flags = this.memoryMap.read8(0xFE00 + i)+ 3;
      // TODO Read:
      // Bit 0-2 Palette number (CGB Only)
      // Bit 3 Tile VRAM Bank (CGB Only)
      // bit 4 Palette Number (0=OBP0, 1=OBP1)
      // bit 5 x flip (1 = flip)
      // bit 6 y flip (1 = flip)
      // bit 7 obj-bg priority (0 obj above, 1 obj behind)

      this.renderTile(x, y, tileNumber);
    }
  }

  private renderTile(x: number, y: number, tileNumber: number, tileDataLocationFlag: number = 0, size: number = 8) {
    const address = (tileDataLocationFlag === 0 ? 0x9000 : 0x8000) + (tileNumber * 16);
    for (let row = 0; row < size; row++) {
      const byte1 = this.memoryMap.read8(address + row * 2)
      const byte2 = this.memoryMap.read8(address + row * 2 + 1)

      for (let column = 0; column < 8; column++) {
        const bit1 = (byte1 >> (7 - column)) & 1;
        const bit2 = (byte2 >> (7 - column)) & 1;
        const colorValue = bit1 + (bit2 << 1);

        const color = colors[colorValue];

        // Ignore transparent
        if (color === 0) {
          continue;
        }
        const offset = ((y + row) * screenWidth + x + column);
        this.pixelArray[offset] = color;
      }
    }
  }

  private renderFps() {
    const now = performance.now();
    const updateTime = now - this.lastUpdate || 1;
    this.lastUpdate = now;

    this.updateSamples.push(updateTime);

    if (this.updateSamples.length === this.fpsSampleRate) {
      this.updateAverage = this.updateSamples.reduce((acc, val) => acc + val, 0) / this.fpsSampleRate;
      this.updateSamples = [];
    }

    const fpsString = this.updateAverage ? Math.round(1000 / this.updateAverage) : '-';
    const updateString = this.updateAverage ? Math.round(this.updateAverage * 1000) / 1000 : '-';
    this.ctx.save();
    this.ctx.fillStyle = 'red';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(`FPS: ${fpsString} (${updateString}ms)`, 0, 0);
    this.ctx.restore();
  }
}