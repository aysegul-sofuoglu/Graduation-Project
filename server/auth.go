package server

import (
	"context"
	"fmt"
	"graduationproject/models"

	"net/http"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AuthorizeCustomer(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		tokenString := r.Header.Get("Authorization")

		if tokenString == "" {
			http.Error(w, "Token boş", http.StatusUnauthorized)
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Geçersiz token")
			}

			return []byte("secret"), nil
		})

		if err != nil {
			http.Error(w, "JWT doğrulama hatası", http.StatusUnauthorized)
			return
		}

		if !token.Valid {
			http.Error(w, "Geçersiz token", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, "Geçersiz token", http.StatusUnauthorized)
			return
		}

		ID, ok := claims["userId"].(string)
		if !ok {
			http.Error(w, "Geçersiz kullanıcı", http.StatusUnauthorized)
			return
		}

		userID, err := primitive.ObjectIDFromHex(ID)

		filter := bson.M{"_id": userID}
		var user models.User
		userCollection := project.Collection("user")

		err = userCollection.FindOne(context.Background(), filter).Decode(&user)
		if err != nil {
			http.Error(w, "Kullanıcı bulunamadı", http.StatusUnauthorized)
			return
		}

		if user.Role != "customer" {
			http.Error(w, "Yetkisiz erişim", http.StatusForbidden)
			return
		}

		next.ServeHTTP(w, r)
	}
}

func AuthorizeSeller(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		tokenString := r.Header.Get("Authorization")

		if tokenString == "" {
			http.Error(w, "Token boş", http.StatusUnauthorized)
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Geçersiz token")
			}

			return []byte("secret"), nil
		})

		if err != nil {
			http.Error(w, "JWT doğrulama hatası", http.StatusUnauthorized)
			return
		}

		if !token.Valid {
			http.Error(w, "Geçersiz token", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, "Geçersiz token", http.StatusUnauthorized)
			return
		}

		ID, ok := claims["userId"].(string)
		if !ok {
			http.Error(w, "Geçersiz kullanıcı", http.StatusUnauthorized)
			return
		}

		userID, err := primitive.ObjectIDFromHex(ID)

		filter := bson.M{"_id": userID}
		var user models.User
		userCollection := project.Collection("user")

		err = userCollection.FindOne(context.Background(), filter).Decode(&user)
		if err != nil {
			http.Error(w, "Kullanıcı bulunamadı", http.StatusUnauthorized)
			return
		}

		if user.Role != "seller" {
			http.Error(w, "Yetkisiz erişim", http.StatusForbidden)
			return
		}

		next.ServeHTTP(w, r)
	}
}

func AuthorizeAdmin(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		tokenString := r.Header.Get("Authorization")

		if tokenString == "" {
			http.Error(w, "Token boş", http.StatusUnauthorized)
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Geçersiz token")
			}

			return []byte("secret"), nil
		})

		if err != nil {
			http.Error(w, "JWT doğrulama hatası", http.StatusUnauthorized)
			return
		}

		if !token.Valid {
			http.Error(w, "Geçersiz token", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, "Geçersiz token", http.StatusUnauthorized)
			return
		}

		ID, ok := claims["userId"].(string)
		if !ok {
			http.Error(w, "Geçersiz kullanıcı", http.StatusUnauthorized)
			return
		}

		userID, err := primitive.ObjectIDFromHex(ID)

		filter := bson.M{"_id": userID}
		var user models.User
		userCollection := project.Collection("user")

		err = userCollection.FindOne(context.Background(), filter).Decode(&user)
		if err != nil {
			http.Error(w, "Kullanıcı bulunamadı", http.StatusUnauthorized)
			return
		}

		if user.Role != "admin" {
			http.Error(w, "Yetkisiz erişim", http.StatusForbidden)
			return
		}

		next.ServeHTTP(w, r)
	}
}
