import { ActionTypes } from "../action-types";
import { Product } from "../../types/product";
import { Currency } from "../../types/currency";

interface fetchProductsAction {
  type: ActionTypes.FETCH_PRODUCTS;
}

interface fetchProductsSuccessAction {
  type: ActionTypes.FETCH_PRODUCTS_SUCCESS;
  payload: Product[];
}

interface fetchProductsErrorAction {
  type: ActionTypes.FETCH_PRODUCTS_ERROR;
  payload: string;
}

interface toggleProductItemAction {
  type: ActionTypes.TOGGLE_PRODUCT_ITEM;
  payload: string;
}
interface massDeleteProductsAction {
  type: ActionTypes.MASS_DELETE_PRODUCTS;
  payload: string[];
}

interface massDeleteProductSuccessAction {
  type: ActionTypes.MASS_DELETE_PRODUCTS_SUCCESS;
}

interface massDeleteProductsErrorAction {
  type: ActionTypes.MASS_DELETE_PRODUCTS_ERROR;
  payload: string;
}

interface changeDefaultCurrencyAction {
  type: ActionTypes.CHANGE_DEFAULT_CURRENCY;
  payload: Currency;
}

export type Action =
  | fetchProductsAction
  | fetchProductsSuccessAction
  | fetchProductsErrorAction
  | toggleProductItemAction
  | massDeleteProductsAction
  | massDeleteProductSuccessAction
  | massDeleteProductsErrorAction
  | changeDefaultCurrencyAction;
