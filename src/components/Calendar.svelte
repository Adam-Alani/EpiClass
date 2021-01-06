<script>
    import {onMount} from 'svelte';
    import {currDay, WEEKLY_CUSTOM_THEME, currDayStr, weekDays} from "./stores";
    import Calendar from 'tui-calendar'; /* ES6 */
    import "tui-calendar/dist/tui-calendar.css";

    let data;
    let listData = [];
    let allCourses = [];

    onMount(async () => {
        data = await fetch('http://localhost:8090/1').then(x => x.json())
        listData = Object.values(data)
        console.log(listData[0].length)
        for (let i = 0 ; i < listData[0].length ; i++) {
            let courseList = Object.values(listData[0][i].courses)
            for (let j = 0 ; j < courseList.length ; j++) {
                let course = Object.values(courseList[j]);
                allCourses.push(course)
                allCourses = allCourses;

            }
        }
        console.log(allCourses)


        for (let i = 0; i < allCourses.length; i++) {

            if (allCourses[i][0].includes("Math")) {
                allCourses[i].push('#A78BFA')
            }
            else if (allCourses[i][0].includes("Algo")) {
                allCourses[i].push('#1d69ff')
            }
            else if (allCourses[i][0].includes("Phys")) {
                allCourses[i].push('#fa8beb')
            }
            else if (allCourses[i][0].includes("Elec")) {
                allCourses[i].push('#c6fa8b')
            }
            else if (allCourses[i][0].includes("Archi")) {
                allCourses[i].push('#8bfa8d')
            }
            else if (allCourses[i][0].includes("Prog")) {
                allCourses[i].push('#09730c')
            }
            else if (allCourses[i][0].includes("FLE")) {
                allCourses[i].push('#20e3ff')
            }
            else {
                allCourses[i].push('#ff7e4d')
            }

        }
        console.log(allCourses)

        var calendar = new Calendar('#calendar', {
            defaultView: 'week',
            theme: $WEEKLY_CUSTOM_THEME,
            week: {
                workweek: true
            },
            timezone: {
                zones: [
                    {
                        timezoneOffset: 0,
                    },
                    ],

            },
            isReadOnly: true,
            taskView: false,
            scheduleView: ['time'],
            template: {
                monthDayname: function(dayname) {
                    return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
                }
            }
        })


        for (let i = 0; i < allCourses.length ; i++) {
            calendar.createSchedules([
                {
                    id: i.toString(),
                    calendarId: '1',
                    title: allCourses[i][0],
                    category: 'time',
                    dueDateClass: '',
                    start: allCourses[i][1],
                    end: allCourses[i][2],
                    isReadOnly: true,
                    bgColor: allCourses[i][5],
                    color: '#ffffff'

                },
            ]);
        }








    })

    function emptyClass(currentTime , prevTime) {
        return parseInt(currentTime.split('T')[1].split(':')[0]) > 1 + parseInt(prevTime.split('T')[1].split(':')[0]);
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

<div id="calendar" class="cursor-pointer" style="height: 800px;"></div>


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