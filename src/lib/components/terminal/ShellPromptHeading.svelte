<script lang="ts">
  import Typewriter from './Typewriter.svelte';

  interface Props {
    command: string;
    prompt?: string;
    id?: string;
  }

  let { command, prompt = 'leo@joseph', id = '' }: Props = $props();
</script>

<div {id} class="mb-6 mt-10">
  <div class="flex items-baseline flex-wrap gap-0">
    <span class="text-[var(--color-prompt)] select-none">{prompt}</span><span class="text-[var(--color-muted)] select-none">:~$</span>
    <span class="ml-2 text-[var(--color-text)]">
      <Typewriter text={command} trigger="view" cursor={false} />
    </span>
  </div>
</div>
