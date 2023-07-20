import { Action } from "../actions";
import { RootState } from "../reducers/index";

export const loggerMiddleware = ({
  getState,
}: {
  getState: () => RootState;
}) => {
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      console.log("----------------------------");
      console.log("Dispatching:", action);
      next(action);
      console.log("New State", getState());
      console.log("----------------------------");
    };
  };
};
