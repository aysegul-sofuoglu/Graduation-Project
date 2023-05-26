import alertify from "alertifyjs";
import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}

export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function getProducts(category_id) {
  return function (dispatch) {
    let url = "http://localhost:8000/products-by-categoryid";

    if (category_id) {
      url = url + "?category_id=" + category_id;
    }

    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSuccess(result)));
  };
}

export function updateProduct(product) {
  return function (dispatch) {
    fetch("http://localhost:8000/update-product/" + product.id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch.updateProductSuccess(result);
        alertify.success("Ürün güncellendi");
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function createProduct(product) {
  return function (dispatch) {
    fetch("http://localhost:8000/add-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
    .then((response) => response.json())
    .then((result) => {
      dispatch.createProductSuccess(result);
      alertify.success("Ürün eklendi");
    })
    .catch((error) => {
      throw error;
    });
};
}
