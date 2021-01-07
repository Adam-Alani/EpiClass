//All colors needed for Calendar, for schedule, modify tailwind classes
export function setColors(tempCourses) {
    for (let i = 0; i < tempCourses.length; i++) {
        if (pastDate(tempCourses[i][1])) {
            tempCourses[i].push('#9CA3AF')
        } else if (tempCourses[i][0].includes("Math")) {
            tempCourses[i].push('#9e5fff')
        } else if (tempCourses[i][0].toUpperCase().includes("ALGO")) {
            tempCourses[i].push('#22e084')
        } else if (tempCourses[i][0].includes("Phys")) {
            tempCourses[i].push('#FF5AC4')
        } else if (tempCourses[i][0].includes("Elec")) {
            tempCourses[i].push('#5AC8F8')
        } else if (tempCourses[i][0].includes("Archi")) {
            tempCourses[i].push('#3b91ab')
        } else if (tempCourses[i][0].includes("Prog")) {
            tempCourses[i].push('#0ca250')
        } else if (tempCourses[i][0].includes("FLE")) {
            tempCourses[i].push('#FF158A')
        } else if (tempCourses[i][0].includes("CIE") || tempCourses[i][0].includes("TIM")) {
            tempCourses[i].push('#ff4d4d')
        } else if (tempCourses[i][0].includes("Cor") || tempCourses[i][0].includes("Japon")) {
            tempCourses[i].push('#868686')
        } else {
            tempCourses[i].push('#ff8949')
        }
    }
    return tempCourses
}

function pastDate(inpDate) {
    let endDate = new  Date(inpDate);
    let now = new Date();
    return endDate < now;
}
