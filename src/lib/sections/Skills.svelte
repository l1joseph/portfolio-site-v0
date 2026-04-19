<script lang="ts">
  import ShellPromptHeading from '$lib/components/terminal/ShellPromptHeading.svelte';
  import { skillGroups } from '$lib/data/skills';
</script>

<section id="skills" class="w-full py-4 border-t border-[var(--color-border)]">
  <div class="px-6">
    <ShellPromptHeading command="cat skills.json" />

    <div class="text-sm font-mono">
      <span class="text-[var(--color-muted)]">{'{'}</span>
      {#each skillGroups as group, i}
        <div class="pl-4 leading-relaxed">
          <span class="text-[var(--color-accent)]">"{group.title.toLowerCase().replace(/[\s/]/g, '_')}"</span>
          <span class="text-[var(--color-muted)]">: [</span>
          {#each group.items as item, j}
            <span class="text-[var(--color-text)]">{item}</span>{#if j < group.items.length - 1}<span class="text-[var(--color-muted)]">, </span>{/if}
          {/each}
          <span class="text-[var(--color-muted)]">]{i < skillGroups.length - 1 ? ',' : ''}</span>
        </div>
      {/each}
      <span class="text-[var(--color-muted)]">{'}'}</span>
    </div>
  </div>
</section>
