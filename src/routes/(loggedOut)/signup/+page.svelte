<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, errors, capture, restore, enhance } = superForm(data.form);
	export const snapshot = { capture, restore };
</script>

<div>
	<h1>サインアップ</h1>
	{#if data.form.message}<span class="invalid">{data.form.message}</span>{/if}
	<form method="POST" use:enhance>
		<label for="username">ユーザー名</label>
		<input type="text" name="username" bind:value={$form.username} />
		{#if $errors.username}<span class="invalid">{$errors.username[0]}</span>{/if}

		<label for="password">パスワード</label>
		<input type="password" name="password" bind:value={$form.password} />
		{#if $errors.password}<span class="invalid">{$errors.password[0]}</span>{/if}

		<label for="confirmPassword">パスワード（確認）</label>
		<input type="password" name="confirmPassword" bind:value={$form.confirmPassword} />
		{#if $errors.confirmPassword}<span class="invalid">{$errors.confirmPassword[0]}</span>{/if}

		<div><button>サインアップ</button></div>
		<a href="/login">ログイン</a>
	</form>
</div>

<style>
	.invalid {
		color: red;
	}
</style>
