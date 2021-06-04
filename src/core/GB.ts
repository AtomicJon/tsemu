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

  constructor(canvas: HTMLCanvasElement) {
    this.memoryMap = new MemoryMap();
    this.cpu = new Cpu(this.memoryMap);
    this.gpu = new Ppu(this.memoryMap, canvas);
    this.gpu.tick();
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

    this.animationFrameRequest = requestAnimationFrame(this.update);
  }
}
