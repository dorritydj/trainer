<script lang="ts">
	import AddLift from './AddLift.svelte';
	import AllLifts from './AllLifts.svelte';
	export let data;
</script>

<a href="/">back</a>
<h1>Workout: {new Date(data.created).toLocaleString('en-US')}</h1>

<h2>Warmup</h2>

<AddLift section="warmup" />
<AllLifts lifts={data.expand?.warmup} section="warmup" />

<h2>Session</h2>

<AddLift section="session" />
<AllLifts lifts={data.expand?.session} section="session" />

<h2>Core</h2>

<AddLift section="core" />
<AllLifts lifts={data.expand?.core} section="core" />

<h2>Cooldown</h2>

<AddLift section="cooldown" />
<AllLifts lifts={data.expand?.cooldown} section="cooldown" />
