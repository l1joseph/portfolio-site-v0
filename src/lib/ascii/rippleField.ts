export class RippleField {
  private cols: number;
  private rows: number;
  readonly cellSize: number;
  private heights: Float32Array;
  private velocities: Float32Array;
  private nextHeights: Float32Array;

  constructor(width: number, height: number, cellSize = 18) {
    this.cellSize = cellSize;
    // +2 gives a 1-cell absorbing border on each side — border cells stay 0
    this.cols = Math.ceil(width / cellSize) + 2;
    this.rows = Math.ceil(height / cellSize) + 2;
    const n = this.cols * this.rows;
    this.heights = new Float32Array(n);
    this.velocities = new Float32Array(n);
    this.nextHeights = new Float32Array(n);
  }

  // 5-point Laplacian wave solver — ported from jeantimex/ripples
  step(): void {
    const { cols, rows } = this;
    const h = this.heights;
    const v = this.velocities;
    const nh = this.nextHeights;

    for (let r = 1; r < rows - 1; r++) {
      for (let c = 1; c < cols - 1; c++) {
        const i = r * cols + c;
        const avg = (h[i - 1] + h[i + 1] + h[i - cols] + h[i + cols]) * 0.25;
        v[i] += (avg - h[i]) * 0.3;
        v[i] *= 0.985;
        nh[i] = h[i] + v[i];
      }
    }

    // Swap height buffers; velocities persist
    this.heights = nh;
    this.nextHeights = h;
  }

  // Hann bump disturbance centred at (px, py) in viewport pixels
  disturb(px: number, py: number, radius: number, strength: number): void {
    const { cellSize, cols, rows } = this;
    const cx = px / cellSize + 1;
    const cy = py / cellSize + 1;
    const rCells = radius / cellSize;
    const c0 = Math.max(1, Math.floor(cx - rCells));
    const c1 = Math.min(cols - 2, Math.ceil(cx + rCells));
    const r0 = Math.max(1, Math.floor(cy - rCells));
    const r1 = Math.min(rows - 2, Math.ceil(cy + rCells));
    const h = this.heights;

    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const dist = Math.sqrt((c - cx) ** 2 + (r - cy) ** 2);
        if (dist <= rCells) {
          const norm = 1 - dist / rCells; // 1 at centre, 0 at edge
          h[r * cols + c] += (0.5 - Math.cos(norm * Math.PI) * 0.5) * strength;
        }
      }
    }
  }

  // Central-difference gradient at viewport coords (px, py)
  gradientAt(px: number, py: number): { x: number; y: number } {
    const { cellSize, cols, rows } = this;
    const h = this.heights;
    const c = Math.max(2, Math.min(cols - 3, Math.round(px / cellSize + 1)));
    const r = Math.max(2, Math.min(rows - 3, Math.round(py / cellSize + 1)));
    const span = 2 * cellSize;
    return {
      x: (h[r * cols + c + 1] - h[r * cols + c - 1]) / span,
      y: (h[(r + 1) * cols + c] - h[(r - 1) * cols + c]) / span
    };
  }
}
