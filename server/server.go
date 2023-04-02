package server

import (
	"context"
	"encoding/json"
	"fmt"
	"graduationproject/models"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var products []models.Product
var categories []models.Category
var users []models.User
var orders []models.Order

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

func AddProduct(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	productCollection := project.Collection("product")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var product models.Product
		_ = json.NewDecoder(r.Body).Decode(&product)

		productResult, err := productCollection.InsertOne(ctx, bson.D{
			{"name", product.Name},
			{"detail", product.Detail},
			{"price", product.Price},
			{"category_id", product.CategoryID},
			{"stock", product.Stock},
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
			{"name", category.Name},
		})

		json.NewEncoder(w).Encode(categoryResult)
		if err != nil {
			log.Fatal(err)
		}
	}
}
