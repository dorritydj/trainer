import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { db } = locals;

	if (db.authStore.isValid) throw redirect(303, '/');
};

export const actions = {
	default: async ({ locals, request }) => {
		const { db } = locals;

		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		// log in
		await db.collection('users').authWithPassword(email, password);

		throw redirect(303, '/');
	}
} satisfies Actions;
