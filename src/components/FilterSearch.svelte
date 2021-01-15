<script>
    import VirtualList from '@sveltejs/svelte-virtual-list';
    import {totalCourses, classes , selectedClass , classData} from './stores'
    import axios from 'axios';
    import {setColors} from "./colors";

    let start = 0;
    let end = 60;
    let searchTerm = "";
    let res = null
    let foo = 'INFOS1B2-2'
    $: filteredList = $classes.filter(item => item.name.indexOf(searchTerm.toUpperCase()) !== -1)

    function postReq() {
        let data = $selectedClass

        axios({ method: "POST", url: "https://apiepiclass.herokuapp.com/", data: data, headers: {"content-type": "text/plain"}}).then(result => {
            res = result.data;
            $classData = res;
            updateCal();

        }).catch( error => {
            console.error(error);
        })
    }

    function clickHandle(item) {
        selectedClass.update(n => item)
        postReq()

    }

    function updateCal() {
        let listData = Object.values($classData)
        let tempCourses = [];
        for (let i = 0 ; i < listData[0].length ; i++) {
            if (listData[0][i].courses === null) {
                continue
            }
            let courseList = Object.values(listData[0][i].courses)
            for (let j = 0 ; j < courseList.length ; j++) {
                let course = Object.values(courseList[j]);
                tempCourses.push(course)
                tempCourses = tempCourses;
            }
        }

        setColors(tempCourses);
        $totalCourses = tempCourses;
    }




</script>

    <div class="h-16 flex flex-none items-center px-4 bg-white ">
        <button on:click={postReq}>
        <svg class="gray-text " width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </button>
        <input placeholder="Enter Your Class" class="ml-2 gray-text font-semibold border-b-2 border-gray-400 focus:outline-none w-40 " bind:value={searchTerm} />
    </div>
    <div class="text-center font-semibold overflow-y-auto">
        <VirtualList items={filteredList}  bind:start={start} bind:end={end}  let:item>
            <a href="#" role="button"  on:click={()=>{clickHandle(item)}}  class="truncate leading-loose outline-none hover:text-gray-200 uppercase"v>{item.name.toUpperCase()}</a>
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
