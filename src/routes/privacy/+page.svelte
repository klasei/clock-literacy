<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { t } from "$lib/i18n";
</script>

<Seo
  title={t("privacy.seo_title")}
  description={t("privacy.seo_description")}
/>

<main class="min-h-screen bg-cream px-5 py-5 text-ink sm:px-8 lg:px-12">
  <div class="mx-auto max-w-7xl">
    <Header />

    <div class="mx-auto max-w-3xl py-10">
      <h1 class="text-4xl font-semibold tracking-[-0.035em]">{t("privacy.title")}</h1>
      <p class="mt-2 text-ink/60">{t("privacy.subtitle")}</p>

      <section class="mt-8 rounded-3xl border border-ink/12 bg-white/65 p-6 sm:p-8">
        <p class="text-sm leading-relaxed text-ink/70">{t("privacy.body", { link: "cloudflare.com/privacypolicy" })}</p>
        <p class="mt-5 text-sm leading-relaxed text-ink/70">
          {t("privacy.questions")}
          <a
            href="mailto:support@teacher.dev?subject=Clock%20Literacy%20privacy"
            class="font-semibold text-orange underline-offset-4 hover:underline"
          >support@teacher.dev</a>.
        </p>
      </section>
    </div>
  </div>
</main>
