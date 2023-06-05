import axios from "axios";
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

export function getProducts(categoryId) {
  return async function (dispatch) {
    let url = "http://localhost:8000/products-by-categoryid";

    if (categoryId) {
      url = url + "?category_id=" + categoryId;
    }

    try {
      const response = await fetch(url);
      const result = await response.json();
      dispatch(getProductsSuccess(result));
    } catch (error) {
     
    }
  };
}





export async function saveProductApi(product) {
  const url = product.id
    ? `http://localhost:8000/update-product/${product.id}`
    : "http://localhost:8000/add-product";

  try {
    const token = localStorage.getItem("token");
    const response = await axios({
      method: product.id ? "PUT" : "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: product,
    });

    return response.data;
  } catch (error) {

      if (error.response && error.response.status === 403) {
      throw new Error("Bu işlemi gerçekleştirmek için yeterli yetkiniz yok.");
    } else {
      throw error;
    }
  }
}

export function saveProduct(product) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      saveProductApi(product)
        .then((savedProduct) => {
          if (product.id) {
            dispatch(updateProductSuccess(savedProduct));
          } else {
            dispatch(createProductSuccess(savedProduct));
          }
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}


export async function handleResponse(response) {
  if (response.ok) {
    return await response.json();
  }

  const error = await response.text();
  throw new Error(error);
}

export async function handleError(error) {
  console.log("HATA OLUŞTU");
  throw error;
}
