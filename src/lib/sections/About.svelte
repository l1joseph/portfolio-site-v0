<script lang="ts">
  import ShellPromptHeading from '$lib/components/terminal/ShellPromptHeading.svelte';
  import { bio, education, researchExperience, industryExperience } from '$lib/data/about';
</script>

<section id="about" class="w-full py-4 border-t border-[var(--color-border)]">
  <div class="px-6">

    <!-- bio -->
    <ShellPromptHeading command="cat about.md" />
    <div class="space-y-3 text-sm text-[var(--color-muted)] leading-relaxed mb-8">
      {#each bio as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>

    <!-- education -->
    <div class="mb-8">
      <div class="flex flex-wrap items-baseline gap-0 mb-3">
        <h3 class="sr-only">Education</h3>
        <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
        <span class="text-[var(--color-muted)] ml-2 text-sm">cat education.txt</span>
      </div>
      <div class="space-y-2 text-sm pl-0">
        {#each education as edu}
          <div class="flex flex-wrap gap-x-3 gap-y-0.5">
            <span class="text-[var(--color-muted)] shrink-0">{edu.period}</span>
            <span class="text-[var(--color-text)]">{edu.degree}</span>
            <span class="text-[var(--color-muted)]">· {edu.school}</span>
            {#if edu.note}<span class="text-[var(--color-accent)] text-xs w-full pl-0">{edu.note}</span>{/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- research experience -->
    <div class="mb-8">
      <div class="flex flex-wrap items-baseline gap-0 mb-3">
        <h3 class="sr-only">Research Experience</h3>
        <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
        <span class="text-[var(--color-muted)] ml-2 text-sm">ls experience/research/</span>
      </div>
      <div class="space-y-2 text-sm">
        {#each researchExperience as exp}
          <div class="grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5">
            <span class="text-[var(--color-accent)]">— {exp.lab} <span class="text-[var(--color-muted)]">· {exp.pi}</span></span>
            <span class="text-[var(--color-muted)] text-xs">{exp.period}</span>
            <span class="text-[var(--color-muted)] text-xs col-span-2 pl-4">{exp.focus}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- industry experience -->
    <div class="mb-4">
      <div class="flex flex-wrap items-baseline gap-0 mb-3">
        <h3 class="sr-only">Industry Experience</h3>
        <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
        <span class="text-[var(--color-muted)] ml-2 text-sm">ls experience/industry/</span>
      </div>
      <div class="space-y-2 text-sm">
        {#each industryExperience as exp}
          <div class="grid grid-cols-[1fr_auto] gap-x-3">
            <span class="text-[var(--color-accent)]">— {exp.company} <span class="text-[var(--color-muted)]">· {exp.role}</span></span>
            <span class="text-[var(--color-muted)] text-xs">{exp.period}</span>
          </div>
        {/each}
      </div>
    </div>

  </div>
</section>
