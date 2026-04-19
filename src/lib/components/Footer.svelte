<script lang="ts">
  import { profile } from '$lib/data/profile';
</script>

<footer class="w-full border-t border-[var(--color-border)] py-8 mt-8">
  <div class="px-6 text-sm text-[var(--color-muted)]">
    <div class="flex flex-wrap items-baseline gap-0 mb-1">
      <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
      <span class="ml-2">exit</span>
    </div>
    <p class="mb-1">EOF · last updated Apr 2026 · <a href="https://leojjoseph.com" title="classic version" class="inline-flex items-center hover:text-[var(--color-accent)] transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg></a> · <a href="https://leojjoseph.com" class="hover:text-[var(--color-accent)] hover:underline underline-offset-4 transition-colors">leojjoseph.com</a> · <a href="https://scholar.google.com/citations?user=34rn0MAAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-accent)] hover:underline underline-offset-4 transition-colors">scholar</a> · <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-accent)] hover:underline underline-offset-4 transition-colors">github</a> · <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-accent)] hover:underline underline-offset-4 transition-colors">linkedin</a></p>
  </div>
</footer>
