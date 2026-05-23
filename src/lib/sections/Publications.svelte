<script lang="ts">
  import ShellPromptHeading from '$lib/components/terminal/ShellPromptHeading.svelte';
  import { publications } from '$lib/data/publications';
</script>

<section id="publications" class="w-full py-4 border-t border-[var(--color-border)]">
  <div class="px-6">
    <ShellPromptHeading command="cat publications.bib" />

    <div class="space-y-5">
      {#each publications as pub}
        <div class="text-sm leading-relaxed">
          <div class="flex items-baseline gap-2 flex-wrap mb-0.5">
            <span class="text-[var(--color-muted)] text-xs shrink-0">
              [{pub.type}·{pub.status === 'in-prep' ? 'in-prep' : pub.venue.split('·')[0].trim().replace(/\s+/g, '')}]
            </span>
            <span class="text-[var(--color-muted)] text-xs">{pub.authors}</span>
          </div>
          <div class="text-[var(--color-text)] font-medium pl-0">{pub.title}</div>
          <div class="text-[var(--color-muted)] text-xs mt-0.5">{pub.venue} · {pub.year}</div>
        </div>
      {/each}
    </div>
  </div>
</section>
