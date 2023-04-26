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
	"go.mongodb.org/mongo-driver/mongo"
)

func GetCarts(w http.ResponseWriter, r *http.Request) {

	userID := r.URL.Query().Get("user_id")

	if userID == "" {
		http.Error(w, "user_id parameter is required", http.StatusBadRequest)
		return
	}

	cartCollection := project.Collection("cart")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)

	cursor, err := cartCollection.Find(ctx, bson.M{"user": userID})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var carts []models.Cart
	if err = cursor.All(ctx, &carts); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(carts) == 0 {
		http.Error(w, "No carts found", http.StatusNotFound)
		return
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
			{Key: "items", Value: cart.Items},
		})

		json.NewEncoder(w).Encode(cartResult)
		if err != nil {
			log.Fatal(err)
		}
	}
}

// ???????????????????????
func DeleteCart(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cartCollection := project.Collection("cart")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	cartCollection.DeleteOne(ctx, bson.M{"_id": objId})

}

//???????????????????????????

func AddToCart(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)

	cartCollection := project.Collection("cart")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")

		var cartItem models.CartItem
		if err := json.NewDecoder(r.Body).Decode(&cartItem); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		userID := r.URL.Query().Get("user_id")

		if userID == "" {
			http.Error(w, "user_id parameter is required", http.StatusBadRequest)
			return
		}

		var cart models.Cart

		if err := cartCollection.FindOne(ctx, bson.M{"user": userID}).Decode(&cart); err != nil {

			if err == mongo.ErrNoDocuments {

				cart = models.Cart{
					User:  userID,
					Items: []models.CartItem{cartItem},
				}

				if _, err := cartCollection.InsertOne(ctx, cart); err != nil {
					http.Error(w, err.Error(), http.StatusInternalServerError)
					return
				}
			} else {

				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

		} else {

			update := bson.M{"$push": bson.M{"items": cartItem}}
			if _, err := cartCollection.UpdateOne(ctx, bson.M{"user": userID}, update); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Item added to the cart"))

	}

}
