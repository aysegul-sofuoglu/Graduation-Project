package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name       string             `bson:"name,omitempty" json:"name"`
	Detail     string             `bson:"detail,omitempty" json:"detail"`
	Price      float64            `bson:"price,omitempty" json:"price"`
	CategoryID primitive.ObjectID `bson:"category_id,omitempty" json:"category_id"`
	Stock      int                `bson:"stock,omitempty" json:"stock"`
}
