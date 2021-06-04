import Cpu from '../cpu/Cpu';
import Ppu from '../gpu/Ppu';
import MemoryMap from '../memory/MemoryMap';

export default class GB {
  private cpu: Cpu;
  private gpu: Ppu;
  private memoryMap: MemoryMap;

  private isRunning: boolean = false;
  private isPaused: boolean = false;
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

  constructor(canvas: HTMLCanvasElement) {
    this.memoryMap = new MemoryMap();
    this.cpu = new Cpu(this.memoryMap);
    this.gpu = new Ppu(this.memoryMap, canvas);
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
  }

  public togglePause(): boolean {
    this.isPaused = !this.isPaused;
    return this.isPaused;
  }

  public loadCart(cartData: ArrayBuffer) {
    console.log('load cart');
    this.memoryMap.loadCart(cartData);
    this.cpu.reset();

    this.isRunning = true;
    if (this.animationFrameRequest) {
      window.cancelAnimationFrame(this.animationFrameRequest);
    }
    this.animationFrameRequest = requestAnimationFrame(this.update);
  }

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
    while (cycles < 66667) {
      // TODO: Move to input when ready
      this.memoryMap.write8(0xFF00, 0x07); // Clear inputs

      let cpuSuccess = this.cpu.tick();
      this.gpu.tick();

      // 0 cycles indicates failure
      if (!cpuSuccess) {
        return;
      }
      cycles++;
    }

    this.gpu.update();
    this.updateDebug();
    this.animationFrameRequest = requestAnimationFrame(this.update);
  }

  private updateDebug = (): void => {
    this.dbgA.innerHTML = this.cpu.A.toString(16);
    this.dbgF.innerHTML = this.cpu.F.toString(16);
    this.dbgAF.innerHTML = this.cpu.F.toString(16);
    this.dbgB.innerHTML = this.cpu.B.toString(16);
    this.dbgC.innerHTML = this.cpu.C.toString(16);
    this.dbgBC.innerHTML = this.cpu.C.toString(16);
    this.dbgD.innerHTML = this.cpu.D.toString(16);
    this.dbgE.innerHTML = this.cpu.E.toString(16);
    this.dbgDE.innerHTML = this.cpu.E.toString(16);
    this.dbgH.innerHTML = this.cpu.H.toString(16);
    this.dbgL.innerHTML = this.cpu.L.toString(16);
    this.dbgHL.innerHTML = this.cpu.L.toString(16);
    this.dbgPC.innerHTML = this.cpu.PC.toString(16);
    this.dbgSP.innerHTML = this.cpu.SP.toString(16);
  }
}
