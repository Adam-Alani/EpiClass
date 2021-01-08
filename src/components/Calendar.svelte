

<script>
    import {onMount} from 'svelte';
    import { totalCourses ,classData , selectedClass, WEEKLY_CUSTOM_THEME} from "./stores";
    import Calendar from 'tui-calendar'; /* ES6 */
    import "tui-calendar/dist/tui-calendar.css";
    import {setColors} from "./colors";

    let data;
    let listData ;
    let allCourses = [];
    let calendar;
    let currMonth = "       ";
    let currWeek = 0;

    $: onMount( () => {
            listData = []
            listData = Object.values($classData);
            for (let i = 0 ; i < listData[0].length ; i++) {
                let courseList = Object.values(listData[0][i].courses)
                for (let j = 0 ; j < courseList.length ; j++) {
                    let course = Object.values(courseList[j]);
                    allCourses.push(course)
                    allCourses = allCourses;

                }
            }
            allCourses = setColors(allCourses)

            $: calendar = new Calendar('#calendar', {
            defaultView: 'week',
            calendars: [
                {
                    id: '1',
                    name: 'My Calendar',
                    bgColor: '#9e5fff',
                    borderColor: '#F3F4F6'
                },
            ],
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
            theme: $WEEKLY_CUSTOM_THEME,
            isReadOnly: true,
            taskView: false,
            scheduleView: ['time'],
            template: {
                monthDayname: function(dayname) {
                    return '<span class=" calendar-week-dayname-name cursor-default select-none">' + dayname.label + '</span>';
                }
            }
        })
        $:currMonth = new Date(calendar.getDate());
        $: for (let i = 0; i < allCourses.length ; i++) {
            if (i === 0) {
                calendar.clear();
            }
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
                    borderColor: allCourses[i][5],
                    color: '#ffffff'
                },
            ]);
        }
    })
        $: for (let i = 0; i < $totalCourses.length ; i++) {
            if (i === 0) {
                calendar.clear();
            }
            calendar.createSchedules([
                {
                    id: i.toString(),
                    calendarId: '1',
                    title: $totalCourses[i][0],
                    category: 'time',
                    dueDateClass: '',
                    start: $totalCourses[i][1],
                    end: $totalCourses[i][2],
                    isReadOnly: true,
                    bgColor: $totalCourses[i][5],
                    borderColor: $totalCourses[i][5],
                    color: '#ffffff'
                },
            ]);
        }

    function jumpWeek(sign) {
        if (sign) {
            currWeek--;
            calendar.move(-1);
            calendar.render();
            currMonth.setDate(currMonth.getDate()-7);
            } else {
                currWeek++
                calendar.next();
                currMonth.setDate(currMonth.getDate()+7);
            }
            calendar = calendar;
            calendar.render();
        currMonth = currMonth;
    }
</script>


<div class="h-16">
    <div class="flex justify-between">
        <div class="flex px-4 py-4  items-center text-center justify-center">
            <a role="button" on:click={()=> {jumpWeek(true)}} class="rounded-full border-transparent hover:bg-green-300 dgray-text  ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left-square dgray-text" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/></svg>
            </a>
            <h1 class="ml-2 flex-none custom-h text-xl dgray-text cursor-default select-none"><strong> {(currMonth.toString()).split(' ')[1] + ", " + (currMonth.toString()).split(' ')[2]}</strong></h1>
            <a role="button" on:click={()=> {jumpWeek(false)}}  class="rounded-full border-transparent hover:bg-green-300 dgray-text ml-2  ">
                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
            </a>

        </div>
        <span class=" px-4 py-4 custom-h text-lg dgray-text cursor-default select-none"  font-semibold="float:right;">
            {Object.values($selectedClass)}
        </span>
    </div>
</div>
<div class="flex-1 flex flex-col ">
<div id="calendar" class="px-4 rounded-lg cursor-default select-none" style="height: 800px;"></div>
</div>


<style>
    .dgray-text {
        color: #303030;
    }
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
</style>