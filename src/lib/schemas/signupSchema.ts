import { z } from 'zod';

export const signupSchema = z
	.object({
		username: z.string().min(3, { message: 'ユーザー名は3文字以上で入力してください' }),
		password: z
			.string()
			.min(8, { message: 'パスワードは8文字以上で入力してください' })
			.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
				message: 'パスワードには、小文字・大文字・数字を一文字以上含めて8文字以上で入力してください'
			}),
		confirmPassword: z.string().min(8, { message: 'パスワードは8文字以上で入力してください' })
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'パスワードが一致していません',
		path: ['confirmPassword']
	});

export type signupSchemaType = typeof signupSchema;
