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

func AddCategory(w http.ResponseWriter, r *http.Request) {
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	categoryCollection := project.Collection("category")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var category models.Category
		_ = json.NewDecoder(r.Body).Decode(&category)

		categoryResult, err := categoryCollection.InsertOne(ctx, bson.D{
			{Key: "category", Value: category.Category},
		})

		json.NewEncoder(w).Encode(categoryResult)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func DeleteCategory(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	categoryCollection := project.Collection("category")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	categoryCollection.DeleteOne(ctx, bson.M{"_id": objId})
}
