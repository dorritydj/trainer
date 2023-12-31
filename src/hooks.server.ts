import { type Handle } from '@sveltejs/kit';
import db from '$lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals = { db };

	event.locals.db.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		event.locals.db.authStore.isValid && (await event.locals.db.collection('users').authRefresh());
	} catch (_) {
		event.locals.db.authStore.clear();
	}

	const response = await resolve(event);

	response.headers.append('set-cookie', event.locals.db.authStore.exportToCookie());

	return response;
};
