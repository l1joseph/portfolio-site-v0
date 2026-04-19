<script lang="ts">
  import AsciiNameBanner from '$lib/components/terminal/AsciiNameBanner.svelte';
  import BlinkingCursor from '$lib/components/terminal/BlinkingCursor.svelte';
  import Typewriter from '$lib/components/terminal/Typewriter.svelte';
  import { profile } from '$lib/data/profile';
</script>

<section id="hero" class="w-full py-16 md:py-20">
  <div class="mx-auto max-w-[680px] px-6">

    <!-- ASCII name banner -->
    <div class="w-full h-[100px] sm:h-[130px] mb-8">
      <AsciiNameBanner text="LEO JOSEPH" />
    </div>

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
      <div class="mt-1 text-sm leading-relaxed text-[var(--color-muted)] max-w-[560px]">
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
    </div>

    <!-- trailing prompt with cursor -->
    <div class="flex items-baseline gap-0">
      <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
      <span class="ml-2"><BlinkingCursor /></span>
    </div>

  </div>
</section>
