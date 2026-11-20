import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  // `t()` lives in a Svelte 5 runes file (`i18n/index.svelte.ts`). Vite's
  // default resolver does not list `.svelte.ts`, so directory imports like
  // `$lib/i18n` fail under vitest; add the extension so both build and tests
  // resolve it the same way.
  resolve: {
    extensions: [".svelte", ".svelte.ts", ".svelte.js", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
});
