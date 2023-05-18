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

func GetRoles(w http.ResponseWriter, r *http.Request) {

	categoryCollection := project.Collection("role")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := categoryCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	if err = cursor.All(ctx, &roles); err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(roles)
}

func AddRole(w http.ResponseWriter, r *http.Request) {
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	roleCollection := project.Collection("role")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var role models.Role
		_ = json.NewDecoder(r.Body).Decode(&role)

		roleResult, err := roleCollection.InsertOne(ctx, bson.D{
			{Key: "role", Value: role.Role},
		})

		json.NewEncoder(w).Encode(roleResult)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func DeleteRole(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	roleCollection := project.Collection("role")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	roleCollection.DeleteOne(ctx, bson.M{"_id": objId})
}
