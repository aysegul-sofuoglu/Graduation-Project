package server

import (
	"context"
	"encoding/json"
	"graduationproject/models"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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
			{Key: "category", Value: product.Category},
			{Key: "stock", Value: product.Stock},
		})

		json.NewEncoder(w).Encode(productResult)
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
			{Key: "category", Value: product.Category},
			{Key: "stock", Value: product.Stock},
		}
		result, err := productCollection.ReplaceOne(ctx, filter, replacement)
		json.NewEncoder(w).Encode(result)
		if err != nil {
			log.Fatal(err)
		}

	}
}

func AddProducts(w http.ResponseWriter, r *http.Request) {
	var products []models.Product
	err := json.NewDecoder(r.Body).Decode(&products)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	productCollection := project.Collection("product")

	documents := make([]interface{}, len(products))
	for i, product := range products {
		documents[i] = product
	}

	_, err = productCollection.InsertMany(ctx, documents)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return success response
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Products added successfully"))
}
