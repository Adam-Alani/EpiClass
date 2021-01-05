package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	//"strings"

)

const (
	endpoint = "https://v2ssl.webservices.chronos.epita.net/api/v2"
)


func main() {
	url := "http://restapi3.apiary.io/notes"
	fmt.Println("URL:>", url)

	var jsonStr = []byte(`{"title":"Buy cheese and bread for breakfast."}`)
	req, err := http.NewRequest("POST", endpoint, bytes.NewBuffer(jsonStr))
	req.Header.Set("name", "test")
	req.Header.Set("password", "test")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	fmt.Println("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))
}