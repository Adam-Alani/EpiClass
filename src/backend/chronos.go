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


