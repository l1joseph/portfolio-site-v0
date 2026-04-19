<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';

  const navLinks = [
    { href: '#projects',     label: 'projects' },
    { href: '#publications', label: 'publications' },
    { href: '#skills',       label: 'skills' },
    { href: '#about',        label: 'about' },
    { href: '#contact',      label: 'contact' }
  ];
</script>

<header class="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]">
  <div class="mx-auto max-w-[680px] px-6 flex h-10 items-center justify-between text-sm">
    <a href="#hero" class="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
      ~/leo
    </a>

    <nav class="hidden sm:flex items-center gap-4" aria-label="Main navigation">
      <span class="text-[var(--color-border)] select-none">·</span>
      {#each navLinks as { href, label }}
        <a
          {href}
          class="text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:underline underline-offset-4 transition-colors"
        >
          {label}
        </a>
      {/each}
    </nav>

    <ThemeToggle />
  </div>
</header>
