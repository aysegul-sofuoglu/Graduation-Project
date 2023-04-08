package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Cart struct {
	ID      primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	User    primitive.ObjectID `bson:"user,omitempty" json:"user_id"`
	Product primitive.ObjectID `bson:"product,omitempty" json:"product_id"`
	Piece   int                `bson:"piece,omitempty" json:"piece"`
}
