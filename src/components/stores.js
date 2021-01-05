import { writable} from "svelte/store";




export let currDay = writable(0);
export let currDayStr = writable((new Date()).getDay());
export let weekDays = writable(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
