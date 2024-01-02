import { type Handle } from '@sveltejs/kit';
import db from '$lib/server/db';
import { redirect } from '$lib/utils/redirect';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals = { db };

	event.locals.db.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		event.locals.db.authStore.isValid && (await event.locals.db.collection('users').authRefresh());
	} catch (_) {
		event.locals.db.authStore.clear();
	}

	if (!event.locals.db.authStore.isValid && !event.url.pathname.includes('/login')) {
		return redirect('/login');
	}

	const response = await resolve(event);

	response.headers.append('set-cookie', event.locals.db.authStore.exportToCookie());

	return response;
};
