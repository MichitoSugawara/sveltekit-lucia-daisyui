<script>
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });
	
	import { navigating } from '$app/stores';
	import '../app.postcss';
	import Loading from '$lib/components/Loading.svelte';
	import { loading, submitting } from '$lib/stores';
	// submittingストアがtrue時にページ遷移が起きた場合はsubmittingストアをリセット
	$: if ($navigating) $submitting = false;
	// ページ遷移中もしくはsubmittingストア
	$: $loading = !!$navigating || $submitting;
</script>

{#if $loading}
	<Loading />
{/if}

<slot />
