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
	warmup: async ({ locals, request, params }) => {
		const { db } = locals;
        const workoutId = params.id as string;
        const workout = await db.collection('workout').getOne(workoutId);

		const data = await request.formData();
		const name = data.get('name');
		const reps = data.get('reps');
		const sets = data.get('sets');
		const weight = data.get('weight');
		const duration = data.get('duration');

        const warmup = await db.collection('warmup').create({name, reps, sets, weight, duration});
        const warmupList = workout.warmup;

        await db.collection('workout').update(workoutId, {
            warmup: [...warmupList, warmup.id]
        })
	}
} satisfies Actions;
