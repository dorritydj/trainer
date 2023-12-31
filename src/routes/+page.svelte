<script lang="ts">
	export let data;
</script>

<h1>Workouts</h1>
<form method="POST" action="?/add-workout">
	<input type="text" name="name" />
	<button type="submit">add workout</button>
</form>

<br />
{#each data.workout as workout}
	<h2 class="workout">
		<a href={`/workout/${workout.id}`}>
			{workout.name}
		</a>

		<span>{new Date(workout.created).toLocaleString('en-US')}</span>
	</h2>
{/each}

<style>
	.workout {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

        width: 800px;
	}
</style>
