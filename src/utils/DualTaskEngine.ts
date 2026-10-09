export class DualTaskController {
  private timer: NodeJS.Timeout | null = null;
  private onCueCallback: () => void;
  private minIntervalMs: number;
  private maxIntervalMs: number;

  constructor(onCue: () => void, minMs = 2000, maxMs = 4000) {
    this.onCueCallback = onCue;
    this.minIntervalMs = minMs;
    this.maxIntervalMs = maxMs;
  }

  public start() {
    this.scheduleNext();
  }

  public stop() {
    if (this.timer) clearTimeout(this.timer);
  }

  private scheduleNext() {
    const delay = Math.random() * (this.maxIntervalMs - this.minIntervalMs) + this.minIntervalMs;
    this.timer = setTimeout(() => {
      this.onCueCallback();
      this.scheduleNext();
    }, delay);
  }
}
