package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Role struct {
	ID   primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Role string             `bson:"role,omitempty" json:"role"`
}
