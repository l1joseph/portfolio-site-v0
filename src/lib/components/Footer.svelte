<script lang="ts">
  import SocialLinks from './SocialLinks.svelte';
</script>

<footer class="w-full border-t border-[var(--color-border)] py-8 mt-16">
  <div class="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
    <p class="text-sm text-[var(--color-muted)]">
      &copy; {new Date().getFullYear()} Leo Joseph. All rights reserved. · last updated Apr 2026
    </p>
    <SocialLinks size={18} />
  </div>
</footer>
