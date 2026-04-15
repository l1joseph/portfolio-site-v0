<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
  import SocialLinks from './SocialLinks.svelte';

  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];
</script>

<header
  class="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm"
>
  <div class="mx-auto max-w-6xl px-6 flex h-14 items-center justify-between">
    <!-- Logo -->
    <a href="#hero" class="font-mono text-lg font-bold text-[var(--color-amber)] tracking-tight hover:opacity-80 transition-opacity">
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

    <!-- Right: socials + theme toggle -->
    <div class="flex items-center">
      <SocialLinks size={18} />
      <ThemeToggle />
    </div>
  </div>
</header>
