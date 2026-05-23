<script lang="ts">
  import AsciiBackground from '$lib/components/AsciiBackground.svelte';
  import PhotoCarousel from '$lib/components/PhotoCarousel.svelte';
  import { profile } from '$lib/data/profile';
</script>

<section id="hero" class="relative w-full min-h-[520px] md:min-h-[620px] py-20 md:py-32 overflow-hidden">
  <AsciiBackground opacity={0.55} class="absolute inset-0" />

  <div class="relative z-10 mx-auto max-w-6xl px-6">
    <div class="grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-16 items-center">
      <!-- Left: text -->
      <div class="space-y-6">
        <div class="space-y-4">
          <h1 class="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-[var(--color-text)] leading-[1.1]">
            Hi, I'm <span class="text-[var(--color-azure)]">Leo Joseph</span>
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
            class="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--color-azure)] px-6 text-sm font-semibold text-[var(--color-bg)] hover:bg-[var(--color-azure-dim)] transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            class="inline-flex h-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-6 text-sm font-semibold text-[var(--color-text)] hover:border-[var(--color-azure)]/40 hover:text-[var(--color-azure)] transition-colors"
          >
            Contact Me
          </a>
        </div>

        <p class="font-mono text-xs text-[var(--color-muted)] flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-[var(--color-azure)] motion-safe:animate-pulse"></span>
          {profile.role} · {profile.location}
        </p>
      </div>

      <!-- Right: photo carousel -->
      <div class="relative h-[300px] sm:h-[360px] lg:h-[500px] w-full">
        <PhotoCarousel />
      </div>
    </div>
  </div>
</section>
