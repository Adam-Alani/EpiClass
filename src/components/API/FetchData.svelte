<script>
    import {onMount} from "svelte";

    const apiURL = "http://localhost:8090/";
    let data = [];

    onMount(async function() {
        const response = await fetch(apiURL)
        data = await response.json();
        console.log(data)
    });
</script>

{#await data}
    <p>Loading....</p>
{:then results}
    {JSON.stringify(data)}
    {:catch error}
    <p>An error occurred</p>
{/await}

