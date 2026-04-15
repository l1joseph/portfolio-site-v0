<script lang="ts">
  import { fade } from 'svelte/transition';

  // Auto-discover all photos in the assets/photos directory at build time
  const modules = import.meta.glob('../assets/photos/*.{png,jpg,jpeg,webp,JPG,JPEG,PNG}', {
    eager: true,
    import: 'default'
  });
  let photos = Object.values(modules) as string[];

  // Shuffle on load
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photos[i], photos[j]] = [photos[j], photos[i]];
  }

  let currentIndex = $state(0);
  let paused = $state(false);
  let reducedMotion = $state(false);

  $effect(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || photos.length <= 1) return;

    const interval = setInterval(() => {
      if (!paused) currentIndex = (currentIndex + 1) % photos.length;
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

{#if photos.length === 0}
  <!-- Placeholder when no photos present -->
  <div class="w-full h-full rounded-xl bg-[var(--color-bg-elev)] border border-[var(--color-border)] flex items-center justify-center">
    <span class="font-mono text-[var(--color-muted)] text-sm">LJ</span>
  </div>
{:else}
  <div
    class="relative w-full h-full overflow-hidden rounded-xl"
    onmouseenter={() => (paused = true)}
    onmouseleave={() => (paused = false)}
    role="img"
    aria-label="Photo of Leo Joseph"
  >
    {#key currentIndex}
      <img
        src={photos[currentIndex]}
        alt="Leo Joseph"
        in:fade={{ duration: 800 }}
        class="absolute inset-0 w-full h-full object-cover"
        loading={currentIndex === 0 ? 'eager' : 'lazy'}
      />
    {/key}

    <!-- Subtle amber ring on hover -->
    <div class="absolute inset-0 rounded-xl ring-1 ring-[var(--color-amber)]/0 hover:ring-[var(--color-amber)]/30 transition-all pointer-events-none"></div>

    <!-- Dot indicators -->
    {#if photos.length > 1 && !reducedMotion}
      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {#each photos as _, i}
          <button
            onclick={() => (currentIndex = i)}
            aria-label="Photo {i + 1}"
            class="w-1.5 h-1.5 rounded-full transition-all {i === currentIndex ? 'bg-[var(--color-amber)] w-3' : 'bg-white/40'}"
          ></button>
        {/each}
      </div>
    {/if}
  </div>
{/if}
