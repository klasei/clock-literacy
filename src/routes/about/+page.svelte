<script lang="ts">
  import { base } from '$app/paths';
  import Header from '$lib/components/Header.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { t } from "$lib/i18n";
</script>

<Seo
  title={t("about.seo_title")}
  description={t("about.seo_description")}
/>

<main class="min-h-screen bg-cream px-5 py-5 text-ink sm:px-8 lg:px-12">
  <div class="mx-auto max-w-7xl">
    <Header />

    <div class="mx-auto max-w-3xl py-10">
      <h1 class="text-4xl font-semibold tracking-[-0.035em]">{t("about.title")}</h1>
      <p class="mt-2 text-ink/60">
        {t("about.subtitle")}
      </p>

      <section class="mt-8 rounded-3xl border border-ink/12 bg-white/65 p-6 sm:p-8">
        <div class="flex items-center gap-3">
          <img src={`${base}/logo.svg`} alt="" class="size-11 shrink-0" />
          <h2 class="text-xl font-semibold">{t("about.from")}</h2>
        </div>
        <p class="mt-4 text-sm leading-relaxed text-ink/70">{t("about.project", { edtechathon: "EdTech-a-thon", link: "edtechathon.com" })}</p>

        <figure
          class="mx-auto mt-7 w-full max-w-xl -rotate-1 rounded-sm bg-white p-3 pb-6 shadow-lg ring-1 ring-ink/10"
        >
          <img
            src={`${base}/2026participants.jpg`}
            alt={t("about.participants_aria")}
            class="w-full bg-cream"
          />
          <figcaption class="pt-5 text-center text-lg text-ink/70">{t("about.caption")}</figcaption>
        </figure>
      </section>

      <section class="mt-6 rounded-3xl border border-ink/12 bg-white/65 p-6 sm:p-8">
        <h2 class="text-xl font-semibold">{t("about.promise")}</h2>
        <ul class="mt-3 space-y-2 text-sm leading-relaxed text-ink/70">
          <li class="font-semibold">{t("about.promise_1")}</li>
          <li class="font-semibold">{t("about.promise_2")}</li>
          <li class="font-semibold">{t("about.promise_3")}</li>
        </ul>
      </section>

      <section class="mt-6 rounded-3xl border border-ink/12 bg-white/65 p-6 sm:p-8">
        <h2 class="text-xl font-semibold">{t("about.feedback")}</h2>
        <p class="mt-3 text-sm leading-relaxed text-ink/70">{t("about.feedback_body")}</p>
        <a
          href="mailto:support@teacher.dev?subject=Clock%20Literacy%20feedback"
          class="mt-5 inline-flex min-h-12 items-center rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-orange"
        >
          {t("about.email")}
        </a>
      </section>
    </div>
  </div>
</main>
