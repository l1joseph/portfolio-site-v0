<script lang="ts">
  import Sun from './icons/Sun.svelte';
  import Moon from './icons/Moon.svelte';

  let dark = $state(true);

  $effect(() => {
    dark = document.documentElement.getAttribute('data-theme') !== 'light';
  });

  function toggle() {
    dark = !dark;
    const theme = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
</script>

<button
  onclick={toggle}
  aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
  class="p-2 rounded-md text-[var(--color-muted)] hover:text-[var(--color-amber)] hover:bg-[var(--color-bg-elev)] transition-colors"
>
  {#if dark}
    <Sun />
  {:else}
    <Moon />
  {/if}
</button>
