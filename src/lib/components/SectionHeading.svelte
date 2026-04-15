<script lang="ts">
  let {
    eyebrow,
    title,
    subtitle = ''
  }: { eyebrow: string; title: string; subtitle?: string } = $props();
</script>

<div class="flex flex-col items-center text-center space-y-3 mb-12">
  <span class="font-mono text-xs uppercase tracking-widest text-[var(--color-amber)] px-3 py-1 rounded-full border border-[var(--color-amber)]/30 bg-[var(--color-amber)]/5">
    {eyebrow}
  </span>
  <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)]">
    {title}
  </h2>
  {#if subtitle}
    <p class="max-w-2xl text-[var(--color-muted)] text-lg leading-relaxed">
      {subtitle}
    </p>
  {/if}
</div>
