package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Order struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	User       string             `bson:"user,omitempty" json:"user_id"`
	Products   []ProductOrder     `bson:"products,omitempty" json:"products"`
	TotalPrice float64            `bson:"totalPrice,omitempty" json:"total_price"`
}

type ProductOrder struct {
	ProductID primitive.ObjectID `bson:"product_id,omitempty" json:"id"`
	Quantity  int                `bson:"quantity,omitempty"`
}
