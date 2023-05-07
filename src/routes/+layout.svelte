<script>
	import { navigating } from '$app/stores';
	import '../app.postcss';
	import Loading from '$lib/components/Loading.svelte';
	import { loading } from '$lib/stores/loading';
</script>

{#if $navigating || $loading}
	<Loading />
{/if}

<slot />
