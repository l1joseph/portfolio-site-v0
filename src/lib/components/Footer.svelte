<script lang="ts">
  import { profile } from '$lib/data/profile';
</script>

<footer class="w-full border-t border-[var(--color-border)] py-8 mt-8">
  <div class="px-6 text-sm text-[var(--color-muted)]">
    <div class="flex flex-wrap items-baseline gap-0 mb-1">
      <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
      <span class="ml-2">exit</span>
    </div>
    <p class="mb-1">EOF · last updated Apr 2026 · <a href="https://leojjoseph.com" aria-label="Classic version of this site" class="hover:text-[var(--color-accent)] transition-colors">[classic]</a> · <a href="https://leojjoseph.com" class="hover:text-[var(--color-accent)] hover:underline underline-offset-4 transition-colors">leojjoseph.com</a> · <a href="https://scholar.google.com/citations?user=34rn0MAAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-accent)] hover:underline underline-offset-4 transition-colors">scholar</a> · <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-accent)] hover:underline underline-offset-4 transition-colors">github</a> · <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-accent)] hover:underline underline-offset-4 transition-colors">linkedin</a></p>
  </div>
</footer>
