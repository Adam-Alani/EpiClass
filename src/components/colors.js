//All colors needed for Calendar, for schedule, modify tailwind classes

let purple = ["Math","Imag","DEVOPS"];
let green = ["ALGO","Prévenir"];
let pink = ["Phys","PFE"];
let cyan = ["Elec","Santé"];
let blue = ["Archi","IT"];
let dgreen = ["Prog","Analyser"];
let dpink = ["FLE" , "TE" , "Perm"];
let red = ["CIE","TIM","Techno"];
let gray = ["Cor","Jap","Comm"];
let yellow = ["QCM" , "Business"];

export function setColors(tempCourses) {
    for (let i = 0; i < tempCourses.length; i++) {
        if (pastDate(tempCourses[i][1])) {
            tempCourses[i].push('#9CA3AF')
        } else if (purple.some(el => tempCourses[i][0].toUpperCase().includes(el.toUpperCase()))) {
            tempCourses[i].push('#9e5fff')
        } else if (green.some(el => tempCourses[i][0].toUpperCase().includes(el.toUpperCase()))) {
            tempCourses[i].push('#22e084')
        } else if (pink.some(el => tempCourses[i][0].toUpperCase().includes(el.toUpperCase()))) {
            tempCourses[i].push('#FF5AC4')
        } else if (cyan.some(el => tempCourses[i][0].toUpperCase().includes(el.toUpperCase()))) {
            tempCourses[i].push('#5AC8F8')
        } else if (blue.some(el => tempCourses[i][0].toUpperCase().includes(el.toUpperCase()))) {
            tempCourses[i].push('#3b91ab')
        } else if (dgreen.some(el => tempCourses[i][0].toUpperCase().includes(el.toUpperCase()))) {
            tempCourses[i].push('#0ca250')
        } else if (dpink.some(el => tempCourses[i][0].toUpperCase().includes(el.toUpperCase()))) {
            tempCourses[i].push('#FF158A')
        } else if (red.some(el => tempCourses[i][0].toUpperCase().includes(el.toUpperCase()))) {
            tempCourses[i].push('#ff4d4d')
        } else if (gray.some(el => tempCourses[i][0].toUpperCase().includes(el.toUpperCase()))) {
            tempCourses[i].push('#868686')
        } else if (yellow.some(el => tempCourses[i][0].toUpperCase().includes(el.toUpperCase()))) {
            tempCourses[i].push('#ffd849')
        } else {
            tempCourses[i].push('#78cf13')
        }
    }
    return tempCourses
}

function pastDate(inpDate) {
    let endDate = new  Date(inpDate);
    let now = new Date();
    return endDate < now;
}
