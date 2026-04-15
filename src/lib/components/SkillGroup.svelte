<script lang="ts">
  import type { SkillGroup } from '$lib/data/skills';

  let { group }: { group: SkillGroup } = $props();
</script>

<div class="space-y-2">
  <h3 class="text-sm font-semibold text-[var(--color-text)] font-mono">{group.title}</h3>
  <div class="flex flex-wrap gap-1.5">
    {#each group.items as item}
      <span
        class="text-xs px-2.5 py-1 rounded-md bg-[var(--color-bg-elev)] text-[var(--color-muted)] border border-[var(--color-border)] hover:border-[var(--color-amber)]/40 hover:text-[var(--color-text)] transition-colors cursor-default"
      >
        {item}
      </span>
    {/each}
  </div>
</div>
