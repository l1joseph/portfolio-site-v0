<script lang="ts">
  import Hero from '$lib/sections/Hero.svelte';
  import Projects from '$lib/sections/Projects.svelte';
  import Publications from '$lib/sections/Publications.svelte';
  import Skills from '$lib/sections/Skills.svelte';
  import About from '$lib/sections/About.svelte';
  import Contact from '$lib/sections/Contact.svelte';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
  <title>Leo Joseph</title>
</svelte:head>

<Hero />
<Projects />
<Publications />
<Skills />
<About />
<Contact {form} />
