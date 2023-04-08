package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Order struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	User       primitive.ObjectID `bson:"user,omitempty" json:"user_id"`
	TotalPrice float64            `bson:"totalPrice,omitempty" json:"total_price"`
	Address    primitive.ObjectID `bson:"address,omitempty json:address_id"`
}
