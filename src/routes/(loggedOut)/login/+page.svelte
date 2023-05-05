<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, message, errors, capture, restore, enhance } = superForm(data.form);
	export const snapshot = { capture, restore };
</script>

<div>
	<h1>ログイン</h1>
	{#if $message}<span class="invalid">{$message}</span>{/if}
	<form method="POST" use:enhance>
		<label for="username">ユーザー名</label>
		<input type="text" name="username" bind:value={$form.username} />
		{#if $errors.username}<span class="invalid">{$errors.username[0]}</span>{/if}

		<label for="password">パスワード</label>
		<input type="password" name="password" bind:value={$form.password} />
		{#if $errors.password}<span class="invalid">{$errors.password[0]}</span>{/if}

		<div><button>ログイン</button></div>
		<a href="/signup">サインアップ</a>
	</form>
</div>

<style>
	.invalid {
		color: red;
	}
</style>
