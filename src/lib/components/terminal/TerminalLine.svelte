<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    prompt?: string;
    command?: string;
    children?: Snippet;
  }

  let { prompt = 'leo@joseph', command = '', children }: Props = $props();
</script>

<div class="mb-4">
  <div class="flex items-baseline gap-0 flex-wrap">
    <span class="text-[var(--color-prompt)] select-none">{prompt}</span><span class="text-[var(--color-muted)] select-none">:~$</span>
    {#if command}
      <span class="text-[var(--color-text)] ml-2">{command}</span>
    {/if}
  </div>
  {#if children}
    <div class="mt-1 pl-0 text-[var(--color-muted)] text-sm leading-relaxed">
      {@render children()}
    </div>
  {/if}
</div>
