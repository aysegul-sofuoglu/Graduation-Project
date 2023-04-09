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

func AddCart(w http.ResponseWriter, r *http.Request) {
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cartCollection := project.Collection("cart")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var cart models.Cart
		_ = json.NewDecoder(r.Body).Decode(&cart)

		cartResult, err := cartCollection.InsertOne(ctx, bson.D{
			{Key: "user", Value: cart.User},
			{Key: "product", Value: cart.Product},
			{Key: "piece", Value: cart.Piece},
		})

		json.NewEncoder(w).Encode(cartResult)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func DeleteCart(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cartCollection := project.Collection("cart")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	cartCollection.DeleteOne(ctx, bson.M{"_id": objId})
}
