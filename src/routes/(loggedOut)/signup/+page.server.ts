import type { Actions, PageServerLoad } from './$types';
import { signupSchema } from '$lib/schemas/signupSchema';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

const schema = signupSchema;

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
		// サインアップ処理
		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: 'username',
					providerUserId: form.data.username,
					password: form.data.password
				},
				attributes: {
					username: form.data.username
				}
			});
			const session = await auth.createSession(user.userId);
			event.locals.auth.setSession(session);
		} catch {
			return fail(400, { form: { ...form, message: 'ログインIDがすでに使われています' } });
		}
		return { form };
	}
};
