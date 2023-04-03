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
	r.HandleFunc("/categories", server.GetCategories).Methods("GET")
	r.HandleFunc("/users", server.GetUsers).Methods("GET")
	r.HandleFunc("/orders", server.GetOrders).Methods("GET")
	r.HandleFunc("/carts", server.GetCarts).Methods("GET")
	r.HandleFunc("/addresses", server.GetAddresses).Methods("GET")
	r.HandleFunc("/add-product", server.AddProduct).Methods("POST")
	r.HandleFunc("/add-category", server.AddCategory).Methods("POST")
	r.HandleFunc("/add-user", server.AddUser).Methods("POST")
	r.HandleFunc("/add-order", server.AddOrder).Methods("POST")
	r.HandleFunc("/add-cart", server.AddCart).Methods("POST")
	r.HandleFunc("/add-address", server.AddAddress).Methods("POST")
	r.HandleFunc("/delete-product/{id}", server.DeleteProduct).Methods("DELETE")

	handler := cors.AllowAll().Handler(r)
	fmt.Printf("server is running on port 8000")
	log.Fatal(http.ListenAndServe(":8000", handler))
}
