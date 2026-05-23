<script lang="ts">
  import type { Project } from '$lib/data/projects';

  let { project, index }: { project: Project; index: number } = $props();

  let lineEl: HTMLDivElement;
  let descOverride = $state<string | null>(null);
  let decoded = false;

  $effect(() => {
    const el = lineEl;
    if (!el || decoded) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const CHARS = '#@%=+*-:.^~';
    const text = project.description;
    let rafId = 0;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();

      let frame = 0;
      const FRAMES = 40;

      function tick() {
        frame++;
        const t = frame / FRAMES;
        const revealed = Math.floor(t * t * text.length);
        if (revealed >= text.length) {
          descOverride = null;
          decoded = true;
          return;
        }
        let out = '';
        for (let i = 0; i < text.length; i++) {
          if (i < revealed || text[i] === ' ') out += text[i];
          else out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        descOverride = out;
        rafId = requestAnimationFrame(tick);
      }

      descOverride = text.split('').map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
      rafId = requestAnimationFrame(tick);
    }, { threshold: 0.1 });

    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(rafId); };
  });
</script>

<div bind:this={lineEl} class="mb-5 group">
  <!-- Row line -->
  <div class="flex items-baseline gap-2 flex-wrap text-sm">
    <span class="text-[var(--color-muted)] select-none w-6 shrink-0">[{String(index + 1).padStart(2, '0')}]</span>
    {#if project.repo}
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        class="text-[var(--color-accent)] hover:underline underline-offset-4 font-medium shrink-0"
      >{project.displayName}</a>
    {:else}
      <span class="text-[var(--color-text)] font-medium shrink-0">{project.displayName}</span>
    {/if}
    <span class="text-[var(--color-muted)] text-xs shrink-0">
      {project.tags.slice(0, 2).join(' · ')}
    </span>
    <span class="ml-auto text-[var(--color-muted)] text-xs shrink-0 hidden sm:inline">
      {project.metric}
    </span>
    {#if project.repo}
      <a href={project.repo} target="_blank" rel="noopener noreferrer" class="text-[var(--color-accent)] text-xs shrink-0" aria-label="GitHub">↗</a>
    {:else}
      <span class="text-[var(--color-border)] text-xs shrink-0">·</span>
    {/if}
  </div>
  <!-- Description line (decode on scroll) -->
  <div class="mt-0.5 pl-8 text-xs text-[var(--color-muted)] leading-relaxed">
    <span class="text-[var(--color-border)] select-none">↳ </span>{descOverride ?? project.description}
  </div>
  <!-- Mobile metric (truncate to first stat before · or () -->
  <div class="mt-0.5 pl-8 text-xs text-[var(--color-muted)] sm:hidden">
    {project.metric.split(/\s+[·(]/)[0]}
  </div>
</div>
