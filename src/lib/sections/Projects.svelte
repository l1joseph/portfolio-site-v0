<script lang="ts">
  import ShellPromptHeading from '$lib/components/terminal/ShellPromptHeading.svelte';
  import ProjectLine from '$lib/components/ProjectLine.svelte';
  import { projects } from '$lib/data/projects';
</script>

<section id="projects" class="w-full py-4 border-t border-[var(--color-border)]">
  <div class="mx-auto max-w-[680px] px-6">
    <ShellPromptHeading command="ls -la projects/" />
    {#each projects as project, i}
      <ProjectLine {project} index={i} />
    {/each}
  </div>
</section>
