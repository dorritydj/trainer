import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { db } = locals;
	const { id } = params;

	const workout = await db.collection('workout').getOne(id, {
		expand: 'warmup'
	});

	return workout;
};

export const actions = {
	add: async ({ locals, request, params }) => {
		const { db } = locals;
		const workoutId = params.id as string;
		const workout = await db.collection('workout').getOne(workoutId);

		const data = await request.formData();
		console.log(data);
		const name = data.get('name');
		const reps = data.get('reps');
		const sets = data.get('sets');
		const weight = data.get('weight');
		const duration = data.get('duration');
		const section = data.get('section') as string;

		const lift = await db.collection(section).create({ name, reps, sets, weight, duration });
		const sectionLifts = workout[section];

		await db.collection('workout').update(workoutId, {
			[section]: [...sectionLifts, lift.id]
		});
	},
	delete: async ({ locals, request }) => {
		const { db } = locals;

		const data = await request.formData();
		const section = data.get('section') as string;
		const id = data.get('id') as string;

		await db.collection(section).delete(id);
	}
} satisfies Actions;
