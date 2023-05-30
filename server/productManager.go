package server

import (
	"context"
	"encoding/json"

	"graduationproject/models"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetProducts(w http.ResponseWriter, r *http.Request) {

	productCollection := project.Collection("product")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := productCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	if err = cursor.All(ctx, &products); err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(products)

}

func GetProductsById(w http.ResponseWriter, r *http.Request) {
	productID := r.URL.Query().Get("product_id")
	if productID == "" {
		http.Error(w, "product_id parameter is required", http.StatusBadRequest)
		return
	}

	objectID, err := primitive.ObjectIDFromHex(productID)
	if err != nil {
		http.Error(w, "Invalid product_id", http.StatusBadRequest)
		return
	}

	productCollection := project.Collection("product")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)

	cursor, err := productCollection.Find(ctx, bson.M{"_id": objectID})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var products []models.Product
	if err = cursor.All(ctx, &products); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(products) == 0 {
		http.Error(w, "No products found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(products)
}

func GetProductsByCategoryId(w http.ResponseWriter, r *http.Request) {

	categoryID := r.URL.Query().Get("category_id")

	if categoryID == "" {
		http.Error(w, "category_id parameter is required", http.StatusBadRequest)
		return
	}

	objectID, err := primitive.ObjectIDFromHex(categoryID)
	if err != nil {
		http.Error(w, "Invalid category_id", http.StatusBadRequest)
		return
	}

	productCollection := project.Collection("product")
	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)

	cursor, err := productCollection.Find(ctx, bson.M{"category": objectID})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var products []models.Product
	if err = cursor.All(ctx, &products); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(products) == 0 {
		http.Error(w, "No products found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(products)
}

func AddProduct(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	productCollection := project.Collection("product")

	if r.Method == "POST" {
		w.Header().Set("Content-Type", "application/json")
		var product models.Product
		_ = json.NewDecoder(r.Body).Decode(&product)

		productResult, err := productCollection.InsertOne(ctx, bson.D{
			{Key: "name", Value: product.Name},
			{Key: "detail", Value: product.Detail},
			{Key: "price", Value: product.Price},
			{Key: "category", Value: product.Category},
			{Key: "stock", Value: product.Stock},
		})

		json.NewEncoder(w).Encode(productResult)
		if err != nil {
			log.Fatal(err)
		}

	}
}

func DeleteProduct(w http.ResponseWriter, r *http.Request) {

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	productCollection := project.Collection("product")

	id := mux.Vars(r)["id"]
	objId, _ := primitive.ObjectIDFromHex(id)
	productCollection.DeleteOne(ctx, bson.M{"_id": objId})
}

func UpdeteProduct(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPut {
		http.Error(w, "Geçersiz istek metodu", http.StatusBadRequest)
		return
	}

	vars := mux.Vars(r)
	id := vars["id"]

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	productCollection := project.Collection("product")

	var product models.Product
	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
		http.Error(w, "Geçersiz ürün verisi", http.StatusBadRequest)
		return
	}

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "Geçersiz ürün ID'si", http.StatusBadRequest)
		return
	}

	filter := bson.M{"_id": objID}

	update := bson.M{
		"$set": bson.M{
			"name":     product.Name,
			"detail":   product.Detail,
			"price":    product.Price,
			"category": product.Category,
			"stock":    product.Stock,
		},
	}

	result, err := productCollection.UpdateOne(ctx, filter, update)
	if err != nil {
		http.Error(w, "Ürün güncelleme hatası", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"matchedCount":  result.MatchedCount,
		"modifiedCount": result.ModifiedCount,
		"upsertedCount": result.UpsertedCount,
		"upsertedID":    result.UpsertedID,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)

}

func AddProducts(w http.ResponseWriter, r *http.Request) {
	var products []models.Product
	err := json.NewDecoder(r.Body).Decode(&products)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	productCollection := project.Collection("product")

	documents := make([]interface{}, len(products))
	for i, product := range products {
		documents[i] = product
	}

	_, err = productCollection.InsertMany(ctx, documents)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Products added successfully"))
}
