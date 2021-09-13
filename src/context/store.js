import { useReducer, createContext } from "react";
// Reducer
import { initialState, reducer } from "./reducer";

export const Store = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};