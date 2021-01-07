<script>
    import axios from 'axios'
    let num1 = 1;
    let num2 = 2;

    let add = "";
    let mul = "";
    let sub = "";
    let div = "";


    function postreq() {
        let data = {"num1": parseFloat(num1), "num2": parseFloat(num2)}

        axios({ method: "POST", url: "http://localhost:8090/calc", data: data, headers: {"content-type": "text/plain"}}).then(result => {
            add = result.data['add']
            mul = result.data['mul']
            sub = result.data['sub']
            div = result.data['div']
        }).catch( error => {
            console.error(error);
        })
    }

</script>

<main>
    <div>
        <h1>Calculator</h1>
    </div>
    <div>
        <form>
            <div>
                <label>First Number</label>
                <input type="number" bind:value={num1} >
            </div>
            <div>
                <label>Second Number</label>
                <input type="number"  bind:value={num2}>
            </div>
        </form>
    </div>

    <div><label class="label">Addition: { add }</label></div>
    <div><label class="label">Multiplication: { mul }</label></div>
    <div><label class="label">Subtraction: { sub }</label></div>
    <div><label class="label">Division: { div }</label></div>


    <button on:click={postreq}>Calculate</button>



</main>





<style global>
    @import '../node_modules/tailwindcss/base.css';

    @import '../node_modules/tailwindcss/components.css';

    @import '../node_modules/tailwindcss/utilities.css';
</style>





