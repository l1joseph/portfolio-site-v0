<script lang="ts">
  let { user = 'leo@joseph' }: { user?: string } = $props();
</script>

<span class="text-[var(--color-prompt)] select-none">{user}</span><span class="text-[var(--color-muted)] select-none">:~$</span>
