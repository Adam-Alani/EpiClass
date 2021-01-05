package main

import (
	"encoding/json"
	"net/http"
)


func runServer(w http.ResponseWriter, request *http.Request) {

	days := fetchAPI("Planning/GetRangeWeekRecursive/INFOS1A1-1/10")
	formatted := getData(days)

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(formatted); err != nil {
		panic(err)
	}
}

func main() {
	http.HandleFunc("/", runServer)
	http.ListenAndServe(":8090",nil)
}