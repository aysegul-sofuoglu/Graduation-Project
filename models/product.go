package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name       string             `bson:"name,omitempty" json:"name"`
	Detail     string             `bson:"detail,omitempty" json:"detail"`
	Price      float64            `bson:"price,omitempty" json:"price"`
	Category   primitive.ObjectID `bson:"category,omitempty" json:"category_id"`
	Stock      int                `bson:"stock,omitempty" json:"stock"`
	SupplyCost float64            `bson:"supplyCost,omitempty" json:"supply_cost"`
	Seller     string             `bson:"seller,omitempty" json:"seller_id"`
}
