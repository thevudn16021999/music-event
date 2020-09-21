import { useEffect, useState } from "react";

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

export { useUser };
