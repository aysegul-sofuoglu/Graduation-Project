import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import { useParams, useNavigate } from "react-router-dom";

function AddOrUpdateProduct({
  products,
  categories,
  getCategories,
  saveProduct,
}) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [editedProduct, setEditedProduct] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    const product = getProductById(products, productId);
    setEditedProduct({ ...product });
  }, [productId, categories, getCategories, products]);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "category_id") {
      const selectedCategory = categories.find(
        (category) => category.id === value
      );
      const categoryId = selectedCategory ? selectedCategory.id : "";
      setEditedProduct((previousProduct) => ({
        ...previousProduct,
        [name]: categoryId,
      }));
    } else if (name === "price" || name === "stock" || name === "supply_cost") {
      setEditedProduct((previousProduct) => ({
        ...previousProduct,
        [name]: parseInt(value, 10),
      }));
    } else {
      setEditedProduct((previousProduct) => ({
        ...previousProduct,
        [name]: value,
      }));
    }

    validate(name, value);
  }

  function validate(name, value) {
    if (value === "") {
      if (name === "name") {
        setErrors((previousErrors) => ({
          ...previousErrors,
          name: "Ürün ismi olmalıdır.",
        }));
      }
      if (name === "detail") {
        setErrors((previousErrors) => ({
          ...previousErrors,
          detail: "Ürün detayı olmalıdır.",
        }));
      }
      if (name === "price") {
        setErrors((previousErrors) => ({
          ...previousErrors,
          price: "Ürün fiyatı olmalıdır.",
        }));
      }
      if (name === "stock") {
        setErrors((previousErrors) => ({
          ...previousErrors,
          stock: "Ürün stok bilgisi olmalıdır.",
        }));
      }
      if (name === "category_id") {
        setErrors((previousErrors) => ({
          ...previousErrors,
          category_id: "Ürün kategori bilgisi olmalıdır.",
        }));
      }
      if (name === "supply_cost") {
        setErrors((previousErrors) => ({
          ...previousErrors,
          supply_cost: "Ürün tedarik bilgisi olmalıdır.",
        }));
      }
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        name: "",
        detail: "",
        price: "",
        stock: "",
        category_id: "",
        supply_cost: "",
      }));
    }
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(editedProduct).then(() => {
      navigate("/");
      window.location.reload();
    });
  }

  if (!editedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <ProductDetail
      product={editedProduct}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

function getProductById(products, productId) {
  return products.find((product) => product.id === productId) || null;
}

function mapStateToProps(state) {
  return {
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
