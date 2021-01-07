//All colors needed for Calendar, for schedule, modify tailwind classes
export function setColors(tempCourses) {
    for (let i = 0; i < tempCourses.length; i++) {
        if (tempCourses[i][0].includes("Math")) {
            tempCourses[i].push('#9E5FFF')
        } else if (tempCourses[i][0].toUpperCase().includes("ALGO")) {
            tempCourses[i].push('#22e084')
        } else if (tempCourses[i][0].includes("Phys")) {
            tempCourses[i].push('#FF5583')
        } else if (tempCourses[i][0].includes("Elec")) {
            tempCourses[i].push('#3e51ae')
        } else if (tempCourses[i][0].includes("Archi")) {
            tempCourses[i].push('#3b91ab')
        } else if (tempCourses[i][0].includes("Prog")) {
            tempCourses[i].push('#0ca250')
        } else if (tempCourses[i][0].includes("FLE")) {
            tempCourses[i].push('#ff00dd')
        } else if (tempCourses[i][0].includes("CIE") || tempCourses[i][0].includes("TIM")) {
            tempCourses[i].push('#FFCB00')
        } else if (tempCourses[i][0].includes("Cor") || tempCourses[i][0].includes("Japon")) {
            tempCourses[i].push('#868686')
        } else {
            tempCourses[i].push('#ff7e4d')
        }
    }
    return tempCourses
}
