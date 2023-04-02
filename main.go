package main

import (
	"fmt"
	"graduationproject/server"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {

	r := mux.NewRouter()

	r.HandleFunc("/products", server.GetProducts).Methods("GET")
	r.HandleFunc("/add-product", server.AddProduct).Methods("POST")
	r.HandleFunc("/add-category", server.AddCategory).Methods("POST")

	handler := cors.AllowAll().Handler(r)
	fmt.Printf("server is running on port 8000")
	log.Fatal(http.ListenAndServe(":8000", handler))
}
