import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DELETE_PRODUCT,
  CLEAR_BASKET,
} from "@/data/index";

export const addProductSuccess = (product, msg) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
  msg,
});

export const addProductError = (msg) => ({
  type: ADD_PRODUCT_ERROR,
  msg,
});

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  payload: id,
});

export const clearBasket = () => ({
  type: CLEAR_BASKET,
});
