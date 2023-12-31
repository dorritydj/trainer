import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { db } = locals;
	const { authStore } = db;

	// @ts-expect-error something weird with model type not recognizing id
	const { id } = authStore.model;

	const workout = await db.collection('workout').getList();

	return { workout: workout.items };
};

export const actions = {
	'add-workout': async ({ locals, request }) => {
		const { db } = locals;
		// @ts-expect-error id missing on types for AuthModel
		const { id } = db.authStore.model;

		const data = await request.formData();
		const name = data.get('name');

		await db.collection('workout').create({
			name,
			user: id
		});
	}
} satisfies Actions;
