package server

import (
	"context"
	"encoding/json"
	"fmt"
	"graduationproject/models"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var products []models.Product
var categories []models.Category
var users []models.User
var orders []models.Order
var carts []models.Cart
var addresses []models.Address

func InıtiateMongoClient() *mongo.Client {

	var err error
	var client *mongo.Client
	uri := "mongodb://localhost:27017"
	opts := options.Client()
	opts.ApplyURI(uri)
	if client, err = mongo.Connect(context.Background(), opts); err != nil {
		fmt.Println(err.Error())
	}
	return client
}

var conn = InıtiateMongoClient()

var project = conn.Database("Project")

func GetProducts(w http.ResponseWriter, r *http.Request) {

	productCollection := project.Collection("product")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := productCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	if err = cursor.All(ctx, &products); err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(products)

}

func GetCategories(w http.ResponseWriter, r *http.Request) {

	categoryCollection := project.Collection("category")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := categoryCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	if err = cursor.All(ctx, &categories); err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(categories)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {

	userCollection := project.Collection("user")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := userCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	if err = cursor.All(ctx, &users); err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(users)
}

func GetOrders(w http.ResponseWriter, r *http.Request) {

	orderCollection := project.Collection("order")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := orderCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	if err = cursor.All(ctx, &orders); err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(orders)
}

func GetCarts(w http.ResponseWriter, r *http.Request) {

	cartCollection := project.Collection("cart")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := cartCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	if err = cursor.All(ctx, &carts); err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(carts)
}

func GetAddresses(w http.ResponseWriter, r *http.Request) {

	addressCollection := project.Collection("address")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := addressCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	if err = cursor.All(ctx, &addresses); err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(addresses)
}

func AddProduct(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	productCollection := project.Collection("product")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var product models.Product
		_ = json.NewDecoder(r.Body).Decode(&product)

		productResult, err := productCollection.InsertOne(ctx, bson.D{
			{Key: "name", Value: product.Name},
			{Key: "detail", Value: product.Detail},
			{Key: "price", Value: product.Price},
			{Key: "category_id", Value: product.CategoryID},
			{Key: "stock", Value: product.Stock},
		})

		json.NewEncoder(w).Encode(productResult)
		if err != nil {
			log.Fatal(err)
		}

	}
}

func AddCategory(w http.ResponseWriter, r *http.Request) {
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	categoryCollection := project.Collection("category")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var category models.Category
		_ = json.NewDecoder(r.Body).Decode(&category)

		categoryResult, err := categoryCollection.InsertOne(ctx, bson.D{
			{Key: "name", Value: category.Name},
		})

		json.NewEncoder(w).Encode(categoryResult)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func AddUser(w http.ResponseWriter, r *http.Request) {
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	userCollection := project.Collection("user")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var user models.User
		_ = json.NewDecoder(r.Body).Decode(&user)

		userResult, err := userCollection.InsertOne(ctx, bson.D{
			{Key: "first_name", Value: user.FirstName},
			{Key: "last_name", Value: user.LastName},
			{Key: "user_name", Value: user.UserName},
			{Key: "user_password", Value: user.UserPassword},
			{Key: "mail", Value: user.Mail},
			{Key: "address_id", Value: user.AddressID},
		})

		json.NewEncoder(w).Encode(userResult)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func AddOrder(w http.ResponseWriter, r *http.Request) {
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	orderCollection := project.Collection("order")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var order models.Order
		_ = json.NewDecoder(r.Body).Decode(&order)

		orderResult, err := orderCollection.InsertOne(ctx, bson.D{
			{Key: "user_id", Value: order.UserID},
			{Key: "total_price", Value: order.TotalPrice},
			{Key: "address_id", Value: order.AddressID},
		})

		json.NewEncoder(w).Encode(orderResult)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func AddCart(w http.ResponseWriter, r *http.Request) {
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cartCollection := project.Collection("cart")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var cart models.Cart
		_ = json.NewDecoder(r.Body).Decode(&cart)

		cartResult, err := cartCollection.InsertOne(ctx, bson.D{
			{Key: "user_id", Value: cart.UserID},
			{Key: "product_id", Value: cart.ProductID},
			{Key: "piece", Value: cart.Piece},
		})

		json.NewEncoder(w).Encode(cartResult)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func AddAddress(w http.ResponseWriter, r *http.Request) {
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	addressCollection := project.Collection("address")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var address models.Address
		_ = json.NewDecoder(r.Body).Decode(&address)

		addressResult, err := addressCollection.InsertOne(ctx, bson.D{
			{Key: "title", Value: address.Title},
			{Key: "user_id", Value: address.UserID},
			{Key: "first_name", Value: address.FirstName},
			{Key: "last_name", Value: address.LastName},
			{Key: "mail", Value: address.Mail},
			{Key: "telephone", Value: address.Telephone},
			{Key: "country", Value: address.Country},
			{Key: "city", Value: address.City},
			{Key: "town", Value: address.Town},
			{Key: "address", Value: address.Address},
		})

		json.NewEncoder(w).Encode(addressResult)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func DeleteProduct(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	productCollection := project.Collection("product")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	productCollection.DeleteOne(ctx, bson.M{"_id": objId})
}

func DeleteCategory(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	categoryCollection := project.Collection("category")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	categoryCollection.DeleteOne(ctx, bson.M{"_id": objId})
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	userCollection := project.Collection("user")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	userCollection.DeleteOne(ctx, bson.M{"_id": objId})
}

func DeleteOrder(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	orderCollection := project.Collection("order")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	orderCollection.DeleteOne(ctx, bson.M{"_id": objId})
}

func DeleteCart(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cartCollection := project.Collection("cart")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	cartCollection.DeleteOne(ctx, bson.M{"_id": objId})
}

func DeleteAddress(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	addressCollection := project.Collection("address")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	addressCollection.DeleteOne(ctx, bson.M{"_id": objId})
}

func UpdeteProduct(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	productCollection := project.Collection("product")

	if r.Method == "PUT" {
		w.Header().Set("Content-Type", "application/json")
		var product models.Product
		_ = json.NewDecoder(r.Body).Decode(&product)

		id := mux.Vars(r)["id"]
		objId, _ := primitive.ObjectIDFromHex(id)
		filter := bson.D{{"_id", objId}}
		replacement := bson.D{
			{Key: "name", Value: product.Name},
			{Key: "detail", Value: product.Detail},
			{Key: "price", Value: product.Price},
			{Key: "category_id", Value: product.CategoryID},
			{Key: "stock", Value: product.Stock},
		}
		result, err := productCollection.ReplaceOne(ctx, filter, replacement)
		json.NewEncoder(w).Encode(result)
		if err != nil {
			log.Fatal(err)
		}

	}
}
