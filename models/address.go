package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Address struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title     string             `bson:"title,omitempty" json:"title"`
	UserID    primitive.ObjectID `bson:"userID,omitempty" json:"user_id"`
	FirstName string             `bson:"firstName,omitempty" json:"first_name"`
	LastName  string             `bson:"lastName,omitempty" json:"last_name"`
	Mail      string             `bson:"mail,omitempty" json:"mail"`
	Telephone string             `bson:"telephone,omitempty" json:"telephone"`
	Country   string             `bson:"country,omitempty" json:"country"`
	City      string             `bson:"city,omitempty" json:"city"`
	Town      string             `bson:"town,omitempty" json:"town"`
	Address   string             `bson:"address,omitempty" json:"sddress"`
}
