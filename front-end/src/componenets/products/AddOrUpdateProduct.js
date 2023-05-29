import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import { useParams } from "react-router-dom";

function AddOrUpdateProduct({
  products,
  categories,
  getCategories,
  saveProduct,
  history
}) {
  const { productId } = useParams();
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
    setEditedProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "category_id" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(editedProduct).then(() => {
      history.push("/");
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
    categories: state.categoryListReducer
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);