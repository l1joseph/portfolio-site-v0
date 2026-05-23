<script lang="ts">
  import AsciiNameBanner from '$lib/components/terminal/AsciiNameBanner.svelte';
  import Shell from '$lib/components/terminal/Shell.svelte';
  import Typewriter from '$lib/components/terminal/Typewriter.svelte';
  import { profile } from '$lib/data/profile';

  const photoModules = import.meta.glob('$lib/assets/photos/*.{png,jpg,jpeg,webp,JPG,JPEG,PNG,HEIC}', { eager: true }) as Record<string, { default: string }>;
  const photos = Object.values(photoModules).map(m => m.default);

  function objectPosition(src: string): string {
    if (src.includes('Leo_softHRD_BE_Day')) return 'left center';
    return 'center';
  }

  let current = $state(0);

  $effect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => { current = (current + 1) % photos.length; }, 3500);
    return () => clearInterval(id);
  });
</script>

<section id="hero" class="w-full py-16 md:py-20">
  <div class="px-6">

    <!-- ASCII name banner — always full width -->
    <div class="w-full h-[110px] sm:h-[180px] mb-8">
      <AsciiNameBanner text="LEO JOSEPH" />
    </div>

    <!-- Portrait: photo sits between banner and text -->
    {#if photos.length > 0}
      <div class="md:hidden mb-6 w-40 sm:w-48 mx-auto">
        <div class="relative overflow-hidden" style="aspect-ratio: 3/4;">
          {#each photos as src, i}
            <img
              {src}
              alt="Leo Joseph"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style="opacity: {i === current ? 1 : 0}; filter: grayscale(100%) sepia(15%) hue-rotate(190deg) saturate(250%) contrast(1.05); object-position: {objectPosition(src)};"
            />
          {/each}
        </div>
      </div>
    {/if}

    <!-- Landscape: text left, photo right -->
    <div class="flex gap-10 items-start">

      <div class="flex-1 min-w-0">

        <!-- whoami -->
        <div class="mb-5">
          <div class="flex flex-wrap items-baseline gap-0">
            <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
            <span class="text-[var(--color-text)] ml-2">
              <Typewriter text="whoami" trigger="mount" speed={40} />
            </span>
          </div>
          <div class="mt-1 text-sm">
            <span class="text-[var(--color-text)]">{profile.name}</span>
            <span class="text-[var(--color-muted)]"> — {profile.role}</span>
          </div>
        </div>

        <!-- tagline -->
        <div class="mb-5">
          <div class="flex flex-wrap items-baseline gap-0">
            <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
            <span class="text-[var(--color-muted)] ml-2 text-sm">cat tagline.txt</span>
          </div>
          <div class="mt-1 pl-2 text-sm leading-relaxed text-[var(--color-muted)] max-w-[560px]">
            <p>{profile.tagline}</p>
            <p class="mt-2">{profile.personal}</p>
          </div>
        </div>

        <!-- location -->
        <div class="mb-5">
          <div class="flex flex-wrap items-baseline gap-0">
            <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
            <span class="text-[var(--color-muted)] ml-2 text-sm">echo $LOCATION</span>
          </div>
          <div class="mt-1 text-sm text-[var(--color-muted)]">{profile.location}</div>
        </div>

        <!-- ls navigation -->
        <div class="mb-6">
          <div class="flex flex-wrap items-baseline gap-0">
            <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
            <span class="text-[var(--color-muted)] ml-2 text-sm">ls</span>
          </div>
          <div class="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {#each [['projects', '#projects'], ['publications', '#publications'], ['skills', '#skills'], ['about', '#about'], ['contact', '#contact']] as [label, href]}
              <a {href} class="text-[var(--color-accent)] hover:underline underline-offset-4 decoration-[var(--color-accent)]">
                {label}/
              </a>
            {/each}
          </div>
          <div class="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {#each [['github', profile.socials.github], ['linkedin', profile.socials.linkedin], ['scholar', profile.socials.scholar]] as [label, href]}
              <a {href} target="_blank" rel="noopener noreferrer" class="text-[var(--color-accent)] hover:underline underline-offset-4 decoration-[var(--color-accent)]">
                {label}<span class="text-[var(--color-muted)] text-xs ml-0.5">[ext]</span>
              </a>
            {/each}
          </div>
        </div>

        <!-- interactive shell -->
        <Shell />

      </div>

      <!-- Landscape photo panel -->
      {#if photos.length > 0}
        <div class="hidden md:block shrink-0 w-48 lg:w-56 mr-0 xl:mr-[15%]">
          <div class="relative overflow-hidden" style="aspect-ratio: 3/4;">
            {#each photos as src, i}
              <img
                {src}
                alt="Leo Joseph"
                class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style="opacity: {i === current ? 1 : 0}; filter: grayscale(100%) sepia(15%) hue-rotate(190deg) saturate(250%) contrast(1.05); object-position: {objectPosition(src)};"
              />
            {/each}
          </div>
        </div>
      {/if}

    </div>
  </div>
</section>
