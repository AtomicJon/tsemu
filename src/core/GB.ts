import Cpu from '../cpu/Cpu';
import Ppu from '../gpu/Ppu';
import Joypad from '../io/Joypad';
import MemoryMap from '../memory/MemoryMap';
import getHexString from '../util/getHexString';
import getBinaryString from '../util/getBinaryString';
import { CORE_CLOCK } from './constants';
import Apu from '../audio/Apu';

/**
 * The core Game Boy class
 */
export default class GB {
  private cpu: Cpu;
  private gpu: Ppu;
  private apu: Apu;
  private joypad: Joypad;
  private memoryMap: MemoryMap;

  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private isAudioEnabled: boolean = true;
  private animationFrameRequest: number | null = null;

  private dbgA: HTMLElement;
  private dbgF: HTMLElement;
  private dbgAF: HTMLElement;
  private dbgB: HTMLElement;
  private dbgC: HTMLElement;
  private dbgBC: HTMLElement;
  private dbgD: HTMLElement;
  private dbgE: HTMLElement;
  private dbgDE: HTMLElement;
  private dbgH: HTMLElement;
  private dbgL: HTMLElement;
  private dbgHL: HTMLElement;
  private dbgPC: HTMLElement;
  private dbgSP: HTMLElement;

  private dbgJoypad: HTMLElement;

  private dbgSound1: HTMLElement;
  private dbgSound2: HTMLElement;
  private dbgSound3: HTMLElement;
  private dbgSound4: HTMLElement;

  private dbgTilesCanvas: HTMLCanvasElement;
  private dbgTilesCtx: CanvasRenderingContext2D;
  private dbgOam: HTMLElement;
  private dbgLcdC: HTMLElement;
  private dbgSerial: HTMLElement;

  constructor(canvas: HTMLCanvasElement) {
    this.memoryMap = new MemoryMap();
    this.cpu = new Cpu(this.memoryMap);
    this.gpu = new Ppu(this.memoryMap, canvas);
    this.apu = new Apu(this.memoryMap);
    this.joypad = new Joypad(this.memoryMap);

    this.joypad.init();
    this.gpu.tick();

    // Debug references
    this.dbgA = document.getElementById('dbg_a')!;
    this.dbgF = document.getElementById('dbg_f')!;
    this.dbgAF = document.getElementById('dbg_af')!;
    this.dbgB = document.getElementById('dbg_b')!;
    this.dbgC = document.getElementById('dbg_c')!;
    this.dbgBC = document.getElementById('dbg_bc')!;
    this.dbgD = document.getElementById('dbg_d')!;
    this.dbgE = document.getElementById('dbg_e')!;
    this.dbgDE = document.getElementById('dbg_de')!;
    this.dbgH = document.getElementById('dbg_h')!;
    this.dbgL = document.getElementById('dbg_l')!;
    this.dbgHL = document.getElementById('dbg_hl')!;
    this.dbgPC = document.getElementById('dbg_pc')!;
    this.dbgSP = document.getElementById('dbg_sp')!;

    this.dbgJoypad = document.getElementById('dbg_joypad')!;

    this.dbgSound1 = document.getElementById('dbg_sound1')!;
    this.dbgSound2 = document.getElementById('dbg_sound2')!;
    this.dbgSound3 = document.getElementById('dbg_sound3')!;
    this.dbgSound4 = document.getElementById('dbg_sound4')!;

    this.dbgTilesCanvas = document.getElementById(
      'dbg_tiles',
    )! as HTMLCanvasElement;
    this.dbgTilesCtx = this.dbgTilesCanvas.getContext('2d')!;
    this.dbgOam = document.getElementById('dbg_oam')!;
    this.dbgLcdC = document.getElementById('dbg_lcdc')!;
    this.dbgSerial = document.getElementById('dbg_serial')!;
  }

  /**
   * Pause/unpause emulation
   */
  public togglePause(): boolean {
    this.isPaused = !this.isPaused;
    if (this.isPaused && this.isAudioEnabled) {
      this.apu.pause();
    } else if (this.isAudioEnabled) {
      this.apu.resume();
    }
    return this.isPaused;
  }

