<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();

  // Keep data-theme in sync with OS preference changes at runtime
  $effect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    function apply(e: MediaQueryListEvent | MediaQueryList) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    }
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  });
</script>

<div class="min-h-screen flex flex-col bg-[var(--color-bg)]">
  <Nav />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
