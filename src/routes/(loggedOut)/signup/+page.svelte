<script lang="ts">
	import { submitting as submittingStore } from '$lib/stores';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, message, errors, submitting, enhance, capture, restore } = superForm(data.form, {
		taintedMessage: false
	});
	$: $submittingStore = $submitting;
	export const snapshot = { capture, restore };
</script>

<div class="relative flex flex-col items-center justify-center h-screen overflow-hidden">
	<div class="w-full lg:max-w-lg p-6 m-auto rounded-md shadow-2xl">
		<h1 class="text-3xl font-semibold text-center text-primary">新規登録</h1>
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

			<div>
				<label class="label" for="confirmPassword"
					><span class="text-base label-text">パスワード（確認）</span></label
				>
				<input
					class="w-full input input-bordered input-primary {$errors.confirmPassword || $message
						? 'input-error'
						: ''}"
					type="password"
					name="confirmPassword"
					bind:value={$form.confirmPassword}
					disabled={$submitting}
				/>
				{#if $errors.confirmPassword}<span class="text-xs text-red-600"
						>{$errors.confirmPassword[0]}</span
					>{/if}
			</div>

			<div><button class="btn btn-block btn-primary" disabled={$submitting}>新規登録</button></div>
			<div>
				<span class="text-sm">すでにアカウントをお持ちの方は</span>
				<a class="text-sm text-blue-600 hover:underline hover:text-blue-400" href="/login"
					>ログイン</a
				>
			</div>
		</form>
	</div>
</div>
