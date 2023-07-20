import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import currencyReducer from "./currencyReducer";
const reducer = combineReducers({
  products: productsReducer,
  currency: currencyReducer,
});

export default reducer;
export type RootState = ReturnType<typeof reducer>;
