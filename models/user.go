package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	FirstName    string             `bson:"firstName,omitempty" json:"first_name"`
	LastName     string             `bson:"lastName,omitempty" json:"last_name"`
	UserName     string             `bson:"userName,omitempty" json:"user_name"`
	UserPassword string             `bson:"userPassword,omitempty" json:"user_password"`
	Mail         string             `bson:"mail,omitempty" json:"mail"`
	Address      primitive.ObjectID `bson:"address,omitempty" json:"address_id"`
	Role         string             `bson:"role,omitempty" json:"role"`
}
