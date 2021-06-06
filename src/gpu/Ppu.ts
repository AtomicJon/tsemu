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

const statsBarHeight = 16;

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
  private canvas: HTMLCanvasElement;
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


  private lcdc: number = 0;
  private bgWindowEnable: number = 0;
  private objEnable: number = 0;
  private objSize: number = 0;
  private bgTileMap: number = 0;
  private tileSource: number = 0;
  private windowEnable: number = 0;
  private windowTileMap: number = 0;
  private lcdPpuEnable: number = 0;

  private stat: number = 0;
  private mode: number = 0;
  private coincidence: number = 0;
  private mode0HBlank: number = 0;
  private mode1VBlank: number = 0;
  private mode2Oam: number = 0;
  private myCoincidence: number = 0;

  constructor(memoryMap: MemoryMap, canvas: HTMLCanvasElement) {
    this.memoryMap = memoryMap;
    this.canvas = canvas;

    // TODO: Make scale configurable
    const scale = 2;
    this.canvas.width = 160 * scale;
    this.canvas.height = 144 * scale + statsBarHeight;

    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('Failed to get canvas 2D Context.');
    }

    this.backgroundLayer = new ImageLayer(ctx.createImageData(bufferWidth, bufferHeight));
    this.windowLayer = new ImageLayer(ctx.createImageData(bufferWidth, bufferHeight));
    this.spriteLayer = new ImageLayer(ctx.createImageData(bufferWidth, bufferHeight));
    this.bufferLayer = new ImageLayer(ctx.createImageData(bufferWidth, bufferHeight));

    this.bufferCanvas = document.createElement('canvas');
    this.bufferCanvas.width = screenWidth;
    this.bufferCanvas.height = screenHeight;
    this.bufferCtx = this.bufferCanvas.getContext('2d')!;

    this.ctx = ctx;
  }

  public tick() {
    this.updateState();
    if (!this.lcdPpuEnable) {
      this.currentScanline = 0;
      this.currentScanlineOffset = 0;
      const lcdStat = this.memoryMap.read8(0xFF41);
      this.memoryMap.write8(0xFF41, lcdStat & 0xFC); // Set mode to 0, TODO:  LYC=LY (Coincidence)?
      this.memoryMap.write8(0xFF44, this.currentScanline);
      return;
    }

    this.currentScanlineOffset += 1;
    if (this.currentScanlineOffset === 456) {
      this.currentScanlineOffset = 0;
      this.currentScanline = this.currentScanline === 153 ? 0 : this.currentScanline + 1;
    }
    this.memoryMap.write8(0xFF44, this.currentScanline);

    let updatedLcdStat = this.memoryMap.read8(0xFF41);
    let updatedInterrupts = this.memoryMap.read8(0xFF0F);

    const lycInterruptEnabled = (updatedInterrupts & 0x40) === 0x40;
    const mode2OAMInterruptEnabled = (updatedInterrupts & 0x40) === 0x20;
    // TODO: Does this flag need to be checked when firing VBlank IRQ?
    const mode1VBlankInterruptEnabled = (updatedInterrupts & 0x40) === 0x10;
    const mode0HBlankInterruptEnabled = (updatedInterrupts & 0x40) === 0x08;

    let lcdStatInterrupt = false;

    // Clear the mode and LYC (Coincidence), set below
    updatedLcdStat = updatedLcdStat & 0xF8;
    if (this.currentScanline < 143) {
      if (this.currentScanlineOffset < 80) {
        updatedLcdStat |= 0x02;
        lcdStatInterrupt = mode2OAMInterruptEnabled || lcdStatInterrupt;
      } else if (this.currentScanlineOffset < 252) {
        updatedLcdStat |= 0x03;
      } else if (this.currentScanlineOffset === 252) {
        // updatedLcdStat |= 0 : 0 During HBlank
        lcdStatInterrupt = mode0HBlankInterruptEnabled || lcdStatInterrupt;
      }
    } else if (this.currentScanline === 144 && this.currentScanlineOffset === 0) {
      updatedLcdStat |= 0x01;
      updatedInterrupts |= 0x01;
    } else {
      updatedLcdStat |= 0x01;
    }

    const lyc = this.memoryMap.read8(0xFF45);
    if (lyc === this.currentScanline) {
      updatedLcdStat |= 0x04;
      lcdStatInterrupt = lycInterruptEnabled || lcdStatInterrupt;
    }

    if (lcdStatInterrupt) {
      updatedInterrupts |= 0x02;
    }

    // Update stats and interrupts
    this.memoryMap.write8(0xFF41, updatedLcdStat);
    this.memoryMap.write8(0xFF0F, updatedInterrupts);
    // TODO: Move pixel manipulation to tick, keep drawing in update
  }

  public update() {
    this.updateState();

    const scrollY = this.memoryMap.read8(0xFF42);
    const scrollX = this.memoryMap.read8(0xFF43);
    const lcdY = this.memoryMap.read8(0xFF44);
    const lyCompare = this.memoryMap.read8(0xFF45);
    // const dmaTransfer = this.memoryMap.read8(0xFF46);
    const windowY = this.memoryMap.read8(0xFF4A);
    const windowX = this.memoryMap.read8(0xFF4B);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.bgWindowEnable) {
      // Draw the background onto the buffer so that it can be transferred
      // to the appropriate offset for scroll X/Y
      if (this.bgTileMap === 0) {
        this.renderTileMap(0x9800, this.bufferLayer);
      } else {
        this.renderTileMap(0x9C00, this.bufferLayer);
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

    if (this.objEnable) {
      this.renderSprites();
      this.renderLayer(this.spriteLayer, 0, 0);
    }

    if (this.windowEnable) {
      if (this.windowTileMap === 0) {
        this.renderTileMap(0x9800, this.windowLayer);
      } else {
        this.renderTileMap(0x9C00, this.windowLayer);
      }
      this.renderLayer(this.windowLayer, windowX, windowY);
    }

    // FPS Helper
    this.renderFps();
  }

  private updateState(): void {
    const lcdc = this.memoryMap.read8(0xFF40);
    this.bgWindowEnable =  (lcdc & 1);
    this.objEnable =       (lcdc & 2) >> 1;
    this.objSize =         (lcdc & 4) >> 2;
    this.bgTileMap =       (lcdc & 8) >> 3;
    this.tileSource =      (lcdc & 16) >> 4;
    this.windowEnable =    (lcdc & 32) >> 5;
    this.windowTileMap =   (lcdc & 64) >> 6;
    this.lcdPpuEnable =    (lcdc & 128) >> 7;

    const stat = this.memoryMap.read8(0xFF41);
    this.mode =          (stat & 3); // Uses first two bits
    this.coincidence =   (stat & 4) >> 2;
    this.mode0HBlank =   (stat & 8) >> 3;
    this.mode1VBlank =   (stat & 16) >> 4;
    this.mode2Oam =      (stat & 32) >> 5;
    this.myCoincidence = (stat & 64) >> 6;
    // 7th bit unused?
  }

  private renderLayer(layer: ImageLayer, x: number, y: number) {
    this.bufferCtx.putImageData(layer.imageData, 0, 0);
    this.ctx.drawImage(this.bufferCanvas, 0, 0, this.canvas.width, this.canvas.height - statsBarHeight);
  }

  private renderTileMap(address: number, target: ImageLayer) {
    for (let i = 0; i < 1024; i++)  {
      const y = Math.floor(i / 32);
      const x = i - y * 32;

      const tileNumber = (this.tileSource === 0)
        ? this.memoryMap.read8Signed(address + i)
        : this.memoryMap.read8(address + i);
      this.renderTile(x * 8, y * 8, tileNumber, this.tileSource, target);
    }
  }

  private renderSprites() {
    // Clear current sprite data
    this.spriteLayer.pixelArray.fill(0x000000);

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

      this.renderTile(x - 8, y - 16, tileNumber, 1, this.spriteLayer, true);
    }
  }

  private renderTile(
    x: number,
    y: number,
    tileNumber: number,
    tileDataLocationFlag: number,
    target: ImageLayer,
    isSprite: boolean = false
  ) {
    const tileSize = (this.objSize === 1 && isSprite) ? 16 : 8;
    const tileOffset = (tileSize == 16) ? tileNumber & 0xFE : tileNumber; // For 16, ignore the lower bit
    const address = (tileDataLocationFlag === 0 ? 0x9000 : 0x8000) + (tileOffset * 16);
    for (let row = 0; row < tileSize; row++) {
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
    this.ctx.fillRect(0, this.canvas.height - statsBarHeight, this.canvas.width, statsBarHeight);
    this.ctx.fillStyle = 'white';
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillText(`FPS: ${fpsString} (${updateString}ms)`, 4, this.canvas.height - 2);
    this.ctx.restore();
  }
}