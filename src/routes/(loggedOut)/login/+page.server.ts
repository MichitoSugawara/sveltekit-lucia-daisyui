import type { Actions, PageServerLoad } from './$types';
import { loginSchema } from '$lib/schemas/userSchema';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

const schema = loginSchema;

export const load = (async () => {
	const form = await superValidate(schema);
	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		// フォームデータのバリデーション
		const form = await superValidate(event, schema);
		if (!form.valid) {
			return fail(400, { form });
		}
		// TODO: バリデーション後の処理
		console.log(form);
		return { form };
	}
};