  /**
   * Enable audio output
   */
  public enableAudio(): void {
    this.isAudioEnabled = true;

    if (!this.isPaused && this.isRunning) {
      this.apu.resume();
    }
  }

  /**
   * Disable audio output
   */
  public disableAudio(): void {
    this.isAudioEnabled = false;
    this.apu.pause();
  }

  /**
   * Set the volume
   * @param volume The volume to set (0 - 100)
   */
  public setVolume(volume: number): void {
    this.apu.setVolume(volume / 100);
  }

  /**
   * Load a cart into the emulator
   * @param cartData An array buffer containing the cart data
   */
  public loadCart(cartData: ArrayBuffer) {
    console.log('load cart');
    this.memoryMap.loadCart(cartData);
    this.cpu.reset();

    if (this.isAudioEnabled) {
      this.apu.resume();
    }

    this.isRunning = true;
    if (this.animationFrameRequest) {
      window.cancelAnimationFrame(this.animationFrameRequest);
    }
    this.animationFrameRequest = requestAnimationFrame(this.update);
  }

  /**
   * The update callback - called per frame (requestAnimationFrame)
   */
  private update = (): void => {
    if (!this.isRunning) {
      this.animationFrameRequest = null;
      return;
    }

    // Pause loop
    if (this.isPaused) {
      this.animationFrameRequest = requestAnimationFrame(this.update);
      return;
    }

    let cycles = 0;
    // TODO: Adjust cycles based on framerate
    // Game Boy Freq: 4.19 MHz @ 60FPS
    while (cycles < CORE_CLOCK / 60) {
      this.joypad.tick();

      const cpuSuccess = this.cpu.tick();
      this.gpu.tick();

      if (this.isAudioEnabled) {
        this.apu.tick();
      }

      // Halt if CPU cycle fails
      if (!cpuSuccess) {
        return;
      }
      cycles += 1;
    }

    this.gpu.update();
    this.updateDebug();
    this.animationFrameRequest = requestAnimationFrame(this.update);
  };

