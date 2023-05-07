<script>
	import { navigating } from '$app/stores';
	import '../app.postcss';
	import Loading from '$lib/components/Loading.svelte';
	import { loading } from '$lib/stores/loading';
	// loadingストアがtrue時にページ遷移が起きた場合はloadingストアをリセット
	$: if ($navigating) $loading = false;
</script>

{#if $navigating || $loading}
	<Loading />
{/if}

<slot />
