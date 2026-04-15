<script lang="ts">
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import SocialLinks from '$lib/components/SocialLinks.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';

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

    <div class="grid gap-12 lg:grid-cols-[1fr_520px] items-start max-w-4xl mx-auto">
      <!-- Left: info -->
      <div class="space-y-6">
        <p class="text-[var(--color-muted)] leading-relaxed">
          Open to research collaborations, internship opportunities, and interesting questions about microbiome or cancer genomics. Drop me a line.
        </p>
        <div class="space-y-2">
          <p class="text-sm text-[var(--color-muted)]">Find me on:</p>
          <SocialLinks size={20} />
        </div>
        <div>
          <p class="text-sm text-[var(--color-muted)] mb-1">Or email directly:</p>
          <a href="mailto:l1joseph@ucsd.edu" class="font-mono text-sm text-[var(--color-amber)] hover:underline">
            l1joseph@ucsd.edu
          </a>
        </div>
      </div>

      <!-- Right: form -->
      <ContactForm {form} />
    </div>
  </div>
</section>