  /**
   * Debug - update UI with debug info
   */
  private updateDebug = (): void => {
    this.dbgA.innerHTML = getHexString(this.cpu.A);
    this.dbgF.innerHTML = getHexString(this.cpu.F);
    this.dbgB.innerHTML = getHexString(this.cpu.B);
    this.dbgC.innerHTML = getHexString(this.cpu.C);
    this.dbgD.innerHTML = getHexString(this.cpu.D);
    this.dbgE.innerHTML = getHexString(this.cpu.E);
    this.dbgH.innerHTML = getHexString(this.cpu.H);
    this.dbgL.innerHTML = getHexString(this.cpu.L);
    this.dbgAF.innerHTML = getHexString(this.cpu.AF, 4);
    this.dbgBC.innerHTML = getHexString(this.cpu.BC, 4);
    this.dbgDE.innerHTML = getHexString(this.cpu.DE, 4);
    this.dbgHL.innerHTML = getHexString(this.cpu.HL, 4);
    this.dbgPC.innerHTML = getHexString(this.cpu.PC);
    this.dbgSP.innerHTML = getHexString(this.cpu.SP);

    const joypadValue = this.memoryMap.read8(0xff00);
    this.dbgJoypad.innerHTML = `${getBinaryString(joypadValue)} (${getHexString(
      joypadValue,
    )}) [${this.joypad.getPressedInputs().join(', ')}]`;

    const nr11 = this.memoryMap.read8(0xff10);
    const nr12 = this.memoryMap.read8(0xff11);
    const nr13 = this.memoryMap.read8(0xff12);
    const nr14 = this.memoryMap.read8(0xff13);
    const nr15 = this.memoryMap.read8(0xff14);
    this.dbgSound1.innerHTML = `
      ${getBinaryString(nr11)}
      ${getBinaryString(nr12)}
      ${getBinaryString(nr13)}
      ${getBinaryString(nr14)}
      ${getBinaryString(nr15)}
    `;

    const nr21 = this.memoryMap.read8(0xff15);
    const nr22 = this.memoryMap.read8(0xff16);
    const nr23 = this.memoryMap.read8(0xff17);
    const nr24 = this.memoryMap.read8(0xff18);
    const nr25 = this.memoryMap.read8(0xff19);
    this.dbgSound2.innerHTML = `
      ${getBinaryString(nr21)}
      ${getBinaryString(nr22)}
      ${getBinaryString(nr23)}
      ${getBinaryString(nr24)}
      ${getBinaryString(nr25)}
    `;

    // TODO: Add toggle for serial data
    // const serialDataString = this.cpu.serialData.map((value: number) => getHexString(value)).join(' ');
    // const serialTextString = this.cpu.serialData.map((value: number) => String.fromCharCode(value)).join('');
    // this.dbgSerial.innerHTML = `${serialDataString}<br/>${serialTextString}`;

    const oamValues = [];
    for (let i = 0; i < 40; i++) {
      const y = this.memoryMap.read8(0xfe00 + i * 4);
      const x = this.memoryMap.read8(0xfe00 + i * 4 + 1);
      const id = this.memoryMap.read8(0xfe00 + i * 4 + 2);
      const attrs = this.memoryMap.read8(0xfe00 + i * 4 + 3);
      oamValues.push(`[${x}, ${y}, ${id}, ${getBinaryString(attrs)}]`);
    }
    this.dbgOam.innerHTML = oamValues.join('<br/>');

    const lcdc = this.memoryMap.read8(0xff40);
    const bgWindowEnable = lcdc & 1;
    const objEnable = (lcdc & 2) >> 1;
    const objSize = (lcdc & 4) >> 2;
    const bgTileMap = (lcdc & 8) >> 3;
    const tileSource = (lcdc & 16) >> 4;
    const windowEnable = (lcdc & 32) >> 5;
    const windowTileMap = (lcdc & 64) >> 6;
    const lcdPpuEnable = (lcdc & 128) >> 7;

    this.dbgLcdC.innerHTML = `
      ${getBinaryString(lcdc)} (${getHexString(lcdc)})<br/>
      LCD Enabled:   ${lcdPpuEnable}<br/>
      Window Source: ${windowTileMap}<br/>
      Window Enabled: ${windowEnable}<br/>
      Tile Source: ${tileSource}<br/>
      BG Source: ${bgTileMap}<br/>
      Obj Size: ${objSize}<br/>
      Obj Enabled: ${objEnable}<br/>
      BG Enabled: ${bgWindowEnable}<br/>
    `;

    const colors = [0x00000000, 0xffaaaaaa, 0xff555555, 0xff000000];
    const canvasWidth = this.dbgTilesCanvas.width;
    const canvasHeight = this.dbgTilesCanvas.height;

    const tileData = this.dbgTilesCtx.createImageData(
      canvasWidth,
      canvasHeight,
    );
    const pixelArray = new Uint32Array(tileData.data.buffer);
    for (let i = 0; i < 384; i++) {
      const address = 0x8000 + i * 16;
      const x = (i * 8) % canvasWidth;
      const y = Math.floor(i / (canvasWidth / 8)) * 8;

      for (let row = 0; row < 8; row++) {
        const byte1 = this.memoryMap.read8(address + row * 2);
        const byte2 = this.memoryMap.read8(address + row * 2 + 1);
        for (let column = 0; column < 8; column++) {
          const bit1 = (byte1 >> (7 - column)) & 1;
          const bit2 = (byte2 >> (7 - column)) & 1;
          const colorValue = bit1 + (bit2 << 1);

          const color = colors[colorValue];
          const offset = (y + row) * canvasWidth + x + column;
          pixelArray[offset] = color;
        }
      }
    }
    this.dbgTilesCtx.putImageData(tileData, 0, 0);

    // Highlight sections if needed
    // this.dbgTilesCtx.strokeStyle = '#00cefe';
    // this.dbgTilesCtx.lineWidth = 0.5;
    // this.dbgTilesCtx.strokeRect(0, 0, canvasWidth, canvasHeight / 3);
    // this.dbgTilesCtx.strokeRect(0, canvasHeight / 3, canvasWidth, canvasHeight / 3);
    // this.dbgTilesCtx.strokeRect(0, (canvasHeight / 3) * 2, canvasWidth, canvasHeight / 3);
  };
}
