import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { auth } from '$lib/server/lucia';

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw error(404);
	await auth.invalidateSession(session.sessionId); // invalidate session
	locals.auth.setSession(null); // remove cookie
	throw redirect(302, '/login');
};
