<script lang="ts">
  import '../app.css';
  import Footer from '$lib/components/Footer.svelte';
  import LanguagePicker from '$lib/components/LanguagePicker.svelte';

  let { children } = $props();
</script>

{@render children()}
<Footer />
<LanguagePicker class="fixed bottom-4 right-4 z-40" />
