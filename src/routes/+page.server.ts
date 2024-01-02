import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { db } = locals;

	const workout = await db.collection('workout').getList();

	return { workout: workout.items };
};

export const actions = {
	add: async ({ locals, request }) => {
		const { db } = locals;
		// @ts-expect-error id missing on types for AuthModel
		const { id } = db.authStore.model;

		const data = await request.formData();
		const name = data.get('name');

		await db.collection('workout').create({
			name,
			user: id
		});
	},
	delete: async ({ locals, request }) => {
		const { db } = locals;

		const data = await request.formData();
		const workoutId = data.get('workout-id') as string;

		await db.collection('workout').delete(workoutId);
	}
} satisfies Actions;
