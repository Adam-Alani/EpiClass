<script>
    import {onMount} from 'svelte';
    let board = [[]];
    board = generateBoard(board , [6,13]);

    export function generateBoard(board , [m, n]) {
        for (let i = 0 ; i < n ; ++i) {
            board[i] = [];
            for (let j = 0 ; j < m ; ++j) {
                board[i][j] = 0;
            }
        }
        return board;
    }

</script>


<div class="pr-4 pb-4 flex  flex-grow grid grid-cols-7 divide-x divide-gray-400 gray-text overflow-y-auto">
    <div></div>
    <div class="text-center font-semibold">Mon</div>
    <div class="text-center font-semibold">Tue</div>
    <div class="text-center font-semibold">Wed</div>
    <div class="text-center font-semibold">Thur</div>
    <div class="text-center font-semibold">Fri</div>
    <div class="weekend text-center font-semibold">Sat</div>

    <div class="my-3 text-center items-center">8:00 - 9:00</div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>

    <div class="my-3 text-center items-center">9:00 - 10:00</div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>

    <div class="my-3 text-center items-center">10:00 - 11:00</div>
    <div class=" "></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>

    <div class="my-3 text-center items-center">11:00 - 12:00</div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>

    <div class="my-3 text-center items-center" >12:00 - 13:00</div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>

    <div class="my-3 text-center items-center">13:00 - 14:00</div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>

    <div class="my-3 text-center items-center">14:00 - 15:00</div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>

    <div class="my-3 text-center items-center">15:00 - 16:00</div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>

    <div class="my-3 text-center items-center">16:00 - 17:00</div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>

    <div class="my-3 text-center items-center">17:00 - 18:00</div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>

    <div class="my-3 text-center items-center">18:00 - 19:00</div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>

    <div class="my-3 text-center items-center">19:00 - 20:00</div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>
    <div class=""></div>


</div>

<style>


    .gray-text {
        color: #303030;
    }


    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';

</style>