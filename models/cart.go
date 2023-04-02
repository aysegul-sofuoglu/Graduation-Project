package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Cart struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID    primitive.ObjectID `bson:"userID,omitempty" json:"user_id"`
	ProductID primitive.ObjectID `bson:"productID,omitempty" json:"product_id"`
	Piece     int                `bson:"piece,omitempty" json:"piece"`
}
