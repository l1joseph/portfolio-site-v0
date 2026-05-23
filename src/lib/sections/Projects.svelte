<script lang="ts">
  import ShellPromptHeading from '$lib/components/terminal/ShellPromptHeading.svelte';
  import ProjectLine from '$lib/components/ProjectLine.svelte';
  import { projects } from '$lib/data/projects';

  const research = projects.filter(p => p.category === 'research');
  const fun = projects.filter(p => p.category === 'fun');
</script>

<section id="projects" class="w-full py-4 border-t border-[var(--color-border)]">
  <div class="px-6">
    <ShellPromptHeading command="ls projects/research/" />
    {#each research as project, i}
      <ProjectLine {project} index={i} />
    {/each}

    <div class="mt-8">
      <ShellPromptHeading command="ls projects/fun/" />
      {#each fun as project, i}
        <ProjectLine {project} index={i} />
      {/each}
    </div>
  </div>
</section>
