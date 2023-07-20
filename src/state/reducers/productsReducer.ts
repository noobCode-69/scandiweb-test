/* eslint-disable no-case-declarations */
import { Action } from "../actions";

import { ActionTypes } from "../action-types";
import { Product } from "../../types/product";

interface productsState {
  loading: boolean;
  error: string | null;
  data: Product[];
}

const initialState: productsState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: productsState = initialState,
  action: Action
): productsState => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCTS:
      return { loading: true, error: null, data: [] };
    case ActionTypes.FETCH_PRODUCTS_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionTypes.FETCH_PRODUCTS_ERROR:
      return { loading: false, error: action.payload, data: [] };
    case ActionTypes.TOGGLE_PRODUCT_ITEM:
      const updatedData = state.data.map((item) => {
        if (item.sku === action.payload) {
          return { ...item, isSet: !item.isSet };
        }
        return item;
      });
      return { loading: false, error: null, data: updatedData };
    case ActionTypes.MASS_DELETE_PRODUCTS:
      return { loading: true, error: null, data: [] };
    case ActionTypes.MASS_DELETE_PRODUCTS_SUCCESS:
      return { loading: false, error: null, data: [] };
    case ActionTypes.MASS_DELETE_PRODUCTS_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default reducer;
