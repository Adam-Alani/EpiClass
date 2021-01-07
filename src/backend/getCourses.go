package main

import "time"


func getData(cal Calendar) Weekly {
	var formatted Weekly

	for _, d := range cal.DayList {
		day := Daily{
			Date: d.DateTime,
		}


		for i := 0; i < len(d.CourseList); i++ {
			c := d.CourseList[i]


			course := Courses{
				Name:      c.Name,
				StartDate: c.BeginDate.Add(time.Hour),
			}

			for _, t := range c.StaffList {
				course.Staff = append(course.Staff, t.Name)
			}

			if len(course.Staff) > 10 { //Removes the 5AM lesson with all the teachers
				continue
			}


			course.Duration = c.Duration
			course.EndDate = course.StartDate.Add(time.Duration(course.Duration) * time.Minute)


			day.Courses = append(day.Courses, course)

		}

		formatted.Daily = append(formatted.Daily, day)
	}
	//prettyPrint(formatted)
	return formatted
}




type Weekly struct {
	Daily []Daily `json:"daily"`
}

type Daily struct {
	Date time.Time `json:"date"`
	Courses []Courses `json:"courses"`
}

type Courses struct {
	Name      string    `json:"name"`
	StartDate time.Time `json:"start_date"`
	EndDate   time.Time `json:"end_date"`
	Duration  int       `json:"duration"`
	Staff     []string  `json:"staff"`

}