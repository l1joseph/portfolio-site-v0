<script lang="ts">
  import type { Project } from '$lib/data/projects';

  let { project }: { project: Project } = $props();

  let cardEl: HTMLElement;
  // null = show real description; string = show decode override
  let descOverride = $state<string | null>(null);
  let decoded = false;

  // C — scramble description into ASCII noise, decode into real text on scroll into view
  $effect(() => {
    const el = cardEl;
    if (!el || decoded) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const CHARS = '#@%=+*-:.^~';
    const text = project.description;
    let rafId = 0;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();

      let frame = 0;
      const FRAMES = 50;

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
    }, { threshold: 0.05 });

    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(rafId); };
  });
</script>

<article
  bind:this={cardEl}
  class="group relative flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-all duration-200 hover:border-[var(--color-amber)]/40 hover:shadow-lg hover:-translate-y-0.5"
>
  <!-- Amber top accent on hover -->
  <div class="absolute inset-x-0 top-0 h-[2px] rounded-t-xl bg-[var(--color-amber)] opacity-0 group-hover:opacity-100 transition-opacity"></div>

  {#if project.featured}
    <span class="mb-3 self-start font-mono text-[10px] uppercase tracking-widest text-[var(--color-amber)] px-2 py-0.5 rounded border border-[var(--color-amber)]/30 bg-[var(--color-amber)]/5">
      Featured
    </span>
  {/if}

  <h3 class="text-lg font-semibold text-[var(--color-text)] mb-1">{project.displayName}</h3>

  <p class="font-mono text-xs text-[var(--color-amber)] mb-3 leading-relaxed">{project.metric}</p>

  <p class="text-sm text-[var(--color-muted)] leading-relaxed flex-1">{descOverride ?? project.description}</p>

  <div class="mt-4 flex flex-wrap gap-1.5">
    {#each project.tags as tag}
      <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-[var(--color-bg-elev)] text-[var(--color-muted)] border border-[var(--color-border)]">
        {tag}
      </span>
    {/each}
  </div>

  <a
    href={project.repo}
    target="_blank"
    rel="noopener noreferrer"
    class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-cobalt-lit)] hover:text-[var(--color-amber)] transition-colors"
  >
    View on GitHub
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M7 7h10v10M7 17 17 7"/>
    </svg>
  </a>
</article>
