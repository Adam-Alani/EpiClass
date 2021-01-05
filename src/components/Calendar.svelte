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

<h1 class="px-4 py-4 text-xl font-bold gray-text">January, 2021</h1>
<div class="flex flex-1 flex-col flex-row grid grid-cols-7 gray-text">
    <div></div>
    <div>monday</div>
    <div>tuesday</div>
    <div>wednesday</div>
    <div>thursday</div>
    <div>friday</div>
    <div class="weekend">saturday</div>

    <div>8:00 - 10:00</div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>

    <div>10:00 - 12:00</div>

    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>

    <div>12:00 - 14:00</div>

    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>

    <div>14:00 - 16:00</div>

    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div>16:00 - 18:00</div>

    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>

    <div>18:00 - 20:00</div>

    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>


</div>

<style>

    .gray-text {
        color: #303030;
    }


    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';

</style>