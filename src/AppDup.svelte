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
        console.log(data);
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
