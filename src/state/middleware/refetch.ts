import { Dispatch } from "redux";
import { Action } from "../actions";
import { RootState } from "../index";
import { ActionTypes } from "../action-types";
import { fetchProducts } from "../action-creators";
export const refetchMiddleware = ({
  dispatch,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);
      if ([ActionTypes.MASS_DELETE_PRODUCTS_SUCCESS].includes(action.type)) {
        fetchProducts()(dispatch);
      }
    };
  };
};