<div class="flex flex-col h-screen">
    <div class="flex flex-1 overflow-y-hidden overflow-x-hidden">
        <div class="sideBar flex-none text-white justify-between flex flex-col font-semibold">

            <div class="scroll overflow-y-auto px-5 mt-4 ml-1">
                <ul class="leading-loose playlists">
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Today’s Top Hits</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Global Top 50</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">RapCaviar</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Viva Latino</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Baila Reggaeton</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Songs to Sing in the Car</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Songs to Sing in the Shower</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">All Out 00s</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Rock Classics</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">All Out 80s</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Beast Mode</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">All Out 90s</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Chill Hits</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Hot Country</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Get Turnt</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Mood Booster</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">mint</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Esquenta Sertanejo</a></li>
                    <li class="truncate"><a href="#" class="hover:text-white font-normal">Happy Hits!</a></li>
                </ul>
            </div>

            <div class="bottom h-16 px-4 py-1 flex items-center group ml-2 ">
                <svg class="icon-color group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"/></svg>
                <a href='#' class="playlists ml-1 group-hover:text-white">Install App</a>
            </div>
        </div>











        <h1 class="px-4 py-4 text-xl font-bold gray-text">January, 2021</h1>
        <div class="">
            <div>
                {#each board as row, i}
                    <div class="row">
                        {#each row as cell , j}
                            {#if board[i][j] === 0}
                                <div class="cell empty"></div>
                            {/if}
                        {/each}
                    </div>
                {/each}
            </div>
        </div>

        <style>

            .gray-text {
                color: #303030;
            }

            .row {
                cursor: pointer;
                display: flex;
            }

            .cell {
                width: 160px;
                height: 55px;
                border: solid 1px #e3e3e3;;
            }

            .empty {
                cursor: default;
            }

            .container {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            @import 'tailwindcss/base';
            @import 'tailwindcss/components';
            @import 'tailwindcss/utilities';

        </style>













        <div class="pr-4 pb-4 grid grid-cols-7 gray-text overflow-y-auto">
            <div></div>
            <div class="text-center font-semibold">Mon</div>
            <div class="text-center font-semibold">Tue</div>
            <div class="text-center font-semibold">Wed</div>
            <div class="text-center font-semibold">Thur</div>
            <div class="text-center font-semibold">Fri</div>
            <div class="weekend text-center font-semibold">Sat</div>

            <div class="my-3 text-center items-center">8:00 - 9:00</div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>

            <div class="my-3 text-center items-center">9:00 - 10:00</div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>

            <div class="my-3 text-center items-center">10:00 - 11:00</div>
            <div class="border-gray-300 border-2 "></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>

            <div class="my-3 text-center items-center">11:00 - 12:00</div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>

            <div class="my-3 text-center items-center" >12:00 - 13:00</div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>

            <div class="my-3 text-center items-center">13:00 - 14:00</div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>

            <div class="my-3 text-center items-center">14:00 - 15:00</div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>

            <div class="my-3 text-center items-center">15:00 - 16:00</div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>

            <div class="my-3 text-center items-center">16:00 - 17:00</div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>

            <div class="my-3 text-center items-center">17:00 - 18:00</div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>

            <div class="my-3 text-center items-center">18:00 - 19:00</div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>

            <div class="my-3 text-center items-center">19:00 - 20:00</div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>
            <div class="border-gray-300 border-2"></div>


        </div>
















        <div class="gray-text my-2 flex flex-col flex-grow justify-around hidden lg:flex font-semibold  ">

            <div class="flex flex-1 bg-green-300 rounded-lg items-center justify-center my-1 mx-4 shadow">
                <dilv class="flex items-center text-center">
                    <p>8:00 Maths</p>
                </dilv>
            </div>
            <div class=" flex flex-1  bg-green-300 rounded-lg items-center justify-center my-1 mx-4 shadow">
                <div class="flex items-center text-center">
                    <p>Maths</p>
                </div>
            </div>
            <div class=" flex flex-1  bg-green-300 rounded-lg items-center justify-center my-1 mx-4 shadow">
                <div class="flex items-center text-center">
                    <p>Maths</p>
                </div>
            </div>
            <div class=" flex flex-1 bg-white rounded-lg items-center justify-center my-1 mx-4 shadow">
                <div class="flex items-center text-center">
                    <p>11:00  Break</p>
                </div>
            </div>
            <div class=" flex flex-1 bg-purple-400 rounded-lg items-center justify-center my-1 mx-4 shadow">
                <div class="flex items-center text-center">
                    <p>12:00 Algo</p>
                </div>
            </div>
            <div class=" flex flex-1 bg-purple-400 rounded-lg items-center justify-center my-1 mx-4 shadow">
                <div class="flex items-center text-center">
                    <p>Algo</p>
                </div>
            </div>
            <div class=" flex flex-1 bg-blue-400 rounded-lg items-center justify-center my-1 mx-4 shadow">
                <div class="flex items-center text-center">
                    <p>14:00 Elec</p>
                </div>
            </div>
            <div class=" flex flex-1 bg-red-300 rounded-lg items-center justify-center my-1 mx-4 shadow">
                <div class="flex items-center text-center">
                    <p>15:00 Archi</p>
                </div>
            </div>
            <div class=" flex flex-1 bg-red-300 rounded-lg items-center justify-center my-1 mx-4 shadow">
                <div class="flex items-center text-center">
                    <p>Archi</p>
                </div>
            </div>
            <div class=" flex flex-1 rounded-lg bg-white  items-center justify-center my-1 mx-4 shadow">
                <div class="flex items-center text-center">
                    <p>17:00</p>
                </div>
            </div>
            <div class=" flex flex-1  bg-white rounded-lg items-center justify-center my-1 mx-4 shadow">
                <div class="flex items-center text-center">
                    <p>18:00</p>
                </div>
            </div>
            <div class=" flex flex-1 bg-white rounded-lg items-center justify-center my-1 mx-4 shadow">
                <div class="flex items-center text-center">
                    <p>19:00</p>
                </div>
            </div>
        </div>

























        <div class=""></div>
        <div class="my-3 text-center items-center">8:00 - 9:00</div>
        <div class="my-3 text-center items-center">9:00 - 10:00</div>
        <div class="my-3 text-center items-center">10:00 - 11:00</div>
        <div class="my-3 text-center items-center">11:00 - 12:00</div>
        <div class="my-3 text-center items-center" >12:00 - 13:00</div>
        <div class="my-3 text-center items-center">13:00 - 14:00</div>
        <div class="my-3 text-center items-center">14:00 - 15:00</div>
        <div class="my-3 text-center items-center">15:00 - 16:00</div>
        <div class="my-3 text-center items-center">16:00 - 17:00</div>
        <div class="my-3 text-center items-center">17:00 - 18:00</div>
        <div class="my-3 text-center items-center">18:00 - 19:00</div>
        <div class="my-3 text-center items-center">19:00 - 20:00</div>

        <div class="text-center font-semibold">Mon</div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>

        <div class="text-center font-semibold">Tue</div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>

        <div class="text-center font-semibold">Wed</div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>

        <div class="text-center font-semibold">Thur</div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>

        <div class="text-center font-semibold">Fri</div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>

        <div class="weekend text-center font-semibold">Sat</div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>






































        <div class=""></div>
        <div class="my-3 text-center items-center">8:00 - 9:00</div>
        <div class="my-3 text-center items-center">9:00 - 10:00</div>
        <div class="my-3 text-center items-center">10:00 - 11:00</div>
        <div class="my-3 text-center items-center">11:00 - 12:00</div>
        <div class="my-3 text-center items-center" >12:00 - 13:00</div>
        <div class="my-3 text-center items-center">13:00 - 14:00</div>
        <div class="my-3 text-center items-center">14:00 - 15:00</div>
        <div class="my-3 text-center items-center">15:00 - 16:00</div>
        <div class="my-3 text-center items-center">16:00 - 17:00</div>
        <div class="my-3 text-center items-center">17:00 - 18:00</div>
        <div class="my-3 text-center items-center">18:00 - 19:00</div>
        <div class="my-3 text-center items-center">19:00 - 20:00</div>

        <div class="text-center font-semibold items-center ">Mon</div>
        {#each listData as listD}
            {#each listD[0].courses as courses}
                {#if (courses.name).includes("Math")}
                    <div class="flex flex-1 bg-purple-400 items-center justify-center my-1 shadow">
                        <div class="flex items-center text-center">
                            <p>Math</p>
                        </div>
                    </div>
                {:else if (courses.name).includes("Phys")}
                    <div class="flex flex-1 bg-pink-300 items-center justify-center my-1 shadow">
                        <div class="flex items-center text-center">
                            <p>{(courses.name).trim()}</p>
                        </div>
                    </div>
                {:else if (courses.name).includes("Algo")}
                    <div class="flex flex-1 bg-green-300 items-center justify-center my-1 shadow">
                        <div class="flex items-center text-center">
                            <p>Algo</p>
                        </div>
                    </div>
                {:else if (courses.name).includes("Archi")}
                    <div class="flex flex-1 bg-blue-400 items-center justify-center my-1 shadow">
                        <div class="flex items-center text-center">
                            <p>{(courses.name).trim()}</p>
                        </div>
                    </div>
                {:else if (courses.name).includes("Elec")}
                    <div class="flex flex-1 bg-indigo-300 items-center justify-center my-1 shadow">
                        <div class="flex items-center text-center">
                            <p>{(courses.name).trim()}</p>
                        </div>
                    </div>
                {:else if (courses.name).includes("CIE")}
                    <div class="flex flex-1 bg-yellow-200 items-center justify-center my-1 shadow">
                        <div class="flex items-center text-center">
                            <p>{(courses.name).trim()}</p>
                        </div>
                    </div>
                {:else}
                    <div class="flex flex-1 bg-red-300 items-center justify-center my-1 shadow">
                        <div class="flex items-center text-center">
                            <p>{(courses.name).trim()}</p>
                        </div>
                    </div>
                {/if}
            {/each}
        {/each}

        <div class="flex flex-1 bg-white items-center justify-center my-1 shadow">
            <div class="flex items-center text-center">
                <p></p>
            </div>
        </div>
        <div class="flex flex-1 bg-white items-center justify-center my-1 shadow">
            <div class="flex items-center text-center">
                <p></p>
            </div>
        </div>
        <div class="flex flex-1 bg-white items-center justify-center my-1 shadow">
            <div class="flex items-center text-center">
                <p></p>
            </div>
        </div>
        <div class="flex flex-1 bg-white items-center justify-center my-1 shadow">
            <div class="flex items-center text-center">
                <p></p>
            </div>
        </div>

        <div class="text-center font-semibold items-center ">Tue</div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>

        <div class="text-center font-semibold items-center ">Wed</div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>

        <div class="text-center font-semibold items-center ">Thur</div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>

        <div class="text-center font-semibold items-center ">Fri</div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>

        <div class="weekend text-center font-semibold items-center ">Sat</div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>


    </div>










    for (let i = 0; i < allCourses;i++) {
    calendar.createSchedules([
        {
            id: i.toString(),
            calendarId: '1',
            title: allCourses[0],
            category: 'time',
            dueDateClass: '',
            start: allCourses[1].toLocalTime(),
            end: allCourses[2].toLocalTime()
        },
    ]);
}















    export let WEEKLY_CUSTOM_THEME = writable({
    // week header 'dayname'
    'week.dayname.height': '41px',
    'week.dayname.borderTop': '1px solid #fff',
    'week.dayname.borderBottom': '1px solid #ddd',
    'week.dayname.borderLeft': '1px solid #ddd',
    'week.dayname.paddingLeft': '5px',
    'week.dayname.backgroundColor': 'inherit',
    'week.dayname.textAlign': 'left',
    'week.today.color': '#3ED69E',
    'week.pastDay.color': '#999',

    // week vertical panel 'vpanel'
    'week.vpanelSplitter.border': '1px solid #ddd',
    'week.vpanelSplitter.height': '3px',

    // week daygrid 'daygrid'
    'week.daygrid.borderRight': '1px solid #ddd',
    'week.daygrid.backgroundColor': 'inherit',

    'week.daygridLeft.width': '77px',
    'week.daygridLeft.backgroundColor': '#e61313',
    'week.daygridLeft.paddingRight': '5px',
    'week.daygridLeft.borderRight': '1px solid #3ED69E',

    'week.today.backgroundColor': '#dcfff7',
    'week.weekend.backgroundColor': 'inherit',

    // week timegrid 'timegrid'
    'week.timegridLeft.width': '77px',
    'week.timegridLeft.backgroundColor': 'rgba(255,255,255,0.3)',
    'week.timegridLeft.borderRight': '1px solid #ddd',
    'week.timegridLeft.fontSize': '12px',
    'week.timegridLeftTimezoneLabel.height': '51px',
    'week.timegridLeftAdditionalTimezone.backgroundColor': '#e0e0e0',

    'week.timegridOneHour.height': '48px',
    'week.timegridHalfHour.height': '24px',
    'week.timegridHalfHour.borderBottom': '1px dotted #f9f9f9',
    'week.timegridHorizontalLine.borderBottom': '1px solid #ddd',

    'week.timegrid.paddingRight': '0',
    'week.timegrid.borderRight': '1px solid #fff',
    'week.timegridSchedule.borderRadius': '0%',
    'week.timegridSchedule.paddingLeft': '0',

    'week.currentTime.color': '#303030',
    'week.currentTime.fontSize': '10px',
    'week.currentTime.fontWeight': 'bold',

    'week.pastTime.color': '#808080',
    'week.pastTime.fontWeight': 'normal',

    'week.futureTime.color': '#303030',
    'week.futureTime.fontWeight': 'bold',

    'week.currentTimeLinePast.border': '1px solid rgba(19, 93, 230, 0.3)',
    'week.currentTimeLineBullet.backgroundColor': '#135de6',
    'week.currentTimeLineToday.border': '1px solid #135de6',
    'week.currentTimeLineFuture.border': '1px solid #135de6',

    // week creation guide style
    'week.creationGuide.color': '#e0e0e0',
    'week.creationGuide.fontSize': '12px',
    'week.creationGuide.fontWeight': 'bold',

    // week daygrid schedule style
    'week.dayGridSchedule.borderRadius': '100%',
    'week.dayGridSchedule.height': '18px',
    'week.dayGridSchedule.marginTop': '2px',
    'week.dayGridSchedule.marginLeft': '10px',
    'week.dayGridSchedule.marginRight': '10px'
});















    let rec = async () => {
    listData = []
    data = await fetch('http://localhost:8090/1').then(x => x.json())
    listData = Object.values(data)
    for (let i = 0 ; i < listData[0].length ; i++) {
    let courseList = Object.values(listData[0][i].courses)
    for (let j = 0 ; j < courseList.length ; j++) {
    let course = Object.values(courseList[j]);
    allCourses.push(course)
    allCourses = allCourses;

}
}




    for (let i = 0; i < allCourses.length; i++) {

    if (allCourses[i][0].includes("Math")) {
    allCourses[i].push('#9E5FFF')
}
    else if (allCourses[i][0].includes("Algo")) {
    allCourses[i].push('#22e084')
}
    else if (allCourses[i][0].includes("Phys")) {
    allCourses[i].push('#FF5583')
}
    else if (allCourses[i][0].includes("Elec")) {
    allCourses[i].push('#818CF8\n')
}
    else if (allCourses[i][0].includes("Archi")) {
    allCourses[i].push('#60A5FA')
}
    else if (allCourses[i][0].includes("Prog")) {
    allCourses[i].push('#10B981')
}
    else if (allCourses[i][0].includes("FLE")) {
    allCourses[i].push('#00A9FF')
}
    else if (allCourses[i][0].includes("CIE") || allCourses[i][0].includes("TIM")) {
    allCourses[i].push('#ffe03a')
}
    else {
    allCourses[i].push('#ff7e4d')
}

}

    var calendar = new Calendar('#calendar', {
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
    return '<span class=" calendar-week-dayname-name">' + dayname.label + '</span>';
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
    borderColor: allCourses[i][5],
    color: '#ffffff'

},
    ]);
}
}
    console.log(listData)
    onMount(rec)































    $: onMount(async () => {
    listData = []
    data = await fetch('http://localhost:8090/1').then(x => x.json())
    listData = Object.values(data)
    for (let i = 0 ; i < listData[0].length ; i++) {
    let courseList = Object.values(listData[0][i].courses)
    for (let j = 0 ; j < courseList.length ; j++) {
    let course = Object.values(courseList[j]);
    allCourses.push(course)
    allCourses = allCourses;

}
}

    for (let i = 0; i < allCourses.length; i++) {

    if (allCourses[i][0].includes("Math")) {
    allCourses[i].push('#9E5FFF')
}
    else if (allCourses[i][0].includes("Algo")) {
    allCourses[i].push('#22e084')
}
    else if (allCourses[i][0].includes("Phys")) {
    allCourses[i].push('#FF5583')
}
    else if (allCourses[i][0].includes("Elec")) {
    allCourses[i].push('#818CF8\n')
}
    else if (allCourses[i][0].includes("Archi")) {
    allCourses[i].push('#60A5FA')
}
    else if (allCourses[i][0].includes("Prog")) {
    allCourses[i].push('#10B981')
}
    else if (allCourses[i][0].includes("FLE")) {
    allCourses[i].push('#00A9FF')
}
    else if (allCourses[i][0].includes("CIE") || allCourses[i][0].includes("TIM")) {
    allCourses[i].push('#ffe03a')
}
    else {
    allCourses[i].push('#ff7e4d')
}

}
    calendar = new Calendar('#calendar', {
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
    return '<span class=" calendar-week-dayname-name">' + dayname.label + '</span>';
}
}
})
})