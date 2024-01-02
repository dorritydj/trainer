import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { db } = locals;
	const { id } = params;

	const workout = await db.collection('workout').getOne(id, {
		expand: 'lifts'
	});

	return workout;
};

export const actions = {
	add: async ({ locals, request, params }) => {
		const { db } = locals;

		const workoutId = params.id as string;
		const workout = await db.collection('workout').getOne(workoutId);

		const data = await request.formData();
		const name = data.get('name');
		const reps = data.get('reps');
		const sets = data.get('sets');
		const weight = data.get('weight');
		const duration = data.get('duration');

		const lift = await db.collection('lift').create({ name, reps, sets, weight, duration });
		const sectionLifts = workout.lifts;

		await db.collection('workout').update(workoutId, {
			lifts: [...sectionLifts, lift.id]
		});
	},
	delete: async ({ locals, request }) => {
		const { db } = locals;

		const data = await request.formData();
		const id = data.get('id') as string;

		await db.collection('lift').delete(id);
	}
} satisfies Actions;
