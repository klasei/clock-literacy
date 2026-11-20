<script lang="ts">
  import { base, resolve } from "$app/paths";
  import { t } from "$lib/i18n";
</script>

<footer
  class="no-print mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-5 text-center"
>
  <a
    href="https://edtechathon.com"
    target="_blank"
    rel="noopener noreferrer"
    class="flex items-center gap-2 text-sm text-ink/55 transition hover:text-orange"
  >
    <img src={`${base}/logo.svg`} alt="" class="size-6" />
    {t("footer.builtBy")}
  </a>
  <a href={resolve("/about.html")} class="text-sm text-ink/55 transition hover:text-orange">
    {t("nav.about")}
  </a>
  <a href={resolve("/privacy.html")} class="text-sm text-ink/55 transition hover:text-orange">
    {t("nav.privacy")}
  </a>
</footer>
