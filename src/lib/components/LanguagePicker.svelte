<script lang="ts">
	import { language, languageOptions, t } from "$lib/i18n/index.svelte";

	let { class: className = "" }: { class?: string } = $props();
</script>

<div class="flex items-center gap-2 {className}">
	<svg
		class="h-5 w-5 shrink-0 text-slate-400"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="10" />
		<path d="M2 12h20" />
		<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
	</svg>
	<label>
		<span class="sr-only">{t("language.change")}</span>
		<select
			bind:value={language.code}
			class="h-9 rounded-md border border-slate-200 bg-white px-2 text-sm font-medium text-slate-700 shadow-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
		>
			{#each languageOptions as option (option.code)}
				<option value={option.code}>{option.name}</option>
			{/each}
		</select>
	</label>
</div>
