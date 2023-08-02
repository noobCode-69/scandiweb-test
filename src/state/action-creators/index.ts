/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "redux";
import { Currency } from "../../types/currency";

export const fetchProducts = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.FETCH_PRODUCTS,
    });
    try {
      let { data } = await axios.get(import.meta.env.VITE_HOST_URL);

      data = data.map((item: any) => {
        return {
          ...item,
          attributes: JSON.parse(item.attributes),
          isSet: false,
        };
      });
      dispatch({
        type: ActionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch({
          type: ActionTypes.FETCH_PRODUCTS_ERROR,
          payload: error.message,
        });
      }
    }
  };
};

export const toggleProductItem = (id: string) => {
  return {
    type: ActionTypes.TOGGLE_PRODUCT_ITEM,
    payload: id,
  };
};

export const massDeleteProducts = (products: string[]) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.MASS_DELETE_PRODUCTS,
      payload: products,
    });

    try {
      await axios.delete(import.meta.env.VITE_HOST_URL, {
        data: { skus: products },
      });
      dispatch({
        type: ActionTypes.MASS_DELETE_PRODUCTS_SUCCESS,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch({
          type: ActionTypes.FETCH_PRODUCTS_ERROR,
          payload: error.message,
        });
      }
    }
  };
};

export const changeDefaultCurrency = (currency: Currency) => {
  return {
    type: ActionTypes.CHANGE_DEFAULT_CURRENCY,
    payload: currency,
  };
};
