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

func GetOrders(w http.ResponseWriter, r *http.Request) {

	userID := r.URL.Query().Get("user_id")

	if userID == "" {
		http.Error(w, "user_id parameter is required", http.StatusBadRequest)
		return
	}

	orderCollection := project.Collection("order")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := orderCollection.Find(ctx, bson.M{"user": userID})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var orders []models.Order
	if err = cursor.All(ctx, &orders); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(orders) == 0 {
		http.Error(w, "No orders found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(orders)
}

func GetOrderItems(w http.ResponseWriter, r *http.Request) {

	var order bson.M
	orderID := order["order_id"]

	if orderID == "" {
		http.Error(w, "order_id parameter is required", http.StatusBadRequest)
		return
	}

	itemCollection := project.Collection("order")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := itemCollection.Find(ctx, bson.M{"_id": orderID})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	items := []models.ProductOrder{}
	if err = cursor.All(ctx, &items); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(items) == 0 {
		http.Error(w, "No orders found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(items)

}

// func GetOrderItems(w http.ResponseWriter, r *http.Request) {
// 	orderID := r.URL.Query().Get("order_id")
// 	if orderID == "" {
// 		http.Error(w, "order_id parameter is required", http.StatusBadRequest)
// 		return
// 	}

// 	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
// 	orderCollection := project.Collection("order")
// 	order := orderCollection.FindOne(ctx, bson.M{"_id": orderID})

// 	if order.Err() != nil {
// 		http.Error(w, order.Err().Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	var orderDoc models.Order
// 	if err := order.Decode(&orderDoc); err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	orderItemCollection := project.Collection("order_item")
// 	cursor, err := orderItemCollection.Find(ctx, bson.M{"order_id": orderID})
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	if err = cursor.All(ctx, &orderItems); err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	json.NewEncoder(w).Encode(orderItems)

// }

func AddOrder(w http.ResponseWriter, r *http.Request) {
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	orderCollection := project.Collection("order")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var order models.Order
		_ = json.NewDecoder(r.Body).Decode(&order)

		orderResult, err := orderCollection.InsertOne(ctx, bson.D{
			{Key: "user", Value: order.User},
			{Key: "products", Value: order.Products},
			{Key: "total_price", Value: order.TotalPrice},
		})

		json.NewEncoder(w).Encode(orderResult)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func DeleteOrder(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	orderCollection := project.Collection("order")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	orderCollection.DeleteOne(ctx, bson.M{"_id": objId})
}
