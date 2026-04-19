<script lang="ts">
  import ShellPromptHeading from '$lib/components/terminal/ShellPromptHeading.svelte';
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

<section id="contact" class="w-full py-4 border-t border-[var(--color-border)]">
  <div class="mx-auto max-w-[680px] px-6">
    <ShellPromptHeading command="./contact.sh" />
    <ContactForm {form} />
  </div>
</section>
