<script lang="ts">
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import SkillGroup from '$lib/components/SkillGroup.svelte';
  import { skillGroups } from '$lib/data/skills';
</script>

<section id="skills" class="w-full py-20 border-t border-[var(--color-border)]">
  <div class="mx-auto max-w-6xl px-6">
    <SectionHeading
      eyebrow="Toolbox"
      title="Technologies"
      subtitle="Languages, frameworks, and tools I work with."
    />

    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {#each skillGroups as group}
        <SkillGroup {group} />
      {/each}
    </div>
  </div>
</section>
