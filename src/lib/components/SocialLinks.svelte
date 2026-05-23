<script lang="ts">
  import GitHub from './icons/GitHub.svelte';
  import LinkedIn from './icons/LinkedIn.svelte';
  import Mail from './icons/Mail.svelte';
  import { profile } from '$lib/data/profile';

  let { size = 20, class: cls = '' }: { size?: number; class?: string } = $props();

  const links = [
    { href: profile.socials.github, label: 'GitHub', Icon: GitHub },
    { href: profile.socials.linkedin, label: 'LinkedIn', Icon: LinkedIn },
    { href: profile.socials.email, label: 'Email', Icon: Mail }
  ];
</script>

<div class="flex items-center gap-3 {cls}">
  {#each links as { href, label, Icon }}
    <a
      {href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
      aria-label={label}
      class="p-2 rounded-md text-[var(--color-muted)] hover:text-[var(--color-azure)] hover:bg-[var(--color-bg-elev)] transition-colors"
    >
      <Icon {size} />
    </a>
  {/each}
</div>
