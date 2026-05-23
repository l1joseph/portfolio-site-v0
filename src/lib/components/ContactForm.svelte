<script lang="ts">
  import { enhance } from '$app/forms';
  import BlinkingCursor from '$lib/components/terminal/BlinkingCursor.svelte';

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

  const inputClass = 'bg-transparent border-0 border-b border-[var(--color-border)] focus:border-[var(--color-accent)] focus:outline-none text-[var(--color-text)] text-sm w-full py-1 caret-[var(--color-accent)] transition-colors placeholder:text-[var(--color-border)]';
</script>

{#if submitted}
  <div class="text-sm">
    <div class="flex flex-wrap items-baseline gap-0 mb-1">
      <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
      <span class="text-[var(--color-muted)] ml-2">./contact.sh</span>
    </div>
    <p class="text-[var(--color-prompt)] mt-1">[ok] message sent. thanks — I'll reply soon.</p>
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
    class="space-y-5 text-sm"
    novalidate
  >
    <!-- Honeypot -->
    <input type="text" name="website" tabindex="-1" autocomplete="off" style="position: absolute; left: -9999px; top: -9999px; width: 1px; height: 1px;" />

    {#if form?.error}
      <p class="text-red-400 text-xs" role="alert" aria-live="polite">{form.error}</p>
    {/if}

    <div class="flex items-baseline gap-2 flex-wrap">
      <span class="text-[var(--color-muted)] shrink-0">&gt; name:</span>
      <input
        name="name"
        type="text"
        required
        autocomplete="name"
        value={form?.name ?? ''}
        placeholder="_"
        class="{inputClass} flex-1 min-w-[160px]"
      />
    </div>

    <div class="flex items-baseline gap-2 flex-wrap">
      <span class="text-[var(--color-muted)] shrink-0">&gt; email:</span>
      <input
        name="email"
        type="email"
        required
        autocomplete="email"
        value={form?.email ?? ''}
        placeholder="_"
        class="{inputClass} flex-1 min-w-[160px]"
      />
    </div>

    <div>
      <div class="flex items-baseline gap-2 mb-1">
        <span class="text-[var(--color-muted)]">&gt; message:</span>
      </div>
      <textarea
        name="message"
        required
        rows="4"
        placeholder="_"
        class="bg-transparent border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:outline-none text-[var(--color-text)] text-sm w-full p-2 caret-[var(--color-accent)] transition-colors placeholder:text-[var(--color-border)] resize-none"
      >{form?.message ?? ''}</textarea>
    </div>

    <button
      type="submit"
      disabled={submitting}
      class="text-[var(--color-accent)] hover:underline underline-offset-4 text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {#if submitting}
        <span class="text-[var(--color-muted)]">sending...</span><BlinkingCursor />
      {:else}
        [send]
      {/if}
    </button>
  </form>
{/if}
