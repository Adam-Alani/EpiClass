<script>
    import FilterSearch from './components/FilterSearch.svelte';
    import Calender from './components/Calendar.svelte'
</script>

<main>

    <div class="flex flex-col h-screen ">
        <div class="flex flex-1 overflow-y-hidden ">
            <div class="sidebar flex-none justify-between flex flex-col bg-green-300 text-white">
                <FilterSearch/>
                <div class=" h-8 flex items-center bg-white gray-text shadow-lg ">
                    <p class="ml-16 text-xs">Made with ❤ by Adam</p>
                </div>
            </div>

            <div class="flex-1 flex flex-col gray-text bg-gray-100">
                <Calender/>
            </div>
            <div class="flex-1 flex flex-col gray-text bg-gray-200">

            </div>


        </div>
    </div>
</main>

<style global>




    .gray-text {
        color: #666666;
    }

     ::-webkit-scrollbar {
         width: 8px;
         height: 8px;
     }
    ::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
    }
    ::-webkit-scrollbar-thumb {
        background: #208a60;
        border: 0px none #3eb58a;
        border-radius: 100px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #25a479;
    }
    ::-webkit-scrollbar-thumb:active {
        background: #3fb07e;
    }
    ::-webkit-scrollbar-track {
        background: #bababa;
        border: 0px none #bababa;
    }
    ::-webkit-scrollbar-track:hover {
        background: #bababa;
    }
    ::-webkit-scrollbar-track:active {
        background: #bababa;
    }
    ::-webkit-scrollbar-corner {
        background: transparent;
    }





    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
</style>