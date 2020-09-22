import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const useStickyState = (
  key = "sticky",
  initialState = null,
  storeObject = false
) => {
  const [state, setState] = useState(() => {
    const storedState = storeObject
      ? JSON.parse(localStorage.getItem(key))
      : localStorage.getItem(key);
    return storedState ?? initialState;
  });

  useEffect(() => {
    const store = storeObject ? JSON.stringify(state) : state;
    localStorage.setItem(key, store);
  }, [key, state, storeObject]);

  const clearState = () => localStorage.removeItem(key);

  return [state, setState, clearState];
};

const StateContext = createContext();
const DispatchContext = createContext();
const StateProvider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

const useGlobalState = () => useContext(StateContext);
const useGlobalDispatch = () => useContext(DispatchContext);

const useUser = () => {
  const [user, setUser] = useStickyState(
    "user",
    {
      id: "",
      name: "",
      email: "",
      age: "",
      gender: "",
      phone: "",
      qty: "",
    },
    true
  );

  return [user, setUser];
};

const useCart = () => {
  const [cart, setCart] = useStickyState("cart", [], true);

  return [cart, setCart];
};

export { StateProvider, useGlobalDispatch, useGlobalState };
