<script>
    import FilterSearch from './components/FilterSearch.svelte';
    import Calender from './components/Calendar.svelte'
    import Schedule from './components/Schedule.svelte'
    import FetchData from './components/API/FetchData.svelte'

    import { onMount } from "svelte";

    const apiURL = "http://localhost:8090/";
    let data = [];

    onMount(async function() {
        const response = await fetch(apiURL)
        data = await response.json();
        console.log(data)
    });

</script>

<main>
    <FetchData/>
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
                    <div class="flex justify-between">
                        <div class="flex px-4 py-4  items-center text-center justify-center">
                            <a role="button" class=" rounded-full border-transparent hover:bg-green-300 dgray-text  ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/></svg>
                            </a>
                    <h1 class="ml-2 flex-none custom-h text-xl dgray-text"><strong>January,</strong> 2021</h1>
                            <a role="button" class="ml-2 rounded-full border-transparent hover:bg-green-300 dgray-text  ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
                            </a>
                        </div>
                    <span class=" px-4 py-4 custom-h text-lg dgray-text"  font-semibold="float:right;">
                        Class Name
                    </span>
                    </div>
                </div>
                <div class="flex-1 flex flex-col overflow-y-auto">
                    <Calender/>
                </div>
            </div>

            <div class=" flex flex-1 flex-col gray-text bg-gray-200  ">
                <div class="h-16 hidden mx-2 lg:flex justify-center  text-center items-center">
                    <a role="button" class="rounded-full border-transparent hover:bg-green-300 dgray-text  ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/></svg>
                    </a>
                    <h1 class="flex-none px-4 py-4 custom-h text-xl dgray-text"><strong>Tuesday</strong></h1>
                    <a role="button" class="rounded-full border-transparent hover:bg-green-300 dgray-text  ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
                    </a>
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