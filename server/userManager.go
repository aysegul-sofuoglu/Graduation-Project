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
			{Key: "address", Value: user.Address},
		})

		json.NewEncoder(w).Encode(userResult)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	userCollection := project.Collection("user")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	userCollection.DeleteOne(ctx, bson.M{"_id": objId})
}
