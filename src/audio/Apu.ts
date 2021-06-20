import { CORE_CLOCK } from '../core/constants';
import MemoryMap from '../memory/MemoryMap';
import Channel from './Channel';

// APU clock = 512Hz, Main clock = 4.19GHz, Factor = 8192
const CLOCK_FACTOR = CORE_CLOCK / 512;

/**
 * Class for emulating the Audio Processing Unit (APU)
 */
export default class Apu {
  private memoryMap: MemoryMap;
  private audioCtx: AudioContext;
  private channel1: Channel;
  private channel2: Channel;

  private clockOffset: number = 0;

  constructor(memoryMap: MemoryMap) {
    this.memoryMap = memoryMap;
    this.audioCtx = new AudioContext();

    this.channel1 = new Channel(this.audioCtx);
    this.channel2 = new Channel(this.audioCtx);
  }

  /**
   * Run one clock cycle of the APU
   */
  public tick() {
    // Scale the APU clock to the core clock
    this.clockOffset -= 1;
    if (this.clockOffset > 0) {
      return;
    }

    this.updateChannel1();
    this.updateChannel2();
    // TODO: Handle Channel 3 and 4 (Wave and Noise)

    this.clockOffset = CLOCK_FACTOR;
  }

  /**
   * Pause audio output
   */
  public pause(): Promise<void> {
    return this.audioCtx.suspend();
  }

  /**
   * Resume audio output
   */
  public resume(): Promise<void> {
    this.channel1.setVolume(0.5);
    this.channel1.start();

    this.channel2.setVolume(0.5);
    this.channel2.start();

    return this.audioCtx.resume();
  }

  /**
   * Update the output on channel 1
   */
  private updateChannel1(): void {
    const details = this.getChannelDetails(0xff10);
    this.channel1.setFrequency(details.frequency);
    // TODO: Sweep, envelope, length countdown
    // Length counter @ 256Hz (1/2 APU clock)
    // Sweep @ 128Hz (1/4 APU clock)
    // Volume envelope 64Hz (1/8 APU clock)
  }

  /**
   * Update the output on channel 2
   */
  private updateChannel2(): void {
    const details = this.getChannelDetails(0xff15);
    this.channel2.setFrequency(details.frequency);
    // TODO: Envelope, length countdown
    // Length counter @ 256Hz (1/2 APU clock)
    // Volume envelope 64Hz (1/8 APU clock)
  }

  /**
   * Get audio channel details from memory
   * @param offset The memory offset to read details from
   */
  private getChannelDetails(offset: number) {
    // Sweep adjusts freq
    // Envelope adjust volume
    // NR10 (Not used on NR20)
    const sweep = this.memoryMap.read8(offset);
    // NR11/21
    const dutyAndLength = this.memoryMap.read8(offset + 1);
    // NR12/22
    const envelope = this.memoryMap.read8(offset + 2);
    // NR13/23
    const freqLowBits = this.memoryMap.read8(offset + 3);
    // NR14/24
    const freqHighBitsAndDetails = this.memoryMap.read8(offset + 4);

    const sweepTime = (sweep & 0x70) >> 4;
    const sweepDirection = (sweep & 0x08) >> 3;
    const sweepShift = sweep & 0x07;

    const duty = (dutyAndLength & 0xc0) >> 6;
    const length = dutyAndLength & 0x3f;

    const envelopeInitialVolume = (envelope & 0xf0) >> 4;
    const envelopeDirection = (envelope & 0x08) >> 3;
    const envelopePeriod = envelope & 0x07;

    const restartSound = (freqHighBitsAndDetails & 0x80) >> 7;
    const lengthEnabled = (freqHighBitsAndDetails & 0x40) >> 6;

    // Frequency is stored in 11 bit, across NR13/23 and NR14/24 bits 0-3
    const freqHighBits = freqHighBitsAndDetails & 0x07;
    const freq11Bits = freqLowBits | (freqHighBits << 8);
    const frequency = CORE_CLOCK / ((2048 - freq11Bits) << 5);

    return {
      sweepTime,
      sweepDirection,
      sweepShift,

      duty,
      length,
      lengthSeconds: (64 - length) * (1 / 256),

      envelopeInitialVolume,
      envelopeDirection,
      envelopePeriod,

      frequency,
      restartSound,
      lengthEnabled,
    };
  }
}
