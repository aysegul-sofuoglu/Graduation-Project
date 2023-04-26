package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Cart struct {
	ID    primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	User  string             `bson:"user" json:"user_id"`
	Items []CartItem         `bson:"items" json:"items"`
}

type CartItem struct {
	ProductID string `bson:"product_id" json:"product_id"`
	Quantity  int    `bson:"quantity" json:"quantity"`
}
