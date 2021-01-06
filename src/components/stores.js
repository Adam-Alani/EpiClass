import { writable} from "svelte/store";



export let selectedClass = writable('')
export let currDay = writable(0);
export let currDayStr = writable((new Date()).getDay());
export let weekDays = writable(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);




export let WEEKLY_CUSTOM_THEME = writable({
    // week header 'dayname'
    'week.dayname.height': '41px',
    'week.dayname.borderTop': '1px solid #ddd',
    'week.dayname.borderBottom': '1px solid #ddd',
    'week.dayname.borderLeft': '1px solid #ddd',
    'week.dayname.paddingLeft': '5px',
    'week.dayname.backgroundColor': 'inherit',
    'week.dayname.textAlign': 'left',
    'week.today.color': '#b857d8',
    'week.pastDay.color': '#999',

    // week vertical panel 'vpanel'
    'week.vpanelSplitter.border': '1px solid #ddd',
    'week.vpanelSplitter.height': '3px',

    // week daygrid 'daygrid'
    'week.daygrid.borderRight': '1px solid #ddd',
    'week.daygrid.backgroundColor': 'inherit',

    'week.daygridLeft.width': '77px',
    'week.daygridLeft.backgroundColor': 'rgb(106,0,255)',
    'week.daygridLeft.paddingRight': '5px',
    'week.daygridLeft.borderRight': '1px solid #ddd',

    'week.today.backgroundColor': '#b857d81f',
    'week.weekend.backgroundColor': 'inherit',

    // week timegrid 'timegrid'
    'week.timegridLeft.width': '77px',
    'week.timegridLeft.backgroundColor': 'rgba(255,255,255,0.3)',
    'week.timegridLeft.borderRight': '1px solid #ddd',
    'week.timegridLeft.fontSize': '12px',
    'week.timegridLeftTimezoneLabel.height': '51px',
    'week.timegridLeftAdditionalTimezone.backgroundColor': '#fdfdfd',

    'week.timegridOneHour.height': '48px',
    'week.timegridHalfHour.height': '24px',
    'week.timegridHalfHour.borderBottom': '1px dotted #f9f9f9',
    'week.timegridHorizontalLine.borderBottom': '1px solid #eee',

    'week.timegrid.paddingRight': '10px',
    'week.timegrid.borderRight': '1px solid #ddd',
    'week.timegridSchedule.borderRadius': '0',
    'week.timegridSchedule.paddingLeft': '0',

    'week.currentTime.color': '#ffffff',
    'week.currentTime.fontSize': '1px',
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
    'week.creationGuide.color': '#ffffff',
    'week.creationGuide.fontSize': '12px',
    'week.creationGuide.fontWeight': 'bold',

    // week daygrid schedule style
    'week.dayGridSchedule.borderRadius': '0',
    'week.dayGridSchedule.height': '18px',
    'week.dayGridSchedule.marginTop': '2px',
    'week.dayGridSchedule.marginLeft': '10px',
    'week.dayGridSchedule.marginRight': '10px'
});
