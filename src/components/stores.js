import { writable} from "svelte/store";

//==========Date variables==============//

export let currWeek = writable(0);
export let prevWeek = writable(0);
export let currDay = writable(0);
export let currDayStr = writable((new Date()).getDay());
export let weekDays = writable(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
export let classData = writable({"daily":[{"date":"2021-01-06T23:00:00Z","courses":[{"name":"Physique","start_date":"2021-01-07T09:00:00Z","end_date":"2021-01-07T10:00:00Z","duration":60,"staff":["Mtir Ines"]},{"name":"Physique","start_date":"2021-01-07T10:00:00Z","end_date":"2021-01-07T11:00:00Z","duration":60,"staff":["Mtir Ines"]},{"name":"Mathématiques","start_date":"2021-01-07T11:00:00Z","end_date":"2021-01-07T12:00:00Z","duration":60,"staff":["Euvrard Guillaume"]},{"name":"Mathématiques","start_date":"2021-01-07T12:00:00Z","end_date":"2021-01-07T13:00:00Z","duration":60,"staff":["Euvrard Guillaume"]},{"name":"Electronique CM","start_date":"2021-01-07T14:00:00Z","end_date":"2021-01-07T15:00:00Z","duration":60,"staff":["Kale Sayi Kenny"]},{"name":"Programmation","start_date":"2021-01-07T15:00:00Z","end_date":"2021-01-07T16:00:00Z","duration":60,"staff":null},{"name":"Programmation","start_date":"2021-01-07T16:00:00Z","end_date":"2021-01-07T17:00:00Z","duration":60,"staff":null},{"name":"Programmation","start_date":"2021-01-07T17:00:00Z","end_date":"2021-01-07T18:00:00Z","duration":60,"staff":null},{"name":"Soutien ALGO","start_date":"2021-01-07T18:00:00Z","end_date":"2021-01-07T20:00:00Z","duration":120,"staff":null}]},{"date":"2021-01-07T23:00:00Z","courses":[{"name":"Mathématiques CM","start_date":"2021-01-08T09:00:00Z","end_date":"2021-01-08T10:00:00Z","duration":60,"staff":["Gomez Félix"]},{"name":"Mathématiques CM","start_date":"2021-01-08T10:00:00Z","end_date":"2021-01-08T11:00:00Z","duration":60,"staff":["Gomez Félix"]},{"name":"Physique CM","start_date":"2021-01-08T11:00:00Z","end_date":"2021-01-08T12:00:00Z","duration":60,"staff":["Mtir Ines"]},{"name":"Algorithmique CM","start_date":"2021-01-08T13:00:00Z","end_date":"2021-01-08T14:00:00Z","duration":60,"staff":["Boullay Christophe"]},{"name":"Back to basic Archi","start_date":"2021-01-08T17:00:00Z","end_date":"2021-01-08T19:00:00Z","duration":120,"staff":null},{"name":"Back to basic Algo","start_date":"2021-01-08T19:30:00Z","end_date":"2021-01-08T20:30:00Z","duration":60,"staff":null}]},{"date":"2021-01-10T23:00:00Z","courses":[{"name":"QCM DISTANCIEL","start_date":"2021-01-11T10:00:00Z","end_date":"2021-01-11T11:45:00Z","duration":105,"staff":null},{"name":"Architecture","start_date":"2021-01-11T13:00:00Z","end_date":"2021-01-11T14:00:00Z","duration":60,"staff":["Bouchet David"]},{"name":"Architecture","start_date":"2021-01-11T14:00:00Z","end_date":"2021-01-11T15:00:00Z","duration":60,"staff":["Bouchet David"]},{"name":"Algorithmique","start_date":"2021-01-11T15:00:00Z","end_date":"2021-01-11T16:00:00Z","duration":60,"staff":["Parquier Claire"]},{"name":"Algorithmique","start_date":"2021-01-11T16:00:00Z","end_date":"2021-01-11T17:00:00Z","duration":60,"staff":["Parquier Claire"]},{"name":"Coréen","start_date":"2021-01-11T18:30:00Z","end_date":"2021-01-11T20:30:00Z","duration":120,"staff":null}]},{"date":"2021-01-11T23:00:00Z","courses":[{"name":"Electronique","start_date":"2021-01-12T10:00:00Z","end_date":"2021-01-12T11:00:00Z","duration":60,"staff":["Kale Sayi Kenny"]},{"name":"Electronique","start_date":"2021-01-12T11:00:00Z","end_date":"2021-01-12T12:00:00Z","duration":60,"staff":["Kale Sayi Kenny"]},{"name":"Mathématiques","start_date":"2021-01-12T13:00:00Z","end_date":"2021-01-12T14:00:00Z","duration":60,"staff":["Euvrard Guillaume"]},{"name":"Mathématiques","start_date":"2021-01-12T14:00:00Z","end_date":"2021-01-12T15:00:00Z","duration":60,"staff":["Euvrard Guillaume"]},{"name":"Mathématiques","start_date":"2021-01-12T15:00:00Z","end_date":"2021-01-12T16:00:00Z","duration":60,"staff":["Euvrard Guillaume"]},{"name":"FLE","start_date":"2021-01-12T16:00:00Z","end_date":"2021-01-12T17:00:00Z","duration":60,"staff":["Galicher Alexandra"]},{"name":"TE","start_date":"2021-01-12T16:00:00Z","end_date":"2021-01-12T17:00:00Z","duration":60,"staff":["Le Collen Klervi"]},{"name":"FLE","start_date":"2021-01-12T17:00:00Z","end_date":"2021-01-12T18:00:00Z","duration":60,"staff":["Galicher Alexandra"]},{"name":"TE","start_date":"2021-01-12T17:00:00Z","end_date":"2021-01-12T18:00:00Z","duration":60,"staff":["Le Collen Klervi"]},{"name":"Japonais","start_date":"2021-01-12T18:00:00Z","end_date":"2021-01-12T20:00:00Z","duration":120,"staff":null}]},{"date":"2021-01-12T23:00:00Z","courses":[{"name":"Algorithmique","start_date":"2021-01-13T09:00:00Z","end_date":"2021-01-13T10:00:00Z","duration":60,"staff":["Parquier Claire"]},{"name":"Algorithmique","start_date":"2021-01-13T10:00:00Z","end_date":"2021-01-13T11:00:00Z","duration":60,"staff":["Parquier Claire"]},{"name":"CIE","start_date":"2021-01-13T11:00:00Z","end_date":"2021-01-13T12:00:00Z","duration":60,"staff":["Frank Fuji"]},{"name":"TIM","start_date":"2021-01-13T12:00:00Z","end_date":"2021-01-13T13:00:00Z","duration":60,"staff":["Frank Steve"]},{"name":"Mathématiques CM","start_date":"2021-01-13T14:00:00Z","end_date":"2021-01-13T15:00:00Z","duration":60,"staff":["Gomez Félix"]},{"name":"FLE","start_date":"2021-01-13T15:00:00Z","end_date":"2021-01-13T16:00:00Z","duration":60,"staff":["Galicher Alexandra"]},{"name":"FLE","start_date":"2021-01-13T16:00:00Z","end_date":"2021-01-13T17:00:00Z","duration":60,"staff":["Galicher Alexandra"]},{"name":"Soutien ALGO","start_date":"2021-01-13T18:00:00Z","end_date":"2021-01-13T20:00:00Z","duration":120,"staff":null}]},{"date":"2021-01-13T23:00:00Z","courses":[{"name":"Physique","start_date":"2021-01-14T09:00:00Z","end_date":"2021-01-14T10:00:00Z","duration":60,"staff":["Mtir Ines"]},{"name":"Physique","start_date":"2021-01-14T10:00:00Z","end_date":"2021-01-14T11:00:00Z","duration":60,"staff":["Mtir Ines"]},{"name":"Mathématiques","start_date":"2021-01-14T11:00:00Z","end_date":"2021-01-14T12:00:00Z","duration":60,"staff":["Euvrard Guillaume"]},{"name":"Mathématiques","start_date":"2021-01-14T12:00:00Z","end_date":"2021-01-14T13:00:00Z","duration":60,"staff":["Euvrard Guillaume"]},{"name":"Electronique CM","start_date":"2021-01-14T14:00:00Z","end_date":"2021-01-14T15:00:00Z","duration":60,"staff":["Kale Sayi Kenny"]},{"name":"Programmation","start_date":"2021-01-14T15:00:00Z","end_date":"2021-01-14T16:00:00Z","duration":60,"staff":null},{"name":"Programmation","start_date":"2021-01-14T16:00:00Z","end_date":"2021-01-14T17:00:00Z","duration":60,"staff":null},{"name":"Programmation","start_date":"2021-01-14T17:00:00Z","end_date":"2021-01-14T18:00:00Z","duration":60,"staff":null}]},{"date":"2021-01-14T23:00:00Z","courses":[{"name":"Mathématiques CM","start_date":"2021-01-15T09:00:00Z","end_date":"2021-01-15T10:00:00Z","duration":60,"staff":["Gomez Félix"]},{"name":"Mathématiques CM","start_date":"2021-01-15T10:00:00Z","end_date":"2021-01-15T11:00:00Z","duration":60,"staff":["Gomez Félix"]},{"name":"Physique CM","start_date":"2021-01-15T11:00:00Z","end_date":"2021-01-15T12:00:00Z","duration":60,"staff":["Mtir Ines"]},{"name":"Algorithmique CM","start_date":"2021-01-15T13:00:00Z","end_date":"2021-01-15T14:00:00Z","duration":60,"staff":["Boullay Christophe"]}]},{"date":"2021-01-17T23:00:00Z","courses":[{"name":"Partiels SUP","start_date":"2021-01-18T08:00:00Z","end_date":"2021-01-18T18:00:00Z","duration":600,"staff":null}]},{"date":"2021-01-18T23:00:00Z","courses":[{"name":"Partiels SUP","start_date":"2021-01-19T08:00:00Z","end_date":"2021-01-19T18:00:00Z","duration":600,"staff":null}]},{"date":"2021-01-19T23:00:00Z","courses":[{"name":"Partiels SUP","start_date":"2021-01-20T08:00:00Z","end_date":"2021-01-20T18:00:00Z","duration":600,"staff":null}]},{"date":"2021-01-20T23:00:00Z","courses":[{"name":"Partiels SUP","start_date":"2021-01-21T08:00:00Z","end_date":"2021-01-21T18:00:00Z","duration":600,"staff":null}]},{"date":"2021-01-21T23:00:00Z","courses":[{"name":"Partiels SUP","start_date":"2021-01-22T08:00:00Z","end_date":"2021-01-22T18:00:00Z","duration":600,"staff":null}]}]});

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

export let selectedClass = writable(["Select Class. Default: S1A1-1"])
let s1 = getClasses(1,'A' ,'E', 2, false);
let s1F = getClasses(1,'F' ,'F', 1, false);

let s2 = getClasses(2,'A','E', 2,false)
let s2F = getClasses(1,'F' ,'F', 1, false);

let s3 = getClasses(3,'A','D', 2,false);
let s3E = getClasses(3,'E','E', 1,false);

let s4 = getClasses(4,'A','D', 2,false)

export let classes = writable(s1.concat(s1F,s2,s2F,s3,s3E,s4))
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