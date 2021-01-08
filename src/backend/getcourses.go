package main

import "time"


func getData(cal Calendar) Weekly {
	var courseList Weekly

	for _, i := range cal.DayList {
		day := Daily{
			Date: i.DateTime,
		}


		for j := 0; j < len(i.CourseList); j++ {
			c := i.CourseList[j]


			course := Courses{
				Name:      c.Name,
				StartDate: c.BeginDate.Add(time.Hour),
			}

			for _, s := range c.StaffList {
				course.Staff = append(course.Staff, s.Name)
			}

			if len(course.Staff) > 6 { //Removes the 5AM lesson with all the teachers
				continue
			}


			course.Duration = c.Duration
			course.EndDate = course.StartDate.Add(time.Duration(course.Duration) * time.Minute)


			day.Courses = append(day.Courses, course)

		}

		courseList.Daily = append(courseList.Daily, day)
	}
	//prettyPrint(courseList)
	return courseList
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