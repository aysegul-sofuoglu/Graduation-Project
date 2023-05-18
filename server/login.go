package server

import (
	"context"
	"encoding/json"
	"graduationproject/models"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func SignupHandler(w http.ResponseWriter, r *http.Request) {

	userCollection := project.Collection("user")

	var form models.User
	err := json.NewDecoder(r.Body).Decode(&form)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(form.UserPassword), 10)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	newUser := bson.M{
		"first_name":    form.FirstName,
		"last_name":     form.LastName,
		"user_name":     form.UserName,
		"user_password": hashedPassword,
		"mail":          form.Mail,
		"address":       form.Address,
		"role":          form.Role,
	}

	result, err := userCollection.InsertOne(context.Background(), newUser)
	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"userId": result.InsertedID,
	}
	json.NewEncoder(w).Encode(response)

}

func LoginHandler(w http.ResponseWriter, r *http.Request) {

	userCollection := project.Collection("user")

	var form models.User
	err := json.NewDecoder(r.Body).Decode(&form)

	filter := bson.M{"mail": form.Mail}
	var user bson.M
	err = userCollection.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid email or password1", http.StatusUnauthorized)
		return
	}

	var usr models.User
	err = userCollection.FindOne(context.Background(), filter).Decode(&usr)
	if err != nil {
		http.Error(w, "Invalid email or password2", http.StatusUnauthorized)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(usr.UserPassword), []byte(form.UserPassword))
	if err != nil {
		http.Error(w, "Invalid email or password3", http.StatusUnauthorized)
		return
	}
	// userPass := user["user_password"]
	// stringObjectID := userPass.(primitive.Binary).Data
	// err = bcrypt.CompareHashAndPassword(stringObjectID, []byte(form.UserPassword))
	// if err != nil {
	// 	http.Error(w, "Invalid email or password", http.StatusUnauthorized)
	// 	return
	// }

	claims := jwt.MapClaims{}
	claims["userId"] = user["_id"].(primitive.ObjectID).Hex()
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
	claims["role"] = user["role"]
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte("secret"))
	if err != nil {
		http.Error(w, "Failed to create JWT", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"token": signedToken,
	}

	json.NewEncoder(w).Encode(response)
}
