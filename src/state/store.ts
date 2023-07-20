import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import reducer from "./reducers";
import { loggerMiddleware } from "./middleware/logger";
import { refetchMiddleware } from "./middleware/refetch";
export const store = createStore(
  reducer,
  {},
  applyMiddleware(refetchMiddleware, loggerMiddleware, thunk)
);
