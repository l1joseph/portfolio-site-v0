<script lang="ts">
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { projects } from '$lib/data/projects';
</script>

<section id="projects" class="w-full py-20 border-t border-[var(--color-border)]">
  <div class="mx-auto max-w-6xl px-6">
    <SectionHeading
      eyebrow="Work"
      title="Projects"
      subtitle="Computational tools and research projects from the lab."
    />

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {#each projects as project}
        <ProjectCard {project} />
      {/each}
    </div>
  </div>
</section>
