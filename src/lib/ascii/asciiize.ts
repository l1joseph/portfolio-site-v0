import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

export const DEFAULT_RAMP = ' .:-=+*#%@';

/** Maps luminance 0..1 to a character. 0 = black → dense; 1 = white → sparse. */
export function mapLuminanceToChar(l: number, ramp: string): string {
  const idx = Math.round((1 - l) * (ramp.length - 1));
  return ramp[Math.max(0, Math.min(ramp.length - 1, idx))];
}

/**
 * Measures each ramp character's exact advance width via pretext, enabling
 * proportional-font ASCII art where each glyph steps by its true width.
 * Must be called after document.fonts.ready so webfonts are available.
 */
export function buildWidthMap(
  ramp: string,
  fontSpec: string,
  lineHeight: number
): Record<string, number> {
  const map: Record<string, number> = {};
  for (const ch of new Set(ramp)) {
    try {
      const prep = prepareWithSegments(ch, fontSpec);
      const { lines } = layoutWithLines(prep, 9999, lineHeight);
      map[ch] = lines[0]?.width ?? 8;
    } catch {
      map[ch] = 8;
    }
  }
  return map;
}

/** Center-crops img onto a cols×rows offscreen canvas and returns contrast-stretched luminance (0..1). */
export function sampleLuminanceGrid(
  img: HTMLImageElement,
  cols: number,
  rows: number
): Float32Array {
  const off = document.createElement('canvas');
  off.width = cols;
  off.height = rows;
  const ctx = off.getContext('2d')!;

  // Blur before downsampling — suppresses fine texture, reveals major shapes only
  ctx.filter = 'blur(1px)';
  const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
  const sw = img.naturalWidth * scale;
  const sh = img.naturalHeight * scale;
  ctx.drawImage(img, (cols - sw) / 2, (rows - sh) / 2, sw, sh);
  ctx.filter = 'none';

  const { data } = ctx.getImageData(0, 0, cols, rows);
  const raw = new Float32Array(cols * rows);
  for (let i = 0; i < raw.length; i++) {
    const o = i * 4;
    raw[i] =
      0.2126 * (data[o] / 255) +
      0.7152 * (data[o + 1] / 255) +
      0.0722 * (data[o + 2] / 255);
  }

  // Min-max stretch so the full ramp is always used
  let min = Infinity, max = -Infinity;
  for (const v of raw) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const range = max - min;

  const out = new Float32Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    const n = range > 0.05 ? (raw[i] - min) / range : raw[i];
    // Double-Hermite S-curve: pushes values hard toward extremes for crisp separation
    const h = n * n * (3 - 2 * n);
    out[i] = h * h * (3 - 2 * h);
  }

  return out;
}
