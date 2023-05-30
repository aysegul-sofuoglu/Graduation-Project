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
    } else if (name === "price" || name === "stock") {
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
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(editedProduct).then(() => {
      navigate("/");
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
