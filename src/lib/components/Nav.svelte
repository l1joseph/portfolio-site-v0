<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
  import SocialLinks from './SocialLinks.svelte';

  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  let menuOpen = $state(false);
</script>

<header
  class="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm"
>
  <div class="mx-auto max-w-6xl px-6 flex h-14 items-center justify-between">
    <!-- Logo -->
    <a href="#hero" class="font-mono text-lg font-bold text-[var(--color-azure)] tracking-tight hover:opacity-80 transition-opacity">
      LJ
    </a>

    <!-- Nav links (desktop) -->
    <nav class="hidden sm:flex items-center gap-6 text-sm" aria-label="Main navigation">
      {#each navLinks as { href, label }}
        <a
          {href}
          class="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors font-medium"
        >
          {label}
        </a>
      {/each}
    </nav>

    <!-- Right: hamburger (mobile) + socials + theme toggle -->
    <div class="flex items-center gap-1">
      <button
        onclick={() => menuOpen = !menuOpen}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        class="sm:hidden p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          {#if menuOpen}
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          {:else}
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          {/if}
        </svg>
      </button>
      <SocialLinks size={18} class="hidden sm:flex" />
      <ThemeToggle />
    </div>
  </div>

  {#if menuOpen}
    <nav aria-label="Mobile navigation" class="sm:hidden border-t border-[var(--color-border)] px-6 py-4 flex flex-col gap-4 text-sm bg-[var(--color-bg)]">
      {#each navLinks as { href, label }}
        <a
          {href}
          onclick={() => menuOpen = false}
          class="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors font-medium"
        >
          {label}
        </a>
      {/each}
    </nav>
  {/if}
</header>
