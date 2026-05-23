<script lang="ts">
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import SocialLinks from '$lib/components/SocialLinks.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import { profile } from '$lib/data/profile';

  type ContactFormData = {
    success?: boolean;
    error?: string;
    name?: string;
    email?: string;
    message?: string;
  } | null;

  let { form }: { form: ContactFormData } = $props();
</script>

<section id="contact" class="w-full py-20 border-t border-[var(--color-border)]">
  <div class="mx-auto max-w-6xl px-6">
    <SectionHeading eyebrow="Say Hello" title="Get in Touch" />

    <div class="grid gap-12 lg:grid-cols-[1fr_minmax(0,480px)] items-start max-w-4xl mx-auto">
      <!-- Left: info -->
      <div class="space-y-6">
        <p class="text-[var(--color-muted)] leading-relaxed">
          If you're working on something at the intersection of computation and biology, I'd love to hear about it.
        </p>
        <div class="space-y-2">
          <p class="text-sm text-[var(--color-muted)]">Find me on:</p>
          <SocialLinks size={20} />
        </div>
        <div>
          <p class="text-sm text-[var(--color-muted)] mb-1">Or email directly:</p>
          <a href={profile.socials.email} class="font-mono text-sm text-[var(--color-azure)] hover:underline">
            {profile.email}
          </a>
        </div>
      </div>

      <!-- Right: form -->
      <ContactForm {form} />
    </div>
  </div>
</section>
