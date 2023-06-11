import axios from "axios";
import * as actionTypes from "./actionTypes";
import jwt_decode from "jwt-decode";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}

export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function deleteProductSuccess(product) {
  return { type: actionTypes.DELETE_PRODUCT_SUCCESS, payload: product };
}

export function getProductsBySeller() {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const user = decodeToken(token);

      if (user && user.role === "seller") {
        const sellerId = user.userId;
        const url = `http://localhost:8000/products-by-seller?seller_id=${sellerId}`;
        const response = await axios.get(url);

        dispatch(getProductsSuccess(response.data));
      } else {
        console.error("User is not authorized to access seller products.");
      }
    } catch (error) {
      console.error(error);
    }
  };
}

function decodeToken(token) {
  try {
    return jwt_decode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

export function updateProductStock(productID, stock) {
  return async function (dispatch) {
    try {
      const response = await fetch(
        `http://localhost:8000/update-product-stock/${productID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stock }),
        }
      );
      if (response.ok) {
        dispatch({
          type: actionTypes.UPDATE_PRODUCT_STOCK,
          payload: { productID, stock },
        });
      } else {
      }
    } catch (error) {}
  };
}

export async function deleteProductApi(productId) {
  const url = `http://localhost:8000/delete-product/${productId}`;

  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(url, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export function deleteProduct(productId) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      deleteProductApi(productId)
        .then(() => {
          dispatch(deleteProductSuccess(productId));
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
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
    } catch (error) {}
  };
}

export async function saveProductApi(product) {
  const token = localStorage.getItem("token");
  const user = decodeToken(token);

  if (user && user.role === "seller") {
    product.seller_id = user.userId;
  }

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
