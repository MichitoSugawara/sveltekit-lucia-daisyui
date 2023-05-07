import type { Actions, PageServerLoad } from './$types';
import { loginSchema } from '$lib/schemas/userSchema';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

const schema = loginSchema;

export const load = (async (event) => {
	// 認証されたユーザーであればユーザーページへリダイレクト
	const session = await event.locals.auth.validate();
	if (session) throw redirect(302, '/user');

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

		// ログイン処理
		try {
			const key = await auth.useKey('username', form.data.username, form.data.password);
			const session = await auth.createSession(key.userId);
			event.locals.auth.setSession(session);
		} catch (err) {
			return fail(400, {
				form: { ...form, message: 'ログインIDもしくはパスワードが正しくありません' }
			});
		}
		return { form };
	}
};
