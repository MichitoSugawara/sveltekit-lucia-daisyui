import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authHandler: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	const user = await event.locals.auth.validate();

	if (event.route.id?.startsWith('/(loggedIn)') && !user) {
		return Response.redirect(`${event.url.origin}/login`, 302);
	}

	if (event.route.id?.startsWith('/(loggedOut)') && user) {
		return Response.redirect(`${event.url.origin}/user`, 302);
	}

	return await resolve(event);
};

export const handle = sequence(authHandler);
