<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
</script>

<h1>Workouts</h1>
<form use:enhance method="POST" action="?/add">
	<input type="text" name="name" />
	<button type="submit">add workout</button>
</form>

<br />

<form use:enhance method="POST" action="?/delete">
	{#each data.workout as workout}
		<h2 class="workout">
			<button name="workout-id" value={workout.id} type="submit">delete</button>
			<a class="meta" href={`/workout/${workout.id}`}>
				{new Date(workout.created).toLocaleString('en-US')}
			</a>
		</h2>
	{/each}
</form>
