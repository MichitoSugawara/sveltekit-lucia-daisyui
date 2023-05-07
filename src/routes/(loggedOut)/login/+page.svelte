<script lang="ts">
	import { submitting as submittingStore } from '$lib/stores';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, message, errors, submitting, enhance } = superForm(data.form, {
		taintedMessage: false
	});
	$: $submittingStore = $submitting;
</script>

<div class="relative flex flex-col items-center justify-center h-screen overflow-hidden">
	<div class="w-full lg:max-w-lg p-6 m-auto rounded-md shadow-2xl">
		<h1 class="text-3xl font-semibold text-center text-primary">ログイン</h1>
		{#if $message}<span class="text-sm text-red-600">{$message}</span>{/if}
		<form class="space-y-4" method="POST" use:enhance>
			<div>
				<label class="label" for="username"
					><span class="text-base label-text">ユーザー名</span></label
				>
				<input
					class="w-full input input-bordered input-primary {$errors.username || $message
						? 'input-error'
						: ''}"
					type="text"
					name="username"
					bind:value={$form.username}
					disabled={$submitting}
				/>
				{#if $errors.username}<span class="text-xs text-red-600">{$errors.username[0]}</span>{/if}
			</div>
			<div>
				<label class="label" for="password"
					><span class="text-base label-text">パスワード</span></label
				>
				<input
					class="w-full input input-bordered input-primary {$errors.password || $message
						? 'input-error'
						: ''}"
					type="password"
					name="password"
					bind:value={$form.password}
					disabled={$submitting}
				/>
				{#if $errors.password}<span class="text-xs text-red-600">{$errors.password[0]}</span>{/if}
			</div>
			<div><button class="btn btn-block btn-primary" disabled={$submitting}>ログイン</button></div>
			<div>
				<span class="text-sm">アカウントをお持ちでない方は</span>
				<a class="text-sm text-blue-600 hover:underline hover:text-blue-400" href="/signup"
					>新規登録</a
				>
			</div>
		</form>
	</div>
</div>
