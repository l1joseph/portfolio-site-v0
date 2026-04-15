<script lang="ts">
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import { bio, education, researchExperience, industryExperience, coursework } from '$lib/data/about';
</script>

<section id="about" class="w-full py-20 border-t border-[var(--color-border)]">
  <div class="mx-auto max-w-6xl px-6">
    <SectionHeading eyebrow="About Me" title="Background" />

    <div class="grid gap-12 md:grid-cols-2">
      <!-- Left: bio -->
      <div class="space-y-5">
        {#each bio as paragraph}
          <p class="text-[var(--color-muted)] leading-relaxed">{paragraph}</p>
        {/each}

        <!-- Education -->
        <div class="pt-2 space-y-4">
          <h3 class="text-sm font-semibold text-[var(--color-text)] font-mono uppercase tracking-wider">Education</h3>
          {#each education as edu}
            <div class="space-y-0.5">
              <p class="font-medium text-[var(--color-text)] text-sm">{edu.school}</p>
              <p class="text-sm text-[var(--color-muted)]">{edu.degree}</p>
              <p class="text-sm text-[var(--color-muted)]">{edu.period}</p>
              {#if edu.note}
                <p class="font-mono text-xs text-[var(--color-amber)]">{edu.note}</p>
              {/if}
            </div>
          {/each}
        </div>
      </div>

      <!-- Right: experience + coursework -->
      <div class="space-y-8">
        <!-- Research -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-[var(--color-text)] font-mono uppercase tracking-wider">Research Experience</h3>
          {#each researchExperience as exp}
            <div class="flex gap-3 group">
              <div class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-amber)] shrink-0"></div>
              <div class="space-y-0.5">
                <p class="font-medium text-[var(--color-text)] text-sm">{exp.lab}
                  <span class="font-normal text-[var(--color-muted)]">· {exp.pi}</span>
                </p>
                <p class="text-sm text-[var(--color-muted)]">{exp.institution} · {exp.period}</p>
                <p class="text-xs text-[var(--color-muted)]">{exp.focus}</p>
              </div>
            </div>
          {/each}
        </div>

        <!-- Industry -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-[var(--color-text)] font-mono uppercase tracking-wider">Industry Experience</h3>
          {#each industryExperience as exp}
            <div class="flex gap-3">
              <div class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt-lit)] shrink-0"></div>
              <div class="space-y-0.5">
                <p class="font-medium text-[var(--color-text)] text-sm">{exp.company}</p>
                <p class="text-sm text-[var(--color-muted)]">{exp.role} · {exp.period}</p>
              </div>
            </div>
          {/each}
        </div>

        <!-- Coursework -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-[var(--color-text)] font-mono uppercase tracking-wider">Relevant Coursework</h3>
          <ul class="space-y-1">
            {#each coursework as course}
              <li class="text-sm text-[var(--color-muted)] flex items-center gap-2">
                <span class="text-[var(--color-amber)]">—</span>
                {course}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
