<script lang="ts">
	export let data;
</script>

<a href="/">back</a>
<h1>Workout: {data.name}</h1>
<h2>Warmup</h2>
<form action="?/warmup" method="POST">
	<label>Name <input type="text" name="name" /> </label>
	<label>Repitions <input type="number" name="reps" /> </label>
	<label>Sets <input type="number" name="sets" /> </label>
	<label>Weight <input type="number" name="weight" /> </label>
	<label>Duration <input type="number" name="duration" /> </label>
	<button type="submit">Add Lift</button>
</form>
{#if data.expand}
	{#each data.expand.warmup as warmup}
		<div class="lift">
			<p>name: {warmup.name}</p>
			<p>reps: {warmup.reps}</p>
			<p>sets: {warmup.sets}</p>
			<p>weight: {warmup.weight}</p>
			<p>duration: {warmup.duration}</p>
		</div>
	{/each}
{/if}
<h2>Session</h2>
<h2>Core</h2>
<h2>Cooldown</h2>

<style>
	.lift {
		display: flex;
		flex-direction: row;

		justify-content: space-between;

        margin: .5rem
	}
</style>
