<script>
    import { onMount } from 'svelte'
    import {currDay, currDayStr, weekDays} from "./stores";

    let data;
    let listData = [];



    onMount(async () => {
        data = await fetch('http://localhost:8090/1').then(x => x.json())
        listData = Object.values(data)
    })

    export function fixTime(date) {
        return date.split('T')[1].slice(0,-4);
    }
    export function increaseDay(sign) {
        console.log($currDay)
        if ($currDay !== 0 || sign === false) {

            if (sign) {
                checkWeekend($currDayStr , true)
                currDay.update(n => n -1)
                currDayStr.update(n => n - 1)
            }
            else {
                checkWeekend($currDayStr , false)
                currDay.update(n => n + 1)
                currDayStr.update(n => n + 1)
            }
        }
    }
    export function checkWeekend(day , sign) {
        if (sign) {
            if (day === 1) {
                console.log("HEY")
                currDayStr.update(n => 6)
            }
        }
        else if (day+1 === 6) {
            currDayStr.update(n => 0)
        }

    }


</script>


<div class="w-96 flex-col gray-text bg-gray-200 hidden lg:flex  ">

    <div class="h-16 hidden mx-2 lg:flex justify-center  text-center items-center">
        <a role="button"  on:click={()=> {increaseDay(true)}} class="rounded-full border-transparent hover:bg-green-300 dgray-text  ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/></svg>
        </a>
        <h1 class="flex-none px-4 py-4 custom-h text-xl dgray-text"><strong>{$weekDays[$currDayStr]}</strong></h1>
        <a role="button" on:click={()=> {increaseDay(false)}}  class="rounded-full border-transparent hover:bg-green-300 dgray-text  ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
        </a>
    </div>
    <div class="gray-text my-2 flex flex-col flex-grow justify-around hidden lg:flex font-semibold ">
        {#each listData as listD}
                {#each listD[$currDay].courses as courses}
                    {#if (courses.name).includes("Math")}
                        <div class="flex flex-1 bg-purple-400 rounded-lg items-center justify-center my-1 mx-4 shadow">
                            <div class="flex items-center text-center">
                                <p>{fixTime(courses.start_date).trim()} {(courses.name).trim()}</p>
                            </div>
                        </div>
                    {:else if (courses.name).includes("Phys")}
                        <div class="flex flex-1 bg-pink-300 rounded-lg items-center justify-center my-1 mx-4 shadow">
                            <div class="flex items-center text-center">
                                <p>{fixTime(courses.start_date).trim()} {(courses.name).trim()}</p>
                            </div>
                        </div>
                    {:else if (courses.name).includes("Algo")}
                        <div class="flex flex-1 bg-green-300 rounded-lg items-center justify-center my-1 mx-4 shadow">
                            <div class="flex items-center text-center">
                                <p>{fixTime(courses.start_date).trim()} {(courses.name).trim()}</p>
                            </div>
                        </div>
                    {:else if (courses.name).includes("Archi")}
                        <div class="flex flex-1 bg-blue-400 rounded-lg items-center justify-center my-1 mx-4 shadow">
                            <div class="flex items-center text-center">
                                <p>{fixTime(courses.start_date).trim()} {(courses.name).trim()}</p>
                            </div>
                        </div>
                    {:else if (courses.name).includes("Elec")}
                        <div class="flex flex-1 bg-indigo-300 rounded-lg items-center justify-center my-1 mx-4 shadow">
                            <div class="flex items-center text-center">
                                <p>{fixTime(courses.start_date).trim()} {(courses.name).trim()}</p>
                            </div>
                        </div>
                    {:else if (courses.name).includes("CIE")}
                        <div class="flex flex-1 bg-yellow-200 rounded-lg items-center justify-center my-1 mx-4 shadow">
                            <div class="flex items-center text-center">
                                <p>{fixTime(courses.start_date).trim()} {(courses.name).trim()}</p>
                            </div>
                        </div>
                    {:else}
                        <div class="flex flex-1 bg-red-300 rounded-lg items-center justify-center my-1 mx-4 shadow">
                            <div class="flex items-center text-center">
                                <p>{fixTime(courses.start_date).trim()} {(courses.name).trim()}</p>
                            </div>
                        </div>
                    {/if}
                {/each}
        {/each}
    </div>
</div>

<style>
    .gray-text {
        color: #303030;
    }
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';

</style>