import MemoryMap from '../memory/MemoryMap';

const colors = [
  0x00000000,
  0xffAAAAAA,
  0xff555555,
  0xff000000
];

const screenWidth = 160;
const screenHeight = 144;

const bufferWidth = 256;
const bufferHeight = 256;

class ImageLayer {
  public imageData: ImageData;
  public pixelArray: Uint32Array;

  constructor(imageData: ImageData) {
    this.imageData = imageData;
    this.imageData.data.fill(0x00);
    this.pixelArray = new Uint32Array(this.imageData.data.buffer);
  }
}

export default class Ppu {
  private memoryMap: MemoryMap;
  private ctx: CanvasRenderingContext2D;

  private bufferCanvas: HTMLCanvasElement;
  private bufferCtx: CanvasRenderingContext2D;

  private backgroundLayer: ImageLayer;
  private windowLayer: ImageLayer;
  private spriteLayer: ImageLayer;

  private bufferLayer: ImageLayer;

  private lastUpdate: number = 0;
  private updateSamples: number[] = [];
  private updateAverage: number | null = null;
  private fpsSampleRate = 50;

  private currentScanline = 0;
  private currentScanlineOffset = 0;

  constructor(memoryMap: MemoryMap, canvas: HTMLCanvasElement) {
    this.memoryMap = memoryMap;

    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('Failed to get canvas 2D Context.');
    }

    this.backgroundLayer = new ImageLayer(ctx.createImageData(bufferWidth, bufferHeight));
    this.windowLayer = new ImageLayer(ctx.createImageData(bufferWidth, bufferHeight));
    this.spriteLayer = new ImageLayer(ctx.createImageData(bufferWidth, bufferHeight));
    this.bufferLayer = new ImageLayer(ctx.createImageData(bufferWidth, bufferHeight));

    this.bufferCanvas = document.createElement('canvas');
    this.bufferCtx = this.bufferCanvas.getContext('2d')!;

    this.ctx = ctx;
  }

  public tick() {
    this.currentScanlineOffset += 1;
    if (this.currentScanlineOffset === 456) {
      this.currentScanlineOffset = 0;
      this.currentScanline = this.currentScanline === 153 ? 0 : this.currentScanline + 1;
    }
    this.memoryMap.write8(0xFF44, this.currentScanline);

    if (this.currentScanline < 143) {
      if (this.currentScanlineOffset < 80) {
        this.memoryMap.write8(0xFF41, 2);
      } else if (this.currentScanlineOffset < 252) {
        this.memoryMap.write8(0xFF41, 3);
      } else if (this.currentScanlineOffset === 252) {
        this.memoryMap.write8(0xFF41, 0x08);
      }
    } else if (this.currentScanline === 144 && this.currentScanlineOffset === 0) {
      this.memoryMap.write8(0xFF41, 0x11);
      this.memoryMap.write8(0xFF0F, 0x01);
    } else {
      this.memoryMap.write8(0xFF41, 0x01);
    }
    // TODO: Move pixel manipulation to tick, keep drawing in update
  }

  public update() {
    const lcdc = this.memoryMap.read8(0xFF40);
    const bgWindowEnable =  (lcdc & 1);
    const objEnable =       (lcdc & 2) >> 1;
    const objSize =         (lcdc & 4) >> 2;
    const bgTileMap =       (lcdc & 8) >> 3;
    const tileSource =      (lcdc & 16) >> 4;
    const windowEnable =    (lcdc & 32) >> 5;
    const windowTileMap =   (lcdc & 64) >> 6;
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

    if (bgWindowEnable) {
      // Draw the background onto the buffer so that it can be transferred
      // to the appropriate offset for scroll X/Y
      if (bgTileMap === 0) {
        this.renderTileMap(0x9800, tileSource, this.bufferLayer);
      } else {
        this.renderTileMap(0x9C00, tileSource, this.bufferLayer);
      }
      const startOffset = (scrollY * 256) + scrollX;
      for (let i = 0; i < this.bufferLayer.pixelArray.length; i++) {
        let offset = i + startOffset;
        if (offset >= 65536) {
          offset -= 65536;
        }
        this.backgroundLayer.pixelArray[i] = this.bufferLayer.pixelArray[offset];
      }

      this.renderLayer(this.backgroundLayer, 0, 0);
    }

    if (objEnable) {
      this.renderSprites();
      this.renderLayer(this.spriteLayer, 0, 0);
    }

    if (windowEnable) {
      if (windowTileMap === 0) {
        this.renderTileMap(0x9800, tileSource, this.windowLayer);
      } else {
        this.renderTileMap(0x9C00, tileSource, this.windowLayer);
      }
      this.renderLayer(this.windowLayer, windowX, windowY);
    }

    // FPS Helper
    this.renderFps();
  }

  private renderLayer(layer: ImageLayer, x: number, y: number) {
    this.bufferCtx.putImageData(layer.imageData, 0, 0);
    this.ctx.drawImage(this.bufferCanvas, 0, 0);
  }

  private renderTileMap(address: number, tileDataLocationFlag: number, target: ImageLayer) {
    for (let i = 0; i < 1024; i++)  {
      const y = Math.floor(i / 32);
      const x = i - y * 32;

      const tileNumber = (tileDataLocationFlag === 0)
        ? this.memoryMap.read8Signed(address + i)
        : this.memoryMap.read8(address + i);
      this.renderTile(x * 8, y * 8, tileNumber, tileDataLocationFlag, target);
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

      this.renderTile(x, y, tileNumber, 1, this.spriteLayer);
    }
  }

  private renderTile(
    x: number,
    y: number,
    tileNumber: number,
    tileDataLocationFlag: number,
    target: ImageLayer,
    size: number = 8
  ) {
    const address = (tileDataLocationFlag === 0 ? 0x9000 : 0x8000) + (tileNumber * 16);
    for (let row = 0; row < size; row++) {
      const byte1 = this.memoryMap.read8(address + row * 2)
      const byte2 = this.memoryMap.read8(address + row * 2 + 1)

      for (let column = 0; column < 8; column++) {
        const bit1 = (byte1 >> (7 - column)) & 1;
        const bit2 = (byte2 >> (7 - column)) & 1;
        const colorValue = bit1 + (bit2 << 1);

        const color = colors[colorValue];
        const offset = ((y + row) * bufferWidth + x + column);
        target.pixelArray[offset] = color;
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
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 144, 160, 16);
    this.ctx.fillStyle = 'white';
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillText(`FPS: ${fpsString} (${updateString}ms)`, 4, 158);
    this.ctx.restore();
  }
}