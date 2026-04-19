<script lang="ts">
  import SocialLinks from './SocialLinks.svelte';
</script>

<footer class="w-full border-t border-[var(--color-border)] py-8 mt-16">
  <div class="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
    <p class="text-sm text-[var(--color-muted)]">
      &copy; {new Date().getFullYear()} Leo Joseph. All rights reserved. · last updated Apr 2026
    </p>
    <div class="flex items-center gap-3">
      <a href="https://bash.leojjoseph.com" title="terminal version" class="text-[var(--color-muted)] hover:text-[var(--color-amber)] transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
      </a>
      <SocialLinks size={18} />
    </div>
  </div>
</footer>
