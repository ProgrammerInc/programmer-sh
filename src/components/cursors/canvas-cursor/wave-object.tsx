import { WaveOptions } from './canvas-cursor.types';

export class WaveObject {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  private eValue: number = 0;

  constructor(options: WaveOptions) {
    this.init(options);
  }

  init(options: WaveOptions): void {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
  }

  update(): number {
    this.phase += this.frequency;
    this.eValue = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.eValue;
  }

  value(): number {
    return this.eValue;
  }
}
