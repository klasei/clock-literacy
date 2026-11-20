<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { resolve } from '$app/paths';
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import Header from '$lib/components/Header.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import ClockFace from '$lib/components/ClockFace.svelte';
  import TimeInput from '$lib/components/TimeInput.svelte';
  import { buildRound, type RoundLength } from '$lib/domain/round';
  import { classify, explain } from '$lib/domain/feedback';
  import { formatTime, sameTime } from '$lib/domain/time';
  import type { ClockTime, DistractorKind, Level, Option, Round } from '$lib/domain/types';
  import {
    saveRound,
    savePendingRound,
    loadPendingRound,
    clearPendingRound,
    type PendingRound,
    unprintedPreviousRound,
    type AnsweredQuestion,
    type CompletedRound
  } from '$lib/storage';
  import { t } from '$lib/i18n';

  type Phase = 'setup' | 'asking' | 'checking' | 'results';

  const levels: { id: Level }[] = [{ id: 'easy' }, { id: 'medium' }, { id: 'hard' }];
  const levelName = (id: Level) =>
    t(id === 'easy' ? 'practice.level_easy' : id === 'medium' ? 'practice.level_medium' : 'practice.level_hard');
  const levelBlurb = (id: Level) =>
    t(id === 'easy' ? 'practice.level_easy_blurb' : id === 'medium' ? 'practice.level_medium_blurb' : 'practice.level_hard_blurb');
  const lengths: RoundLength[] = [5, 10, 20];

  // A shared link like /practice?level=hard preselects a Level. The pages are
  // prerendered, and prerendering forbids reading searchParams because there is
  // no request, so this resolves during hydration instead. Setup is the first
  // screen either way, so the preselection still lands before anyone can act.
  const requested = browser ? page.url.searchParams.get('level') : null;
  const preset = levels.find((level) => level.id === requested)?.id;

  let phase = $state<Phase>('setup');
  let level = $state<Level>(preset ?? 'easy');
  let length = $state<RoundLength>(10);

  let round = $state<Round | null>(null);
  let index = $state(0);
  let answers = $state<AnsweredQuestion[]>([]);

  let picked = $state<ClockTime | null>(null);
  let wrongKind = $state<DistractorKind | null>(null);
  let typedHour = $state('');
  let typedMinute = $state('');
  let advanceTimer: ReturnType<typeof setTimeout> | null = null;
  let inputProblem = $state<string | null>(null);

  let pending = $state<PendingRound | null>(null);
  let resumeDialog: HTMLDialogElement;

  onMount(() => {
    pending = loadPendingRound();
    if (pending) resumeDialog.showModal();
  });

  function persist(): void {
    if (round) savePendingRound({ round, index, answers });
  }

  function declineResume(): void {
    clearPendingRound();
    pending = null;
    resumeDialog.close();
  }

  function resume(): void {
    if (!pending) return;
    round = pending.round;
    level = round.level;
    length = round.questions.length as RoundLength;
    index = pending.index;
    answers = pending.answers;
    resetQuestion();
    phase = 'asking';
    if (answers.length > index) {
      picked = answers[index].answer;
      typedHour = picked ? String(picked.hour) : '';
      typedMinute = picked ? String(picked.minute).padStart(2, '0') : '';
      const current = round.questions[index];
      wrongKind = picked && !answers[index].correct
        ? current.options?.find(option => sameTime(option.time, picked!))?.kind as DistractorKind ?? classify(picked, current.time, level)
        : null;
      phase = 'checking';
      if (answers[index].correct) advanceTimer = setTimeout(advance, 1100);
    }
    pending = null;
    resumeDialog.close();
  }

  let previous = $state<CompletedRound | null>(null);

  $effect(() => () => {
    if (advanceTimer) clearTimeout(advanceTimer);
  });

  const question = $derived(round?.questions[index] ?? null);
  const wasCorrect = $derived(picked !== null && question !== null && sameTime(picked, question.time));
  const rightSoFar = $derived(answers.filter((answer) => answer.correct).length);
  const missed = $derived(answers.filter((answer) => !answer.correct));

  function start(): void {
    round = buildRound(level, length, () => Math.random());
    index = 0;
    answers = [];
    resetQuestion();
    phase = 'asking';
    persist();
  }

  function resetQuestion(): void {
    picked = null;
    wrongKind = null;
    typedHour = '';
    typedMinute = '';
    inputProblem = null;
  }

  function record(answer: ClockTime): void {
    if (!question) return;
    const correct = sameTime(answer, question.time);
    picked = answer;
    wrongKind = correct ? null : classify(answer, question.time, level);
    answers = [
      ...answers,
      {
        time: question.time,
        direction: question.direction,
        answer,
        correct
      }
    ];
    phase = 'checking';
    persist();

    // Right answers keep the Round moving; wrong ones wait, so nobody skips
    // past the explanation without reading it.
    if (correct) {
      advanceTimer = setTimeout(advance, 1100);
      return;
    }
    tick().then(() => {
      // The pressed option is now disabled, so focus would otherwise be lost.
      document.querySelector<HTMLButtonElement>('[data-continue]')?.focus({ preventScroll: true });
    });
  }

  function chooseOption(option: Option): void {
    if (phase !== 'asking') return;
    record(option.time);
    if (option.kind !== 'correct') wrongKind = option.kind;
  }

  function submitTyped(): void {
    if (phase !== 'asking') return;
    const hour = Number(typedHour.trim());
    const minute = Number(typedMinute.trim());

    // Say what is wrong rather than doing nothing: a Check button that appears
    // broken teaches the student that they broke it.
    if (!Number.isInteger(hour) || hour < 1 || hour > 12) {
      inputProblem = t('practice.hour_error');
      return;
    }
    if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
      inputProblem = t('practice.minute_error');
      return;
    }
    inputProblem = null;
    record({ hour, minute });
  }

  function advance(): void {
    if (advanceTimer) {
      clearTimeout(advanceTimer);
      advanceTimer = null;
    }
    if (!round) return;
    if (index + 1 >= round.questions.length) {
      finish();
      return;
    }
    index += 1;
    resetQuestion();
    phase = 'asking';
    persist();
  }

  function finish(): void {
    if (!round) return;
    saveRound({
      level: round.level,
      finishedAt: new Date().toISOString(),
      answers,
      printed: false
    });
    clearPendingRound();
    previous = unprintedPreviousRound();
    phase = 'results';
  }

  const optionLabel = (option: Option) => formatTime(option.time);
