<script lang="ts">
  import { resolve } from "$app/paths";

  import Header from "$lib/components/Header.svelte";
  import ClockFace from "$lib/components/ClockFace.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import { t } from "$lib/i18n";
</script>

<Seo title={t("home.seo_title")} description={t("home.seo_description")} />

<main class="relative overflow-hidden bg-cream px-6 py-4">
  <div class="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
    <div class="absolute -top-28 left-[44%] h-48 w-48 rounded-full border border-orange/15"></div>
  </div>

  <div class="relative mx-auto max-w-6xl">
    <Header />

    <section class="grid items-center gap-6 py-4 lg:grid-cols-[1fr_0.92fr]">
      <div class="relative z-10 max-w-xl">
        <h1
          class="max-w-2xl text-[clamp(2.5rem,6vw,4.25rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">
          <span class="block">{t("home.hero_a")}</span>
          {#if t("home.hero_b")}
            <span class="block text-orange">{t("home.hero_b")}</span>
          {/if}
        </h1>
        <p class="mt-4 max-w-md text-base leading-snug text-ink/65 sm:text-lg">
          {t("home.choose")}
        </p>

        <div class="mt-5">
          <a
            href={resolve("/practice.html")}
            class="group inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(23,37,44,0.16)] transition hover:-translate-y-0.5 hover:bg-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange">
            {t("home.start")}
            <span
              class="grid size-6 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1"
              aria-hidden="true">→</span
            >
          </a>
        </div>
      </div>

      <div
        class="relative mx-auto w-full max-w-[380px] lg:ml-auto"
        aria-label={t("home.clock_aria")}
      >
        <div class="absolute -inset-5 rounded-full border-2 border-dashed border-ink/20"></div>
        <div
          class="absolute -top-4 -right-1 rotate-6 rounded-full bg-orange px-3 py-1.5 text-[11px] font-bold tracking-wide text-white uppercase shadow-lg sm:right-2"
        >
          {t("home.badge")}
        </div>

        <div class="relative rounded-full shadow-[0_18px_44px_rgba(0,0,0,0.16)]">
          <ClockFace time={{ hour: 10, minute: 10 }} />
        </div>
      </div>
    </section>

    <section
      class="mt-3 border-t border-ink/12 py-6"
      aria-labelledby="how-it-works"
    >
      <h2
        id="how-it-works"
        class="text-center text-2xl font-semibold tracking-[-0.035em] sm:text-3xl"
      >
        {t("home.levels_title")}
      </h2>

      <ol class="mt-5 grid gap-4 md:grid-cols-3">
        {#each [{ level: t("home.level_easy"), detail: t("home.level_easy_desc"), minute: 0, hour: 2 }, { level: t("home.level_medium"), detail: t("home.level_medium_desc"), minute: 30, hour: 3 }, { level: t("home.level_hard"), detail: t("home.level_hard_desc"), minute: 12, hour: 2 }] as item (item.level)}
          <li
            class="relative flex items-center gap-4 rounded-2xl border border-ink/12 bg-white/45 p-4 md:flex-col md:justify-center md:text-center"
          >
            <div class="size-16 shrink-0 sm:size-20" aria-hidden="true">
              <ClockFace time={{ hour: item.hour, minute: item.minute }} />
            </div>
            <div>
              <h3 class="text-base font-bold">{item.level}</h3>
              <p class="mt-1 text-[13px] text-ink/55">{item.detail}</p>
            </div>
          </li>
        {/each}
      </ol>

      <div class="mt-5 grid gap-4 border-t border-ink/12 pt-5 sm:grid-cols-2">
        <div class="flex gap-3">
          <span class="text-xl text-orange" aria-hidden="true">↔</span>
          <div>
            <h3 class="text-sm font-bold">{t("home.qtypes_title")}</h3>
            <p class="mt-0.5 text-[13px] leading-snug text-ink/55">
              {t("home.qtypes_body")}
            </p>
          </div>
        </div>
        <div class="flex gap-3">
          <svg
            viewBox="0 0 24 24"
            class="mt-0.5 size-5 shrink-0 text-orange"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path
              d="M7 9V4h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v6H7z"
            />
          </svg>
          <div>
            <h3 class="text-sm font-bold">{t("home.report_title")}</h3>
            <p class="mt-0.5 text-[13px] leading-snug text-ink/55">
              {t("home.report_body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
