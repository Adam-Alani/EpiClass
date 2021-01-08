import { writable} from "svelte/store";

//==========Date variables==============//

export let currWeek = writable(0);
export let prevWeek = writable(0);
export let currDay = writable(0);
export let currDayStr = writable((new Date()).getDay());
export let weekDays = writable(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
export let classData = writable({"daily":[{"date":"2019-01-06T23:00:00Z","courses":[{"name":"Choose Class","start_date":"2019-01-07T00:00:00Z","end_date":"2019-01-07T10:00:00Z","duration":60,"staff":["Mtir Ines"]}]}]});
//==========Generate class names===========//
const chr2num = c => c.charCodeAt(0);
const num2chr = n => String.fromCharCode(n);
function getClasses(year,  startName ,className , nums, sharp) {
    let res = []
    for (let i = chr2num(startName); i <= chr2num(className); i++) {
        for (let j = 1 ; j <= nums; j++)
            for (let k = 1; k <= 2 ; k++) {
                res.push({name:"INFOS"+year+num2chr(i)+j+'-'+k})
            }

    }
    return res
}

//=========Current class selected=========//

export let selectedClass = writable(["Select Class."])
let s1 = getClasses(1,'A' ,'E', 2, false);
let s1F = getClasses(1,'F' ,'F', 1, false);

let s2 = getClasses(2,'A','E', 2,false)
let s2F = getClasses(1,'F' ,'F', 1, false);

let s3 = getClasses(3,'A','D', 2,false);
let s3E = getClasses(3,'E','E', 1,false);

let s4 = getClasses(4,'A','D', 2,false)

let ing = [{name:"BING"},{name:"RIEMANN"},{name:"SHANNON"},{name:"TANENBAUM"}]
let maj = [{name:"GISTRE"},{name:"GITM"},{name:"IMAGE"},{name:"MTI"},{name:"RDI"},{name:"SCIA"},{name:"SIGL"},{name:"SRS"},{name:"TCOM"}]

export let classes = writable(s1.concat(s1F,s2,s2F,s3,s3E,s4,ing,maj))
export let totalCourses = writable([])

export let WEEKLY_CUSTOM_THEME = writable({
    // week header 'dayname'
    'week.dayname.height': '41px',
    'week.dayname.borderTop': '1px solid #f3f4f6',
    'week.dayname.borderBottom': '1px solid #f3f4f6',
    'week.dayname.borderLeft': '1px solid #f3f4f6',
    'week.dayname.paddingLeft': '5px',
    'week.dayname.backgroundColor': '#f3f4f6',
    'week.dayname.textAlign': 'left',
    'week.today.color': '#1f1f1f',
    'week.pastDay.color': '#888888',

    // week vertical panel 'vpanel'
    'week.vpanelSplitter.border': '1px solid #f3f4f6',
    'week.vpanelSplitter.height': '3px',

    // week daygrid 'daygrid'
    'week.daygrid.borderRight': '1px solid #f3f4f6',
    'week.daygrid.backgroundColor': 'inherit',

    'week.daygridLeft.width': '77px',
    'week.daygridLeft.backgroundColor': '#a8def74d',
    'week.daygridLeft.paddingRight': '5px',
    'week.daygridLeft.borderRight': '1px solid #f3f4f6',

    'week.today.backgroundColor': '#d4ffed',
    'week.weekend.backgroundColor': 'inherit',

    // week timegrid 'timegrid'
    'week.timegridLeft.width': '77px',
    'week.timegridLeft.backgroundColor': '#f3f4f6',
    'week.timegridLeft.borderRight': '1px solid #f3f4f6',
    'week.timegridLeft.fontSize': '12px',
    'week.timegridLeftTimezoneLabel.height': '51px',
    'week.timegridLeftAdditionalTimezone.backgroundColor': '#fdfdfd',

    'week.timegridOneHour.height': '48px',
    'week.timegridHalfHour.height': '24px',
    'week.timegridHalfHour.borderBottom': '1px dotted #f9f9f9',
    'week.timegridHorizontalLine.borderBottom': '1px solid #eee',

    'week.timegrid.paddingRight': '0',
    'week.timegrid.borderRight': '1px solid #f3f4f6',
    'week.timegridSchedule.borderRadius': '5px',
    'week.timegridSchedule.paddingLeft': '0',

    'week.currentTime.color': '#333',
    'week.currentTime.fontSize': '12px',
    'week.currentTime.fontWeight': 'bold',

    'week.pastTime.color': '#585858',
    'week.pastTime.fontWeight': 'normal',

    'week.futureTime.color': '#333',
    'week.futureTime.fontWeight': '500',

    'week.currentTimeLinePast.border': '0px solid rgba(19, 93, 230, 0)',
    'week.currentTimeLineBullet.backgroundColor': 'transparent',
    'week.currentTimeLineToday.border': '0px solid #135de6',
    'week.currentTimeLineFuture.border': '0px solid #135de6',

    // week creation guide style

    // week daygrid schedule style
    'week.dayGridSchedule.borderRadius': '50%',
    'week.dayGridSchedule.height': '18px',
    'week.dayGridSchedule.marginTop': '2px',
    'week.dayGridSchedule.marginLeft': '10px',
    'week.dayGridSchedule.marginRight': '10px'
    });