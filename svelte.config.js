import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),

  /**
   * Prerendering has no incoming request to read an origin from, so without
   * this SvelteKit bakes its `http://sveltekit-prerender` placeholder into the
   * canonical and og:image URLs. Advertise the production URL instead.
   */
  kit: {
    adapter: adapter(),
    prerender: { origin: "https://laikrodis.klasei.lt" },
  },
};
