<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';

  const navLinks = [
    { href: '#projects',     label: 'projects' },
    { href: '#publications', label: 'publications' },
    { href: '#skills',       label: 'skills' },
    { href: '#about',        label: 'about' },
    { href: '#contact',      label: 'contact' }
  ];

  let menuOpen = $state(false);
</script>

<header class="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]">
  <div class="px-6 flex h-10 items-center justify-between text-sm">
    <a href="#hero" class="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
      ~/leo
    </a>

    <div class="flex items-center gap-4">
      <nav class="hidden sm:flex items-center gap-4" aria-label="Main navigation">
        {#each navLinks as { href, label }}
          <a
            {href}
            class="text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:underline underline-offset-4 transition-colors"
          >
            {label}
          </a>
        {/each}
      </nav>
      <button
        onclick={() => menuOpen = !menuOpen}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        class="sm:hidden p-1 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
      >
        {menuOpen ? '[x]' : '[=]'}
      </button>
      <ThemeToggle />
    </div>
  </div>

  {#if menuOpen}
    <nav aria-label="Mobile navigation" class="sm:hidden border-t border-[var(--color-border)] px-6 py-3 flex flex-col gap-3">
      {#each navLinks as { href, label }}
        <a
          {href}
          onclick={() => menuOpen = false}
          class="text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:underline underline-offset-4 transition-colors"
        >
          {label}
        </a>
      {/each}
    </nav>
  {/if}
</header>