</script>

<Seo title={t('practice.seo_title')} />

<dialog
  bind:this={resumeDialog}
  aria-labelledby="resume-title"
  aria-describedby="resume-progress"
  oncancel={() => { pending = null; }}
  class="m-auto w-[calc(100%-2.5rem)] max-w-lg rounded-3xl border border-ink/15 bg-cream p-7 text-ink shadow-xl backdrop:bg-ink/45"
>
  {#if pending}
    <h2 id="resume-title" class="text-2xl font-bold">{t('practice.resume_title')}</h2>
    <p id="resume-progress" class="mt-4 text-lg text-ink/70">
      {t('practice.resume_body', { level: levelName(pending?.round.level ?? 'easy'), answered: pending.answers.length, total: pending.round.questions.length })}
    </p>
    <div class="mt-7 flex flex-wrap gap-3">
      <button type="button" class="min-h-14 rounded-full bg-orange px-6 py-3 font-bold text-white focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ink" onclick={resume}>{t('practice.resume_yes')}</button>
      <button type="button" class="min-h-14 rounded-full border-2 border-ink/20 px-6 py-3 font-bold focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ink" onclick={declineResume}>{t('practice.resume_no')}</button>
    </div>
  {/if}
</dialog>

<main class="min-h-screen bg-cream px-5 py-5 text-ink sm:px-8 lg:px-12">
  <div class="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-7xl flex-col">
    <Header>
      {#if phase === 'asking' || phase === 'checking'}
        <p class="text-sm font-semibold text-ink/60 tabular-nums">
          {t('practice.question_of', { n: index + 1, total: round?.questions.length })}
        </p>
      {/if}
    </Header>

    {#if phase === 'setup'}
      <section class="mx-auto flex w-full max-w-5xl flex-1 flex-col py-10">
        <h1 class="text-[clamp(2rem,5vw,3.5rem)] leading-tight font-semibold tracking-tight">
          {t('practice.level_title')}
        </h1>

        <div class="mt-8 grid gap-3 sm:grid-cols-3">
          {#each levels as option (option.id)}
            <button
              type="button"
              class="rounded-3xl border-2 p-5 text-left transition
                     {level === option.id
                ? 'border-orange bg-white shadow-[0_12px_30px_rgba(23,37,44,0.10)]'
                : 'border-ink/15 hover:border-ink/35'}"
              aria-pressed={level === option.id}
              onclick={() => (level = option.id)}
            >
              <span class="block text-xl font-bold">{levelName(option.id)}</span>
              <span class="mt-1 block text-sm leading-snug text-ink/60">{levelBlurb(option.id)}</span>
            </button>
          {/each}
        </div>

        <h2 class="mt-10 text-lg font-semibold">{t('practice.how_many')}</h2>
        <div class="mt-3 flex flex-wrap gap-3">
          {#each lengths as option (option)}
            <button
              type="button"
              class="min-h-14 min-w-20 rounded-full border-2 px-6 text-lg font-bold tabular-nums transition
                     {length === option
                ? 'border-ink bg-ink text-white'
                : 'border-ink/20 hover:border-ink/45'}"
              aria-pressed={length === option}
              onclick={() => (length = option)}
            >
              {option}
            </button>
          {/each}
        </div>

        <div class="mt-10">
          <button
            type="button"
            class="min-h-14 rounded-full bg-orange px-8 py-4 text-lg font-bold text-white
                   shadow-[0_12px_30px_rgba(242,107,58,0.30)] transition hover:-translate-y-0.5
                   focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ink"
            onclick={start}
          >
            {t('practice.start')}
          </button>
        </div>
      </section>
    {:else if question && (phase === 'asking' || phase === 'checking')}
      <section class="mx-auto flex w-full max-w-5xl flex-1 flex-col py-4 lg:pt-10">
        {#snippet correction()}
          {#if phase === 'checking' && question}
            <div class="mt-5 w-full text-center" role="status" aria-live="polite">
              {#if wasCorrect}
                <p class="text-2xl font-bold text-ink">{t('practice.correct', { time: formatTime(question.time) })}</p>
              {:else}
                <div class="rounded-3xl border-2 border-orange/35 bg-white p-5 text-left">
                  {#if picked}
                    {#if question.direction === 'time-to-clock'}
                      <div class="mx-auto mb-4 w-56 max-w-full">
                        <ClockFace time={question.time} answer={picked} />
                      </div>
                    {/if}
                    <p class="mb-3 text-xl font-bold tabular-nums">
                      {t('practice.your_answer')}
                      <span class="relative inline-block pt-4 {picked.hour === question.time.hour ? 'text-sky-700' : 'text-orange-700'}">
                        <span class="sr-only">{t('practice.hour_sronly')}</span>{picked.hour}<sup class="absolute inset-x-0 top-0 text-center text-xs leading-none" aria-hidden="true">{picked.hour === question.time.hour ? '✓' : '✗'}</sup>
                        <span class="sr-only">{picked.hour === question.time.hour ? t('practice.hand_correct') : t('practice.hand_incorrect')}</span>
                      </span>:<span class="relative inline-block pt-4 {picked.minute === question.time.minute ? 'text-sky-700' : 'text-orange-700'}">
                        <span class="sr-only">{t('practice.minutes_sronly')}</span>{String(picked.minute).padStart(2, '0')}<sup class="absolute inset-x-0 top-0 text-center text-xs leading-none" aria-hidden="true">{picked.minute === question.time.minute ? '✓' : '✗'}</sup>
                        <span class="sr-only">{picked.minute === question.time.minute ? t('practice.hand_correct') : t('practice.hand_incorrect')}</span>
                      </span>
                    </p>
                  {/if}
                  <p class="text-lg leading-relaxed font-medium text-ink">
                    {explain(wrongKind, question.time)}
                  </p>
                  <button
                    type="button"
                    class="mt-4 min-h-14 rounded-full bg-ink px-7 py-3 text-base font-bold text-white
                           transition hover:bg-orange focus-visible:outline-3
                           focus-visible:outline-offset-4 focus-visible:outline-orange"
                    data-continue
                    onclick={advance}
                  >
                    {t('practice.got_it')}
                  </button>
                </div>
              {/if}
            </div>
          {/if}
        {/snippet}

        {#if question.direction === 'clock-to-time'}
          <h1 class="text-center text-2xl font-semibold sm:text-3xl">{t('practice.what_time')}</h1>

          <!-- Keep feedback outside the centered grid so answers stay in place. -->
          <div class="mx-auto mt-4 grid w-full max-w-4xl items-center gap-6 lg:mt-8 lg:grid-cols-2 lg:gap-10">
            <div class="mx-auto w-full max-w-[min(46vh,22rem)]">
              <ClockFace
                time={question.time}
                answer={phase === 'checking' && !wasCorrect ? picked : null}
              />
            </div>

            <div class="w-full">
              {#if question.options}
                <div class="grid w-full gap-3 sm:grid-cols-2">
                  {#each question.options as option (optionLabel(option))}
                    <button
                      type="button"
                      disabled={phase === 'checking'}
                      class="min-h-16 rounded-2xl border-2 text-3xl font-bold tabular-nums transition
                             {phase === 'checking' && sameTime(option.time, question.time)
                        ? 'border-mint bg-mint text-ink'
                        : phase === 'checking' && picked && sameTime(option.time, picked)
                          ? 'border-orange bg-orange/12 text-ink'
                          : 'border-ink/15 bg-white hover:border-ink/45 disabled:opacity-55'}"
                      onclick={() => chooseOption(option)}
                    >
                      {optionLabel(option)}
                    </button>
                  {/each}
                </div>
              {:else}
                <TimeInput
                  bind:hour={typedHour}
                  bind:minute={typedMinute}
                  disabled={phase === 'checking'}
                  onsubmit={submitTyped}
                />
                {#if inputProblem}
                  <p class="mt-3 text-center font-semibold text-orange" role="alert">
                    {inputProblem}
                  </p>
                {/if}
              {/if}
            </div>
          </div>
        {:else}
          <h1 class="text-center text-2xl font-semibold sm:text-3xl">
            {t('practice.which_clock', { time: formatTime(question.time) })}
          </h1>

          <div class="mx-auto mt-5 grid w-full max-w-2xl grid-cols-2 gap-4 lg:mt-8 xl:max-w-4xl xl:grid-cols-4">
            {#each question.options ?? [] as option, position (optionLabel(option))}
              <button
                type="button"
                disabled={phase === 'checking'}
                aria-label={t('practice.clock_aria', { n: position + 1, total: question.options?.length })}
                class="rounded-3xl border-2 bg-white p-2 transition
                       {phase === 'checking' && sameTime(option.time, question.time)
                  ? 'border-mint'
                  : phase === 'checking' && picked && sameTime(option.time, picked)
                    ? 'border-orange'
                    : 'border-ink/15 hover:border-ink/45 disabled:opacity-55'}"
                onclick={() => chooseOption(option)}
              >
                <ClockFace time={option.time} />
              </button>
            {/each}
          </div>
        {/if}

        <div class="mx-auto w-full max-w-2xl">
          {@render correction()}
        </div>
      </section>
    {:else if phase === 'results'}
      <section class="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-10">
        <h1 class="text-[clamp(2rem,5vw,3.5rem)] leading-tight font-semibold tracking-tight">
          {t('practice.score', { right: rightSoFar, total: answers.length })}
        </h1>

        {#if missed.length > 0}
          <h2 class="mt-8 text-lg font-semibold">{t('practice.review_title')}</h2>
          <div class="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {#each missed as miss (miss.time.hour + ':' + miss.time.minute)}
              <div>
                <ClockFace time={miss.time} />
                <p class="mt-2 text-center text-sm font-semibold tabular-nums">
                  {formatTime(miss.time)}
                </p>
                {#if miss.answer}
                  <p class="text-center text-sm text-ink/55 tabular-nums">
                    {t('practice.you_said', { time: formatTime(miss.answer) })}
                  </p>
                {/if}
              </div>
            {/each}
          </div>
        {:else}
          <p class="mt-4 text-xl text-ink/70">{t('practice.all_correct')}</p>
        {/if}

        <div class="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            class="min-h-14 rounded-full bg-orange px-7 py-4 text-base font-bold text-white
                   transition hover:-translate-y-0.5"
            onclick={() => (phase = 'setup')}
          >
            {t('practice.again')}
          </button>
          <a
            href={resolve('/report.html')}
            class="inline-flex min-h-14 items-center rounded-full border-2 border-ink px-7 py-4
                   text-base font-bold text-ink transition hover:bg-ink hover:text-white"
          >
            {t('practice.print_report')}
          </a>
        </div>

        {#if previous}
          <p class="mt-5 text-sm text-ink/60">
            {t('practice.unprinted')}
          </p>
        {/if}
      </section>
    {/if}
  </div>
</main>
