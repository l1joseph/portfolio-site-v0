<script lang="ts">
  import { enhance } from '$app/forms';

  type ContactFormData = {
    success?: boolean;
    error?: string;
    name?: string;
    email?: string;
    message?: string;
  } | null;

  let { form }: { form: ContactFormData } = $props();

  let submitting = $state(false);
  let submitted = $state(false);

  $effect(() => {
    if (form?.success) submitted = true;
  });
</script>

{#if submitted}
  <div class="rounded-xl border border-[var(--color-amber)]/30 bg-[var(--color-amber)]/5 p-6 text-center">
    <p class="font-mono text-sm text-[var(--color-amber)] mb-1">Message sent.</p>
    <p class="text-sm text-[var(--color-muted)]">I'll get back to you at the address you provided.</p>
  </div>
{:else}
  <form
    method="POST"
    action="?/send"
    use:enhance={() => {
      submitting = true;
      return async ({ update }) => {
        submitting = false;
        await update();
      };
    }}
    class="space-y-4"
    novalidate
  >
    <!-- Honeypot: hidden from real users, bots fill it -->
    <input type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />

    {#if form?.error}
      <p class="text-sm text-red-400 font-mono">{form.error}</p>
    {/if}

    <div class="grid sm:grid-cols-2 gap-4">
      <div class="space-y-1.5">
        <label for="name" class="text-sm font-medium text-[var(--color-text)]">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autocomplete="name"
          value={form?.name ?? ''}
          placeholder="Your name"
          class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-3 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-amber)]/40 transition"
        />
      </div>
      <div class="space-y-1.5">
        <label for="email" class="text-sm font-medium text-[var(--color-text)]">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autocomplete="email"
          value={form?.email ?? ''}
          placeholder="you@example.com"
          class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-3 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-amber)]/40 transition"
        />
      </div>
    </div>

    <div class="space-y-1.5">
      <label for="message" class="text-sm font-medium text-[var(--color-text)]">Message</label>
      <textarea
        id="message"
        name="message"
        required
        rows="5"
        placeholder="What's on your mind?"
        class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-3 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-amber)]/40 transition resize-none"
      >{form?.message ?? ''}</textarea>
    </div>

    <button
      type="submit"
      disabled={submitting}
      class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-amber)] px-6 py-2.5 text-sm font-semibold text-[var(--color-bg)] hover:bg-[var(--color-amber-dim)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {#if submitting}
        <svg class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        Sending...
      {:else}
        Send Message
      {/if}
    </button>
  </form>
{/if}
