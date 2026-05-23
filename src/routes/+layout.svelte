<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();

  // Keep theme in sync with OS preference changes at runtime
  $effect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    function apply(e: MediaQueryListEvent) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    }
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  });
</script>

<a href="#hero" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-1 focus:bg-[var(--color-bg-elev)] focus:text-[var(--color-azure)] focus:text-sm focus:rounded">Skip to content</a>
<div class="min-h-screen flex flex-col bg-[var(--color-bg)]">
  <Nav />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
