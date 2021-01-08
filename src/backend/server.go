package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)



func runServer(w http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var selectedClass class
	decoder.Decode(&selectedClass)

	var days Calendar
	if len(selectedClass.ClassName) == 0 {
		days = fetchAPI("Planning/GetRangeWeekRecursive/INFOS1A1-1/10")
	} else {
		days = fetchAPI("Planning/GetRangeWeekRecursive/" + selectedClass.ClassName + "/10")
	}

	courseList := getData(days)
	fmt.Println(courseList)

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(courseList); err != nil {
		panic(err)
	}


}





func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	port := os.Getenv("PORT")

	http.HandleFunc("/", runServer)
	http.ListenAndServe(":"+port,nil)

}


type class struct {
	ClassName string `json:"name"`
}