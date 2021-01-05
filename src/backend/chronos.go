package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	//"strings"

)


func fetchAPI(query string) Calendar {
	const tokenKey = "ipu2SeSGiwpa5EeB"
	var endpoint = "https://v2ssl.webservices.chronos.epita.net/api/v2/" + query


	req, err := http.NewRequest("GET", endpoint, nil)
	req.Header.Add("Auth-Token", tokenKey)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Error on response.\n[ERRO] -", err)
	}

	data, _ := ioutil.ReadAll(resp.Body)

	var responseObject []Calendar

	json.Unmarshal(data, &responseObject)

	var days Calendar
	for _, r := range responseObject {
		for _, d := range r.DayList {
			if d.DateTime.After(time.Now().Add(-time.Hour * 24)) {
				days.DayList = append(days.DayList, d)
			}
		}
	}
	return days
}



func getData(cal Calendar) Weekly {
	var formatted Weekly

	for _, d := range cal.DayList {
		day := Daily{
			Date: d.DateTime,
		}

		var currentCourse string
		var currentCourseIndex int
		for i := 0; i < len(d.CourseList); i++ {
			c := d.CourseList[i]

			if currentCourse == c.Name {
				current := &day.Courses[currentCourseIndex]

				current.Duration += c.Duration
				current.EndDate = current.StartDate.Add(time.Duration(current.Duration) * time.Minute)

				continue
			}


			course := Courses{
				Name:      c.Name,
				StartDate: c.BeginDate,
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

			currentCourse = c.Name
			currentCourseIndex = len(day.Courses) - 1
		}

		formatted.Daily = append(formatted.Daily, day)
	}
	prettyPrint(formatted)
	return formatted
}


func prettyPrint(data Weekly) {
	prettyJSON, err := json.MarshalIndent(data, "", "    ")
	if err != nil {
		log.Fatal("Failed to generate json", err)
	}
	fmt.Printf("%s\n", string(prettyJSON))
}

type Calendar struct {
	ID      int `json:"Id"`
	DayList []struct {
		CourseList []struct {
			ID        int       `json:"Id"`
			Name      string    `json:"Name"`
			BeginDate time.Time `json:"BeginDate"`
			EndDate   time.Time `json:"EndDate"`
			Duration  int       `json:"Duration"`
			StaffList []struct {
				ID       int    `json:"Id"`
				Name     string `json:"Name"`
				Type     int    `json:"Type"`
				ParentID int    `json:"ParentId"`
			} `json:"StaffList"`
			RoomList []struct {
				Rooms    interface{} `json:"Rooms"`
				ID       int         `json:"Id"`
				Name     string      `json:"Name"`
				Type     int         `json:"Type"`
				ParentID int         `json:"ParentId"`
			} `json:"RoomList"`
			GroupList []struct {
				Groups   interface{} `json:"Groups"`
				ID       int         `json:"Id"`
				Name     string      `json:"Name"`
				Type     int         `json:"Type"`
				ParentID int         `json:"ParentId"`
			} `json:"GroupList"`
			Code interface{} `json:"Code"`
			Type interface{} `json:"Type"`
			URL  interface{} `json:"Url"`
			Info interface{} `json:"Info"`
		} `json:"CourseList"`
		DateTime time.Time `json:"DateTime"`
	} `json:"DayList"`
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