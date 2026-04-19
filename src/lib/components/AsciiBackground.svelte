<script lang="ts">
  import { RippleField } from '$lib/ascii/rippleField.js';
  import {
    buildWidthMap,
    sampleLuminanceGrid,
    mapLuminanceToChar,
    DEFAULT_RAMP
  } from '$lib/ascii/asciiize.js';

  interface Props {
    photo?: string;        // omit for procedural sine-wave fill
    opacity?: number;      // overall alpha multiplier, default 1
    color?: string;        // override ASCII char color (CSS color string)
    font?: 'proportional' | 'mono';
    fontSize?: number;
    lineHeight?: number;
    ramp?: string;
    maskSelector?: string; // CSS selector for element whose text shape to cut out of ASCII
    class?: string;
  }

  let {
    photo = '',
    opacity = 1,
    color = '',
    font = 'proportional',
    fontSize = 10,
    lineHeight = 12,
    ramp = DEFAULT_RAMP,
    maskSelector = '',
    class: klass = ''
  }: Props = $props();

  interface Cell {
    char: string;
    bx: number;
    by: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    lum: number;
  }

  const photoModules = import.meta.glob<string>(
    '../assets/photos/*.{png,jpg,jpeg,webp,JPG,JPEG,PNG}',
    { eager: true, import: 'default' }
  );

  function resolvePhoto(name: string): string {
    return (
      Object.entries(photoModules).find(([k]) => k.includes(name))?.[1] ??
      Object.values(photoModules)[0] ??
      ''
    );
  }

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;

  $effect(() => {
    const _photo = photo;
    const _opacity = opacity;
    const _color = color;
    const _font = font;
    const _fontSize = fontSize;
    const _lineHeight = lineHeight;
    const _ramp = ramp;
    const _maskSelector = maskSelector;

    let alive = true;
    let rafId = 0;
    let field: RippleField | null = null;
    let cells: Cell[] = [];
    let ctx: CanvasRenderingContext2D | null = null;
    let canvasW = 0;
    let canvasH = 0;
    let themeColor = '';
    let needsRecolor = false;
    let lastPt: { x: number; y: number } | null = null;
    let lastTime = 0;
    let accumulator = 0;
    let ready = false;
    let setupSeq = 0;
    let maskFont = '';
    let maskText = '';
    let maskX = 0;
    let maskBaseline = 0;

    const RIPPLE_FORCE = 24000;
    const SPRING = 12;
    const DAMPING = 15;
    const DRAG_RADIUS = 28;
    const DRAG_STRENGTH = 0.38;
    const DROP_RADIUS = 52;
    const DROP_STRENGTH = 1.6;
    const DRAG_MIN_PX = 3;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const staticMode = reducedMotion;

    const fontSpec =
      _font === 'mono'
        ? `${_fontSize}px "Space Mono", monospace`
        : `${_fontSize}px "Bricolage Grotesque Variable", ui-sans-serif, sans-serif`;

    function readThemeColor(): string {
      if (_color) return _color;
      return (
        getComputedStyle(document.documentElement).getPropertyValue('--color-amber').trim() ||
        'hsl(198, 70%, 48%)'
      );
    }

    function inContainer(ex: number, ey: number): boolean {
      const r = container.getBoundingClientRect();
      return ex >= r.left && ex <= r.right && ey >= r.top && ey <= r.bottom;
    }

    function toLocal(ex: number, ey: number): { x: number; y: number } {
      const r = container.getBoundingClientRect();
      return { x: ex - r.left, y: ey - r.top };
    }

    const themeObs = new MutationObserver(() => { needsRecolor = true; });
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    function render() {
      if (!ctx || cells.length === 0) return;
      if (needsRecolor) { themeColor = readThemeColor(); needsRecolor = false; }
      ctx.clearRect(0, 0, canvasW, canvasH);
      ctx.font = fontSpec;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = themeColor;
      for (const c of cells) {
        ctx.globalAlpha = (0.3 + c.lum * 0.7) * _opacity;
        ctx.fillText(c.char, c.x, c.y);
      }
      ctx.globalAlpha = 1;

      // Punch the letter shapes out of the ASCII layer — background shows through as a void
      if (maskText) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.font = maskFont;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = 'black';
        ctx.globalAlpha = 1;
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 8;
        ctx.fillText(maskText, maskX, maskBaseline);
        ctx.shadowBlur = 0;
        ctx.restore();
      }
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
        const dx = pos.x - lastPt.x;
        const dy = pos.y - lastPt.y;
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

    async function setup(w: number, h: number, seq: number) {
      await document.fonts.ready;
      if (!alive || seq !== setupSeq) return;

      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx = canvas.getContext('2d')!;
      ctx.scale(dpr, dpr);
      canvasW = w;
      canvasH = h;
      themeColor = readThemeColor();

      const widthMap = buildWidthMap(_ramp, fontSpec, _lineHeight);
      const allWidths = Object.values(widthMap).filter((v) => v > 0);
      const avgW = allWidths.reduce((a, b) => a + b, 0) / allWidths.length;
      const cols = Math.max(1, Math.floor(w / avgW));
      const rows = Math.max(1, Math.floor(h / _lineHeight));

      // Cache mask element position for render-time destination-out cutout
      maskFont = '';
      maskText = '';
      maskX = 0;
      maskBaseline = 0;
      if (_maskSelector) {
        const el = document.querySelector(_maskSelector) as HTMLElement | null;
        if (el && el.textContent?.trim()) {
          const cs = getComputedStyle(el);
          // Build a canvas-compatible font shorthand
          const fw = cs.fontWeight || '700';
          const fz = cs.fontSize || '60px';
          const ff = cs.fontFamily || '"Bricolage Grotesque Variable", sans-serif';
          maskFont = `${fw} ${fz} ${ff}`;
          maskText = el.textContent!.trim();
          const elRect = el.getBoundingClientRect();
          const cRect = container.getBoundingClientRect();
          maskX = elRect.left - cRect.left;
          // alphabetic baseline: ~78% of the way down the inline bounding box
          maskBaseline = elRect.top - cRect.top + elRect.height * 0.78;
        }
      }

      cells = [];

      if (_photo) {
        // Photo-driven ASCII art
        const img = await loadImage(resolvePhoto(_photo));
        if (!alive || seq !== setupSeq) return;
        const lum = sampleLuminanceGrid(img, cols, rows);
        for (let row = 0; row < rows; row++) {
          let x = 0;
          for (let col = 0; col < cols; col++) {
            const l = lum[row * cols + col];
            const ch = mapLuminanceToChar(l, _ramp);
            const cw = widthMap[ch] ?? avgW;
            if (ch === ' ') { x += cw; continue; }
            cells.push({ char: ch, bx: x, by: (row + 1) * _lineHeight, x, y: (row + 1) * _lineHeight, vx: 0, vy: 0, lum: l });
            x += cw;
          }
        }
      } else {
        // Procedural sine-wave fill — loops until row is visually full (avoids right-edge gap)
        for (let row = 0; row < rows; row++) {
          let x = 0;
          let col = 0;
          while (x < w) {
            const lum = 0.55 + 0.42 * Math.sin(col * 0.68 + 0.4) * Math.cos(row * 0.52 + 0.9);
            const ch = mapLuminanceToChar(lum, _ramp);
            const cw = widthMap[ch] ?? avgW;
            if (ch !== ' ') {
              cells.push({ char: ch, bx: x, by: (row + 1) * _lineHeight, x, y: (row + 1) * _lineHeight, vx: 0, vy: 0, lum });
            }
            x += cw;
            col++;
          }
        }
      }

      field = new RippleField(w, h, 18);
      ready = true;

      if (staticMode) {
        render();
      } else {
        lastTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    }

    const resizeObs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        cancelAnimationFrame(rafId);
        ready = false;
        cells = [];
        field = null;
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) { setupSeq++; setup(width, height, setupSeq); }
      }
    });
    resizeObs.observe(container);

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
        const dx = pos.x - lastPt.x;
        const dy = pos.y - lastPt.y;
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / DRAG_MIN_PX));
        for (let i = 1; i <= steps; i++) {
          field.disturb(lastPt.x + (dx * i) / steps, lastPt.y + (dy * i) / steps, DRAG_RADIUS, DRAG_STRENGTH);
        }
      }
      lastPt = pos;
    }

    function handleTouchEnd() { lastPt = null; }

    if (!staticMode) {
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
      if (!staticMode) {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointerup', handlePointerEnd);
        window.removeEventListener('pointerleave', handlePointerEnd);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      }
      cells = [];
      field = null;
    };
  });
</script>

<div bind:this={container} class="w-full h-full {klass}">
  <canvas bind:this={canvas} class="absolute inset-0 w-full h-full" aria-hidden="true"></canvas>
</div>
