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
	r.HandleFunc("/product", server.GetProductsById).Methods("GET")                        // /product?product_id=...
	r.HandleFunc("/products-by-categoryid", server.GetProductsByCategoryId).Methods("GET") // /products-by-categoryid?category_id=...
	r.HandleFunc("/categories", (server.GetCategories)).Methods("GET")
	r.HandleFunc("/users", server.AuthorizeAdmin(server.GetUsers)).Methods("GET")
	r.HandleFunc("/orders", server.GetOrders).Methods("GET")                                   // /orders?user_id=....
	r.HandleFunc("/orders-items", server.AuthorizeSeller(server.GetOrderItems)).Methods("GET") // /orders-items?order_id=....
	r.HandleFunc("/carts", server.AuthorizeSeller(server.GetCarts)).Methods("GET")             // /carts?user_id=...
	r.HandleFunc("/addresses", server.AuthorizeSeller(server.GetAddresses)).Methods("GET")
	r.HandleFunc("/roles", server.AuthorizeAdmin(server.GetRoles)).Methods("GET")

	r.HandleFunc("/add-product", server.AddProduct).Methods("POST")
	r.HandleFunc("/add-products", server.AuthorizeSeller(server.AddProducts)).Methods("POST")
	r.HandleFunc("/add-category", server.AuthorizeAdmin(server.AddCategory)).Methods("POST")
	r.HandleFunc("/add-user", server.AddUser).Methods("POST")
	r.HandleFunc("/add-order", server.AuthorizeCustomer(server.AddOrder)).Methods("POST")
	r.HandleFunc("/add-cart", server.AuthorizeCustomer(server.AddCart)).Methods("POST")
	r.HandleFunc("/add-address", server.AuthorizeCustomer(server.AddAddress)).Methods("POST")
	r.HandleFunc("/add-to-cart", server.AuthorizeCustomer(server.AddToCart)).Methods("POST")
	r.HandleFunc("/add-role", server.AuthorizeAdmin(server.AddRole)).Methods("POST")

	r.HandleFunc("/delete-product/{id}", server.DeleteProduct).Methods("DELETE")
	r.HandleFunc("/delete-category/{id}", server.AuthorizeAdmin(server.DeleteCategory)).Methods("DELETE")
	r.HandleFunc("/delete-user/{id}", server.AuthorizeAdmin(server.DeleteUser)).Methods("DELETE")
	r.HandleFunc("/delete-order/{id}", server.AuthorizeCustomer(server.DeleteOrder)).Methods("DELETE")
	r.HandleFunc("/delete-cart/{id}", server.AuthorizeCustomer(server.DeleteCart)).Methods("DELETE")
	r.HandleFunc("/delete-address/{id}", server.AuthorizeCustomer(server.DeleteAddress)).Methods("DELETE")
	r.HandleFunc("/delete-role/{id}", server.AuthorizeAdmin(server.DeleteRole)).Methods("DELETE")

	r.HandleFunc("/update-product/{id}", server.UpdeteProduct).Methods("PUT")

	r.HandleFunc("/sign-up", server.SignupHandler).Methods("POST")
	r.HandleFunc("/login", server.LoginHandler).Methods("POST")

	handler := cors.AllowAll().Handler(r)
	fmt.Printf("server is running on port 8000")
	log.Fatal(http.ListenAndServe(":8000", handler))
}
