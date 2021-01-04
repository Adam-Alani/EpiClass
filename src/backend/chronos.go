package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"log"

)

const (
	endpoint = "https://v2ssl.webservices.chronos.epita.net/api/v2"
)

func main() {
	response, err := http.Get("https://v2ssl.webservices.chronos.epita.net/api/v2")
	if err != nil {
		fmt.Print(err.Error())
		os.Exit(1)
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(responseData))

}
