package server

import (
	"context"
	"fmt"
	"graduationproject/models"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var products []models.Product
var categories []models.Category
var users []models.User
var orders []models.Order
var orderItems []models.ProductOrder
var carts []models.Cart
var addresses []models.Address

func InitiateMongoClient() *mongo.Client {

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

var conn = InitiateMongoClient()

var project = conn.Database("Project")
