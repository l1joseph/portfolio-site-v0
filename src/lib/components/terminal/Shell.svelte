<script lang="ts">
  import BlinkingCursor from './BlinkingCursor.svelte';
  import { profile } from '$lib/data/profile';
  import { projects } from '$lib/data/projects';
  import { skillGroups } from '$lib/data/skills';
  import { bio } from '$lib/data/about';
  import { publications } from '$lib/data/publications';

  type OutputLine = { kind: 'text' | 'muted' | 'accent' | 'prompt'; content: string };
  type HistoryEntry = { cmd: string; output: OutputLine[] };

  // ── data tables ─────────────────────────────────────────────────────────────

  const SECTIONS = ['projects', 'publications', 'skills', 'about', 'contact'];

  const LS_CONTENTS: Record<string, () => string> = {
    '/':                  () => SECTIONS.map(s => s + '/').join('  '),
    'projects':           () => 'research/  fun/',
    'projects/research':  () => projects.filter(p => p.category === 'research').map(p => p.displayName).join('  '),
    'projects/fun':       () => projects.filter(p => p.category === 'fun').map(p => p.displayName).join('  '),
    'publications':       () => publications.map(p =>
      `${p.authors.split(',')[0].trim().toLowerCase().replace(/\s+/g, '_')}_${p.year}.bib`
    ).join('  '),
    'skills':             () => skillGroups.map(g => g.title.toLowerCase().replace(/[\s/]/g, '_') + '.txt').join('  '),
    'about':              () => 'bio.md  education.txt  experience.txt',
    'contact':            () => 'contact.sh',
  };

  const CAT_CONTENTS: Record<string, () => OutputLine[]> = {
    'tagline.txt': () => [
      { kind: 'text',  content: profile.tagline },
      { kind: 'text',  content: '' },
      { kind: 'muted', content: profile.personal },
    ],
    'about.md': () => bio.flatMap((para, i) => [
      { kind: 'text', content: para } as OutputLine,
      ...(i < bio.length - 1 ? [{ kind: 'text', content: '' } as OutputLine] : []),
    ]),
    'skills.json': () => {
      const lines: OutputLine[] = [{ kind: 'muted', content: '{' }];
      skillGroups.forEach((g, i) => {
        const key = `"${g.title.toLowerCase().replace(/[\s/]/g, '_')}"`;
        lines.push({ kind: 'text', content: `  ${key}: [${g.items.join(', ')}]${i < skillGroups.length - 1 ? ',' : ''}` });
      });
      lines.push({ kind: 'muted', content: '}' });
      return lines;
    },
    'publications.bib': () => publications.flatMap((pub, i) => [
      { kind: 'accent', content: `[${pub.type}·${pub.venue.split('·')[0].trim()}]` } as OutputLine,
      { kind: 'muted',  content: `  ${pub.authors}` } as OutputLine,
      { kind: 'text',   content: `  ${pub.title}` } as OutputLine,
      ...(i < publications.length - 1 ? [{ kind: 'text', content: '' } as OutputLine] : []),
    ]),
  };

  type CmdSpec = { desc: string; hidden?: boolean; args?: () => string[] };

  const REGISTRY: Record<string, CmdSpec> = {
    cat:     { desc: 'print file contents',      args: () => Object.keys(CAT_CONTENTS) },
    cd:      { desc: 'navigate to section',      args: () => SECTIONS },
    clear:   { desc: 'clear terminal  (Ctrl+L)' },
    contact: { desc: 'get in touch' },
    date:    { desc: 'current date and time' },
    echo:    { desc: 'print text',               args: () => ['$HOME', '$SHELL', '$USER', '$LOCATION'] },
    email:   { desc: 'alias for contact',        hidden: true },
    exit:    { desc: 'close session' },
    git:     { desc: 'version control',          args: () => ['blame', 'log', '--help'] },
    help:    { desc: 'show this help' },
    history: { desc: 'command history' },
    logout:  { desc: 'alias for exit',           hidden: true },
    ls:      { desc: 'list directory contents',  args: () => Object.keys(LS_CONTENTS).filter(k => k !== '/') },
    mail:    { desc: 'alias for contact',        hidden: true },
    pwd:     { desc: 'print working directory' },
    quit:    { desc: 'alias for exit',           hidden: true },
    sudo:    { desc: 'superuser do',             args: () => Object.keys(REGISTRY) },
    uname:   { desc: 'system info',              args: () => ['-a'] },
    whoami:  { desc: 'who am I?' },
    '?':     { desc: 'alias for help',           hidden: true },
  };

  const COMMANDS = Object.keys(REGISTRY);

  // ── shell state ─────────────────────────────────────────────────────────────

  let history = $state<HistoryEntry[]>([]);
  let input = $state('');
  let hints = $state('');
  let cmdHistory: string[] = [];
  let historyIdx: number | null = null;
  let inputEl: HTMLInputElement;
  let containerEl: HTMLDivElement;

  function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
      while (!strs[i].startsWith(prefix)) prefix = prefix.slice(0, -1);
    }
    return prefix;
  }

  function setInput(val: string) {
    input = val;
    if (inputEl) inputEl.value = val;
  }

  // ── command dispatch ─────────────────────────────────────────────────────────

  function runCommand(raw: string): OutputLine[] | 'clear' {
    if (!raw.trim()) return [];
    const parts = raw.trim().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);
    const arg = args.join(' ');

    switch (cmd) {
      case 'help':
      case '?':
        return [
          { kind: 'muted', content: 'available commands:' },
          ...Object.entries(REGISTRY)
            .filter(([, spec]) => !spec.hidden)
            .map(([name, spec]) => ({
              kind: 'accent' as const,
              content: `  ${name.padEnd(10)} ${spec.desc}`,
            })),
        ];

      case 'whoami':
        return [{ kind: 'text', content: `${profile.name} — ${profile.role}` }];

      case 'pwd':
        return [{ kind: 'text', content: '/home/leo' }];

      case 'ls': {
        const key = arg.replace(/\/$/, '') || '/';
        const fn = LS_CONTENTS[['', '~', '.'].includes(key) ? '/' : key];
        if (fn) return [{ kind: 'accent', content: fn() }];
        return [{ kind: 'muted', content: `ls: cannot access '${arg}': No such file or directory` }];
      }

      case 'cd': {
        if (!arg || arg === '~' || arg === '/home/leo') return [{ kind: 'muted', content: "you're already home." }];
        if (arg === '..') return [{ kind: 'muted', content: "you're at /home/leo — nowhere further up." }];
        if (SECTIONS.includes(arg)) {
          setTimeout(() => document.getElementById(arg)?.scrollIntoView({ behavior: 'smooth' }), 80);
          return [{ kind: 'prompt', content: `> navigating to #${arg}` }];
        }
        return [{ kind: 'muted', content: `cd: ${arg}: No such file or directory` }];
      }

      case 'cat': {
        if (!arg) return [{ kind: 'muted', content: 'cat: missing file operand' }];
        const fn = CAT_CONTENTS[arg];
        if (fn) return fn();
        return [{ kind: 'muted', content: `cat: ${arg}: No such file or directory` }];
      }

      case 'echo':
        return [{ kind: 'text', content: arg }];

      case 'date':
        return [{ kind: 'text', content: new Date().toString() }];

      case 'uname':
        return [{ kind: 'text', content: 'bash.leojjoseph.com 4.6 #1 SMP x86_64 GNU/Linux' }];

      case 'history':
        if (cmdHistory.length === 0) return [{ kind: 'muted', content: '(no history)' }];
        return cmdHistory.map((c, i) => ({ kind: 'muted' as const, content: `  ${String(i + 1).padStart(3)}  ${c}` }));

      case 'clear':
        return 'clear';

      case 'sudo':
        return [{ kind: 'muted', content: 'Permission denied: nice try.' }];

      case 'contact':
      case 'email':
      case 'mail':
        return [
          { kind: 'text',   content: `email:  ${profile.email}` },
          { kind: 'accent', content: `mailto: ${profile.socials.email}` },
        ];

      case 'exit':
      case 'logout':
      case 'quit':
        return [{ kind: 'muted', content: 'Connection to leojjoseph.com closed. (just kidding — scroll.)' }];

      case 'git':
        if (args[0] === 'blame') return [{ kind: 'muted', content: 'fatal: it was Leo.' }];
        if (args[0] === 'log')   return [{ kind: 'muted', content: 'commit 1979703 — feat: build something cool\ncommit 842aab4 — feat: keep building' }];
        return [{ kind: 'muted', content: `git: '${arg}' is not a git command. try: git blame, git log` }];

      default:
        return [{ kind: 'muted', content: `bash: ${cmd}: command not found` }];
    }
  }

  // ── input handling ───────────────────────────────────────────────────────────

  function submit() {
    const raw = input;
    const result = runCommand(raw);
    if (result === 'clear') {
      history = [];
      setInput('');
      hints = '';
      historyIdx = null;
      return;
    }
    history = [...history, { cmd: raw, output: result }];
    const trimmed = raw.trim();
    if (trimmed && (cmdHistory.length === 0 || cmdHistory[cmdHistory.length - 1] !== trimmed)) {
      cmdHistory = [...cmdHistory, trimmed];
    }
    setInput('');
    hints = '';
    historyIdx = null;
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = historyIdx === null ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      historyIdx = next;
      setInput(cmdHistory[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === null) return;
      const next = historyIdx + 1;
      if (next >= cmdHistory.length) { historyIdx = null; setInput(''); }
      else { historyIdx = next; setInput(cmdHistory[next]); }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation();
      const raw = input.trimStart();
      const firstSpace = raw.indexOf(' ');

      let candidates: string[];
      let prefix: string;

      if (firstSpace === -1) {
        if (!raw) return;
        candidates = COMMANDS.filter(c => c.startsWith(raw));
        prefix = '';
      } else {
        const cmd = raw.slice(0, firstSpace);
        const partial = raw.slice(firstSpace + 1);
        candidates = (REGISTRY[cmd]?.args?.() ?? []).filter(c => c.startsWith(partial));
        prefix = cmd + ' ';
      }

      if (candidates.length === 0) {
        // no match — do nothing
      } else if (candidates.length === 1) {
        hints = '';
        setInput(prefix + candidates[0] + (firstSpace === -1 ? ' ' : ''));
      } else {
        const lcp = longestCommonPrefix(candidates);
        if (lcp.length > (firstSpace === -1 ? raw : raw.slice(firstSpace + 1)).length) {
          hints = '';
          setInput(prefix + lcp);
        } else {
          hints = candidates.join('   ');
        }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      history = [];
    }
  }

  $effect(() => {
    const _ = history.length;
    containerEl?.scrollIntoView({ behavior: 'instant', block: 'nearest' });
  });

  $effect(() => {
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches) {
      inputEl?.focus();
    }
  });

  function kindClass(kind: OutputLine['kind']): string {
    switch (kind) {
      case 'muted':  return 'text-[var(--color-muted)]';
      case 'accent': return 'text-[var(--color-accent)]';
      case 'prompt': return 'text-[var(--color-prompt)]';
      default:       return 'text-[var(--color-text)]';
    }
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  bind:this={containerEl}
  class="font-mono text-sm cursor-text focus-within:ring-1 focus-within:ring-[var(--color-accent)] focus-within:ring-offset-1 focus-within:ring-offset-[var(--color-bg)]"
  onclick={() => inputEl?.focus()}
  role="region"
  aria-label="interactive terminal"
>
  <div class="max-h-48 overflow-y-auto">
  {#each history as entry}
    {#if entry.cmd !== ''}
      <div class="flex items-baseline gap-0">
        <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
        <span class="ml-2 text-[var(--color-text)]">{entry.cmd}</span>
      </div>
    {/if}
    {#each entry.output as line}
      <div class={kindClass(line.kind)}>{line.content || '\u00a0'}</div>
    {/each}
  {/each}
  </div>

  <div class="flex items-baseline gap-0">
    <span class="text-[var(--color-prompt)] select-none">leo@joseph</span><span class="text-[var(--color-muted)] select-none">:~$</span>
    <div class="relative ml-2 flex-1 min-w-0 overflow-hidden">
      <span class="text-[var(--color-text)] pointer-events-none whitespace-pre">{input}<BlinkingCursor /></span>
      <input
        bind:this={inputEl}
        oninput={(e) => { input = (e.currentTarget as HTMLInputElement).value; hints = ''; historyIdx = null; }}
        onkeydown={handleKey}
        class="absolute inset-0 w-full h-full bg-transparent text-transparent caret-transparent outline-none border-none"
        aria-label="shell input"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        inputmode="text"
      />
    </div>
  </div>
  {#if hints}
    <div class="text-[var(--color-muted)]">{hints}</div>
  {/if}
</div>
