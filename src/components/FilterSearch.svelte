<script>
    import VirtualList from '@sveltejs/svelte-virtual-list';
    let start = 0;
    let end = 60;
    let searchTerm = "";

    let classes = [
        { name: 'S1-A1', number: 1 },
        { name: 'S1-A1', number: 2 },
        { name: 'S1-A2', number: 1 },
        { name: 'S1-A2', number: 2 },
        { name: 'S1-B1', number: 1 },
        { name: 'S1-B1', number: 2 },
        { name: 'S1-B2', number: 1 },
        { name: 'S1-B2', number: 2 },
        { name: 'S1-C1', number: 1 },
        { name: 'S1-C1', number: 2 },
        { name: 'S1-C2', number: 1 },
        { name: 'S1-C2', number: 2 },
        { name: 'S1-D1', number: 1 },
        { name: 'S1-D1', number: 2 },
        { name: 'S1-D2', number: 1 },
        { name: 'S1-D2', number: 2 },
        { name: 'S3-A1', number: 1 },
        { name: 'S3-A1', number: 2 },
        { name: 'S3-A2', number: 1 },
        { name: 'S3-A2', number: 2 },
        { name: 'S3-B1', number: 1 },
        { name: 'S3-B1', number: 2 },
        { name: 'S3-B2', number: 1 },
        { name: 'S3-B2', number: 2 },


    ]

    $: filteredList = classes.filter(item => item.name.indexOf(searchTerm) !== -1)

</script>

    <div class="h-16 flex flex-none items-center px-4 bg-white ">
        <svg class="gray-text " width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input placeholder="Enter Your Class" class="ml-2 gray-text font-semibold border-b-2 border-gray-400 focus:outline-none w-40 " bind:value={searchTerm} />
    </div>
    <div class="text-center font-semibold overflow-y-auto">
        <VirtualList items={filteredList}  bind:start={start} bind:end={end}  let:item>
            <a href="#" class="truncate leading-loose outline-none hover:text-gray-200">{item.name}-{item.number}</a>
        </VirtualList>
    </div>



<style>

    .gray-text {
        color: #303030;
    }




    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
</style>
