<script lang="ts">
  import Typewriter from './Typewriter.svelte';

  interface Props {
    command: string;
    prompt?: string;
    id?: string;
    as?: 'h2' | 'h3';
  }

  let { command, prompt = 'leo@joseph', id = '', as: tag = 'h2' }: Props = $props();
</script>

<div {id} class="mb-6 mt-10">
  <svelte:element this={tag} class="sr-only">{command}</svelte:element>
  <div class="flex items-baseline flex-wrap gap-0">
    <span class="text-[var(--color-prompt)] select-none">{prompt}</span><span class="text-[var(--color-muted)] select-none">:~$</span>
    <span class="ml-2 text-[var(--color-text)]">
      <Typewriter text={command} trigger="view" cursor={false} />
    </span>
  </div>
</div>
