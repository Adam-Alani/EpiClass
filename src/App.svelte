<script>
    import FilterSearch from './components/FilterSearch.svelte';
    import Calender from './components/Calendar.svelte'
    import Schedule from './components/Schedule.svelte'
</script>

<main>

    <div class="flex flex-col h-screen ">
        <div class="flex flex-1 overflow-y-hidden ">

            <div class="sidebar flex-none justify-between flex flex-col text-white bg-gradient-to-r from-green-300 to-green-400 ">
                <FilterSearch/>
                <div class=" h-8 flex flex-none items-center bg-white gray-text shadow-lg">
                    <a href="https://www.github.com/Adam-Alani" target="_blank" class="ml-10 text-xs">Made with ❤ by Adam</a>
                </div>
            </div>
            <div class="flex flex-col gray-text bg-gray-100 flex-grow">
                <div class="h-16">
                    <h1 class="flex-none px-4 py-4 custom-h text-xl dgray-text"><strong>January,</strong> 2021
                        <span style="float:right;">
                        Class Name
                    </span>
                    </h1>
                </div>
                <div class="flex-1 flex flex-col overflow-y-auto">
                    <Calender/>
                </div>
            </div>

            <div class=" flex flex-1 flex-col gray-text bg-gray-200  ">
                <div class="h-16 hidden lg:flex">
                    <h1 class="flex-none px-4 py-4 custom-h text-xl dgray-text"><strong>Tuesday</strong>
                    </h1>
                </div>
                <Schedule/>
            </div>
        </div>
    </div>
</main>

<style global>


    .dgray-text {
        color: #303030;
    }


    .gray-text {
        color: #666666;
    }

     ::-webkit-scrollbar {
         width: 0px;
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