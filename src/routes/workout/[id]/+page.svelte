<script lang="ts">
	import AddLift from './AddLift.svelte';
	import AllLifts from './AllLifts.svelte';
	export let data;
</script>

<a href="/">back</a>
<h1>Workout: {new Date(data.created).toLocaleString('en-US')}</h1>

<AddLift />
<AllLifts lifts={data.expand?.lifts} />
