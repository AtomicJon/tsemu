/**
 * Class representing an audio channel
 */
export default class Channel {
  private audioCtx: AudioContext;
  private volume: number = 0;
  private isStarted: boolean = false;

  private oscillatorNode: OscillatorNode;
  private gainNode: GainNode;

  public isMuted: boolean = false;

  constructor(audioCtx: AudioContext, output: AudioNode) {
    this.audioCtx = audioCtx;

    this.gainNode = audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(this.volume, audioCtx.currentTime);
    this.gainNode.connect(output);

    this.oscillatorNode = audioCtx.createOscillator();
    this.oscillatorNode.type = 'square';
    this.oscillatorNode.connect(this.gainNode);

    // TODO: Create periodic waves for different square waves with duty cycle other than 50%
    // this.periodicWave = audioCtx.createPeriodicWave(
    //   sineWave.real,
    //   sineWave.imag
    // );
  }

  /**
   * Start the channel
   */
  public start(): void {
    if (!this.isStarted) {
      this.oscillatorNode.start();
      this.isStarted = true;
    }
  }

  /**
   * Set the frequency of the underlying oscillator
   * @param frequency The frequency to set
   */
  public setFrequency(frequency: number): void {
    this.oscillatorNode.frequency.setValueAtTime(
      frequency,
      this.audioCtx.currentTime,
    );
  }

  /**
   * Set the volume of the channel
   * @param volume Volume level (0 - 1)
   */
  public setVolume(volume: number): void {
    this.volume = volume;
    this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);

    this.isMuted = volume === 0;
  }

  /**
   * Get the current volume of the channel
   * @returns The volume
   */
  public getVolume(): number {
    return this.volume;
  }

  /**
   * Mute the channel
   */
  public mute(): void {
    this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    this.isMuted = true;
  }

  /**
   * Unmute the channel
   */
  public unmute(): void {
    if (this.volume === 0) {
      this.volume = 1;
    }
    this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    this.isMuted = false;
  }
}
