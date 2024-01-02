<script lang="ts">
	export let lifts: {
		id: string;
		name: string;
		reps: number;
		sets: number;
		weight: number;
		duration: number;
	}[] = [];
</script>

<form action="?/delete" method="post">
	{#each lifts as lift}
		<div class="lift">
			<p>name: {lift.name}</p>
			<p>reps: {lift.reps}</p>
			<p>sets: {lift.sets}</p>
			<p>weight: {lift.weight}</p>
			<p>duration: {lift.duration}</p>

			<button name="id" value={lift.id} type="submit">x</button>
		</div>
	{/each}
</form>

<style>
	.lift {
		display: flex;
		flex-direction: row;

		justify-content: space-between;

		margin: 0.5rem;
	}
</style>
