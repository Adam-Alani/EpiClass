<script>
    import {onMount} from 'svelte';
    import {currDay, currDayStr, weekDays} from "./stores";
    let data;
    let listData = [];
    let tempCourses = [];
    let allCourses = [];

    onMount(async () => {
        data = await fetch('http://localhost:8090/1').then(x => x.json())
        listData = Object.values(data)
        console.log(listData[0].length)
        for (let i = 0 ; i < listData[0].length ; i++) {
            let courseList = Object.values(listData[0][i].courses)
            for (let j = 0 ; j < courseList.length ; j++) {
                let course = Object.values(courseList);
                for (let k = 0 ; k < course.length ; k++) {
                    tempCourses.push(Object.values(course[k]))
                    tempCourses = tempCourses;
                    console.log(Object.values(course[k]))
                }
            }
        }
        console.table(tempCourses)

        allCourses.push(tempCourses[0])
        allCourses = allCourses;
        for (let i = 1; i < tempCourses.length; i++) {
            if (emptyClass(tempCourses[i][1] , tempCourses[i-1][1])) {
                allCourses.push(["" , ])
                allCourses = allCourses;
            }
            allCourses.push(tempCourses[i])
            allCourses = allCourses;
        }
        console.log(allCourses)

    })

    function emptyClass(currentTime , prevTime) {
        return parseInt(currentTime.split('T')[1].split(':')[0]) !== 1 + parseInt(prevTime.split('T')[1].split(':')[0]);

    }

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

    let board = [[]];
    function generateBoard(board , m , n) {
        for (let i = 0; i < n ; ++i) {
            board[i] = []
            for (let j = 0; j < m ; ++j) {
                board[i][j] = 0;
            }
        }
        return board;
    }
    board = generateBoard(board , 7 , 13)

</script>



<style>

    .custom-grid {
        grid-template-rows: repeat(13, minmax(0, 1fr));
    }

    .gray-text {
        color: #303030;
    }




    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';

</style>