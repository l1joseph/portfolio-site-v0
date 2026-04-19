<script lang="ts">
  import { RippleField } from '$lib/ascii/rippleField.js';
  import { buildWidthMap, mapLuminanceToChar, DEFAULT_RAMP } from '$lib/ascii/asciiize.js';

  interface Props {
    text?: string;
    ramp?: string;
    class?: string;
  }

  let {
    text = 'LEO JOSEPH',
    ramp = DEFAULT_RAMP,
    class: klass = ''
  }: Props = $props();

  interface Cell {
    char: string;
    bx: number; by: number;
    x: number;  y: number;
    vx: number; vy: number;
    lum: number;
  }

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;

  $effect(() => {
    const _text = text;
    const _ramp  = ramp;

    let alive = true;
    let rafId = 0;
    let field: RippleField | null = null;
    let cells: Cell[] = [];
    let ctx: CanvasRenderingContext2D | null = null;
    let canvasW = 0, canvasH = 0;
    let themeColor = '';
    let needsRecolor = false;
    let lastPt: { x: number; y: number } | null = null;
    let lastTime = 0;
    let accumulator = 0;
    let ready = false;
    let setupSeq = 0;

    const RIPPLE_FORCE = 20000;
    const SPRING      = 14;
    const DAMPING     = 16;
    const DRAG_RADIUS = 26;
    const DRAG_STRENGTH = 0.4;
    const DROP_RADIUS = 50;
    const DROP_STRENGTH = 1.8;
    const DRAG_MIN_PX = 3;

    const FONT_SIZE   = 9;
    const LINE_HEIGHT = 11;
    // Measurement font — proportional so char widths vary
    const measureFont = `bold 120px "Bricolage Grotesque Variable", ui-sans-serif, sans-serif`;
    // Render font — monospace for the terminal look
    const renderFont  = `${FONT_SIZE}px "JetBrains Mono Variable", ui-monospace, monospace`;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function readColor(): string {
      return (
        getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() ||
        '#e4e4e7'
      );
    }

    function inContainer(ex: number, ey: number): boolean {
      const r = container.getBoundingClientRect();
      return ex >= r.left && ex <= r.right && ey >= r.top && ey <= r.bottom;
    }

    function toLocal(ex: number, ey: number) {
      const r = container.getBoundingClientRect();
      return { x: ex - r.left, y: ey - r.top };
    }

    const themeObs = new MutationObserver(() => { needsRecolor = true; });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    function render() {
      if (!ctx || cells.length === 0) return;
      if (needsRecolor) { themeColor = readColor(); needsRecolor = false; }
      ctx.clearRect(0, 0, canvasW, canvasH);
      ctx.font = renderFont;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = themeColor;
      for (const c of cells) {
        ctx.globalAlpha = (0.25 + c.lum * 0.75);
        ctx.fillText(c.char, c.x, c.y);
      }
      ctx.globalAlpha = 1;
    }

    function loop(now: number) {
      if (!alive || !ready) return;
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      accumulator += dt / 1000;

      let substeps = 0;
      while (accumulator >= 1 / 60 && substeps < 3) {
        field!.step();
        for (const c of cells) {
          const g = field!.gradientAt(c.x, c.y);
          const fx = -g.x * RIPPLE_FORCE + (c.bx - c.x) * SPRING - c.vx * DAMPING;
          const fy = -g.y * RIPPLE_FORCE + (c.by - c.y) * SPRING - c.vy * DAMPING;
          c.vx += fx / 60;
          c.vy += fy / 60;
          c.x += c.vx / 60;
          c.y += c.vy / 60;
        }
        accumulator -= 1 / 60;
        substeps++;
      }
      render();
      rafId = requestAnimationFrame(loop);
    }

    function handlePointerMove(e: PointerEvent) {
      if (!ready || !field || !inContainer(e.clientX, e.clientY)) { lastPt = null; return; }
      const pos = toLocal(e.clientX, e.clientY);
      if (lastPt) {
        const dx = pos.x - lastPt.x, dy = pos.y - lastPt.y;
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / DRAG_MIN_PX));
        for (let i = 1; i <= steps; i++) {
          field.disturb(lastPt.x + (dx * i) / steps, lastPt.y + (dy * i) / steps, DRAG_RADIUS, DRAG_STRENGTH);
        }
      }
      lastPt = pos;
    }

    function handlePointerDown(e: PointerEvent) {
      if (!ready || !field || !inContainer(e.clientX, e.clientY)) return;
      const pos = toLocal(e.clientX, e.clientY);
      field.disturb(pos.x, pos.y, DROP_RADIUS, DROP_STRENGTH);
      lastPt = pos;
    }

    function handlePointerEnd() { lastPt = null; }

    function handleTouchStart(e: TouchEvent) {
      if (!ready || !field) return;
      const t = e.touches[0];
      if (!inContainer(t.clientX, t.clientY)) return;
      const pos = toLocal(t.clientX, t.clientY);
      field.disturb(pos.x, pos.y, DROP_RADIUS, DROP_STRENGTH);
      lastPt = pos;
    }

    function handleTouchMove(e: TouchEvent) {
      if (!ready || !field) return;
      const t = e.touches[0];
      if (!inContainer(t.clientX, t.clientY)) { lastPt = null; return; }
      const pos = toLocal(t.clientX, t.clientY);
      if (lastPt) {
        const dx = pos.x - lastPt.x, dy = pos.y - lastPt.y;
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / DRAG_MIN_PX));
        for (let i = 1; i <= steps; i++) {
          field.disturb(lastPt.x + (dx * i) / steps, lastPt.y + (dy * i) / steps, DRAG_RADIUS, DRAG_STRENGTH);
        }
      }
      lastPt = pos;
    }

    function handleTouchEnd() { lastPt = null; }

    async function setup(w: number, h: number, seq: number) {
      await document.fonts.ready;
      if (!alive || seq !== setupSeq) return;

      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx = canvas.getContext('2d')!;
      ctx.scale(dpr, dpr);
      canvasW = w; canvasH = h;
      themeColor = readColor();

      // Build proportional width map
      const widthMap = buildWidthMap(_ramp + ' ', renderFont, LINE_HEIGHT);
      const allWidths = Object.values(widthMap).filter(v => v > 0);
      const avgW = allWidths.reduce((a, b) => a + b, 0) / allWidths.length;

      const cols = Math.max(1, Math.floor(w / avgW));
      const rows = Math.max(1, Math.floor(h / LINE_HEIGHT));

      // Draw text to a full-size off-screen canvas
      const textCanvas = document.createElement('canvas');
      textCanvas.width  = w;
      textCanvas.height = h;
      const textCtx = textCanvas.getContext('2d')!;
      textCtx.fillStyle = '#000';
      textCtx.fillRect(0, 0, w, h);
      textCtx.fillStyle = '#fff';
      textCtx.font = measureFont;
      textCtx.textAlign = 'center';
      textCtx.textBaseline = 'middle';
      // Scale font down if text wider than canvas
      const rawWidth = textCtx.measureText(_text).width;
      const scale = Math.min(1, (w * 0.92) / Math.max(rawWidth, 1));
      const fitFont = `bold ${Math.floor(120 * scale)}px "Bricolage Grotesque Variable", ui-sans-serif, sans-serif`;
      textCtx.font = fitFont;
      textCtx.fillText(_text, w / 2, h / 2);

      // Downsample to cols×rows — each pixel becomes area-averaged luminance for its grid cell
      const sampCanvas = document.createElement('canvas');
      sampCanvas.width  = cols;
      sampCanvas.height = rows;
      const sampCtx = sampCanvas.getContext('2d')!;
      sampCtx.drawImage(textCanvas, 0, 0, cols, rows);
      const { data } = sampCtx.getImageData(0, 0, cols, rows);

      cells = [];
      for (let row = 0; row < rows; row++) {
        let x = 0;
        for (let col = 0; col < cols; col++) {
          const o = (row * cols + col) * 4;
          const lum = 0.2126 * (data[o] / 255) + 0.7152 * (data[o + 1] / 255) + 0.0722 * (data[o + 2] / 255);

          if (lum < 0.04) { x += avgW; continue; }

          const ch = mapLuminanceToChar(1 - lum, _ramp);
          const cw = widthMap[ch] ?? avgW;
          if (ch !== ' ') {
            cells.push({ char: ch, bx: x, by: (row + 1) * LINE_HEIGHT, x, y: (row + 1) * LINE_HEIGHT, vx: 0, vy: 0, lum });
          }
          x += cw;
        }
      }

      field = new RippleField(w, h, 18);
      ready = true;

      if (reducedMotion) {
        render();
      } else {
        lastTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    }

    const resizeObs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        cancelAnimationFrame(rafId);
        ready = false; cells = []; field = null;
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) { setupSeq++; setup(width, height, setupSeq); }
      }
    });
    resizeObs.observe(container);

    if (!reducedMotion) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointerup', handlePointerEnd);
      window.addEventListener('pointerleave', handlePointerEnd);
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      themeObs.disconnect();
      resizeObs.disconnect();
      if (!reducedMotion) {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointerup', handlePointerEnd);
        window.removeEventListener('pointerleave', handlePointerEnd);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      }
      cells = []; field = null;
    };
  });
</script>

<div bind:this={container} class="w-full h-full {klass}">
  <canvas bind:this={canvas} class="w-full h-full" aria-label="LEO JOSEPH — ASCII art banner"></canvas>
</div>
