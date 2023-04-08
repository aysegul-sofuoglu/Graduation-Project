package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Category struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Category string             `bson:"category,omitempty" json:"category"`
}
