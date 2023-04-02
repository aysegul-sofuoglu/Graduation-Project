package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Order struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID     primitive.ObjectID `bson:"userId,omitempty" json:"user_id"`
	TotalPrice float64            `bson:"totalPrice,omitempty" json:"total_price"`
	AddressID  primitive.ObjectID `bson:"address_id,omitempty json:address_id"`
}
