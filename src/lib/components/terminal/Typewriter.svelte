<script lang="ts">
  interface Props {
    text: string;
    speed?: number;
    trigger?: 'mount' | 'view';
    cursor?: boolean;
    class?: string;
  }

  let {
    text,
    speed = 18,
    trigger = 'view',
    cursor = false,
    class: klass = ''
  }: Props = $props();

  let displayed = $state('');
  let done = $state(false);
  let el: HTMLSpanElement;

  $effect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      displayed = text;
      done = true;
      return;
    }

    function runTypewriter() {
      if (done) return;
      let i = 0;
      const interval = setInterval(() => {
        i++;
        displayed = text.slice(0, i);
        if (i >= text.length) {
          clearInterval(interval);
          done = true;
        }
      }, speed);
      return () => clearInterval(interval);
    }

    if (trigger === 'mount') {
      return runTypewriter();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          runTypewriter();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<span bind:this={el} class={klass}>{displayed}{#if cursor && !done}<span class="cursor-blink text-[var(--color-accent)]" aria-hidden="true">▊</span>{/if}</span>
