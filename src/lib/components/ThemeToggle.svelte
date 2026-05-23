<script lang="ts">
  import Sun from './icons/Sun.svelte';
  import Moon from './icons/Moon.svelte';

  let dark = $state(true);

  $effect(() => {
    // Read initial value
    dark = document.documentElement.getAttribute('data-theme') !== 'light';

    // Stay in sync when data-theme changes externally (OS preference change)
    const observer = new MutationObserver(() => {
      dark = document.documentElement.getAttribute('data-theme') !== 'light';
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => observer.disconnect();
  });

  function toggle() {
    dark = !dark;
    const t = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  }
</script>

<button
  onclick={toggle}
  aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
  class="p-2 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
>
  {#if dark}
    <Sun />
  {:else}
    <Moon />
  {/if}
</button>
