<script lang="ts">
	import { enhance } from '$app/forms';

	export let section: string;
</script>

<form use:enhance action="?/add" method="POST">
	<label>Name <input type="text" name="name" /> </label>
	<label>Repitions <input type="number" name="reps" /> </label>
	<label>Sets <input type="number" name="sets" /> </label>
	<label>Weight <input type="number" name="weight" /> </label>
	<label>Duration <input type="number" name="duration" /> </label>
	<button name="section" value={section} type="submit">Add Lift</button>
</form>
