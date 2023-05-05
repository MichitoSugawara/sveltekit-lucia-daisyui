import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	locals.auth.setSession(null);
	throw redirect(302, '/login');
};
