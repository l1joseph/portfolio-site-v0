<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-[var(--color-bg)]">
  <Nav />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
