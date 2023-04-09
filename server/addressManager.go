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

func AddAddress(w http.ResponseWriter, r *http.Request) {
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	addressCollection := project.Collection("address")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var address models.Address
		_ = json.NewDecoder(r.Body).Decode(&address)

		addressResult, err := addressCollection.InsertOne(ctx, bson.D{
			{Key: "title", Value: address.Title},
			{Key: "user", Value: address.User},
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

func DeleteAddress(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	addressCollection := project.Collection("address")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	addressCollection.DeleteOne(ctx, bson.M{"_id": objId})
}
