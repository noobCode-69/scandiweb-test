import { Action } from "../actions";
import { ActionTypes } from "../action-types";
import { Currency } from "../../types/currency";
interface currencyState {
  currency: Currency;
}

const initialState: currencyState = {
  currency: "$",
};

const reducer = (
  state: currencyState = initialState,
  action: Action
): currencyState => {
  switch (action.type) {
    case ActionTypes.CHANGE_DEFAULT_CURRENCY:
      return { currency: action.payload };
    default:
      return state;
  }
};

export default reducer;
