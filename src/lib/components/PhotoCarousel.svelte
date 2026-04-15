<script lang="ts">
  import { fade } from 'svelte/transition';

  type Photo = { url: string; position: string };

  const modules = import.meta.glob('../assets/photos/*.{png,jpg,jpeg,webp,JPG,JPEG,PNG}', {
    eager: true,
    import: 'default'
  });

  // Keep discovered order (deterministic), map filename → object-position
  const photos: Photo[] = Object.entries(modules).map(([path, url]) => ({
    url: url as string,
    position: path.toLowerCase().includes('softhrd') ? 'left center' : 'center center'
  }));

  let currentIndex = $state(0);
  let paused = $state(false);
  let reducedMotion = $state(false);

  function advance() {
    currentIndex = (currentIndex + 1) % photos.length;
  }

  $effect(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || photos.length <= 1) return;

    const interval = setInterval(() => {
      if (!paused) advance();
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

{#if photos.length === 0}
  <div class="w-full h-full rounded-xl bg-[var(--color-bg-elev)] border border-[var(--color-border)] flex items-center justify-center">
    <span class="font-mono text-[var(--color-muted)] text-sm">LJ</span>
  </div>
{:else}
  <div
    class="relative w-full h-full overflow-hidden rounded-xl cursor-pointer"
    onclick={advance}
    onmouseenter={() => (paused = true)}
    onmouseleave={() => (paused = false)}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') advance(); }}
    role="button"
    tabindex="0"
    aria-label="Photo of Leo Joseph — click to see next"
  >
    {#key currentIndex}
      <img
        src={photos[currentIndex].url}
        alt="Leo Joseph"
        in:fade={{ duration: 600 }}
        class="absolute inset-0 w-full h-full object-cover"
        style="object-position: {photos[currentIndex].position}"
        loading={currentIndex === 0 ? 'eager' : 'lazy'}
      />
    {/key}

    <!-- Ring on hover -->
    <div class="absolute inset-0 rounded-xl ring-1 ring-[var(--color-amber)]/0 hover:ring-[var(--color-amber)]/30 transition-all pointer-events-none"></div>

    <!-- Dot indicators -->
    {#if photos.length > 1}
      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {#each photos as _, i}
          <button
            onclick={(e) => { e.stopPropagation(); currentIndex = i; }}
            aria-label="Photo {i + 1}"
            class="h-1.5 rounded-full transition-all {i === currentIndex ? 'bg-[var(--color-amber)] w-3' : 'bg-white/40 w-1.5'}"
          ></button>
        {/each}
      </div>
    {/if}
  </div>
{/if}
