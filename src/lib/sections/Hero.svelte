<script lang="ts">
  import PhotoCarousel from '$lib/components/PhotoCarousel.svelte';
  import { profile } from '$lib/data/profile';
</script>

<section id="hero" class="relative w-full py-20 md:py-32 grid-backdrop overflow-hidden">
  <div class="mx-auto max-w-6xl px-6">
    <div class="grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-16 items-center">
      <!-- Left: text -->
      <div class="space-y-6">
        <div class="space-y-4">
          <h1 class="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-[var(--color-text)] leading-[1.1]">
            Hi, I'm <span class="text-[var(--color-amber)]">Leo Joseph</span>
          </h1>
          <p class="max-w-xl text-[var(--color-muted)] text-lg leading-relaxed">
            {profile.tagline}
          </p>
          <p class="max-w-xl text-[var(--color-muted)] text-base leading-relaxed">
            {profile.personal}
          </p>
        </div>

        <div class="flex flex-col gap-3 min-[400px]:flex-row">
          <a
            href="#projects"
            class="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--color-amber)] px-6 text-sm font-semibold text-[var(--color-bg)] hover:bg-[var(--color-amber-dim)] transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            class="inline-flex h-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-6 text-sm font-semibold text-[var(--color-text)] hover:border-[var(--color-amber)]/40 hover:text-[var(--color-amber)] transition-colors"
          >
            Contact Me
          </a>
        </div>

        <!-- Role badge -->
        <p class="font-mono text-xs text-[var(--color-muted)] flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-[var(--color-amber)] animate-pulse"></span>
          {profile.role} · {profile.location}
        </p>
      </div>

      <!-- Right: photo carousel -->
      <div class="relative h-[380px] sm:h-[440px] lg:h-[500px] w-full">
        <PhotoCarousel />
      </div>
    </div>
  </div>
</section>
