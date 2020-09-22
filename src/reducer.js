let cartStorage = JSON.parse(localStorage.getItem("cart"));

export const initialState = {
  cart: cartStorage ?? [],
  user: null,
};

export const ACTION = {
  ADD_TO_CART: 1,
  CLEAR_CART: 2,
  REMOVE_FROM_CART: 3,
  SET_USER: 4,
};

export const getCartTotalCost = (cart) =>
  cart?.reduce((amount, item) => Number(item.price) + amount, 0);

export const getTicketsQuantity = (cart) => {
  const tickets = new Map();
  for (const item of cart) {
    if (!tickets.has(item.id)) {
      tickets.set(item.id, { ...item, qty: 1 });
    } else {
      let existedItem = tickets.get(item.id);
      existedItem.qty += 1;
      tickets.set(item.id, existedItem);
    }
  }
  return [...tickets.values()];
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case ACTION.ADD_TO_CART: {
      let newCart = [...state.cart, action.item];

      localStorage.setItem("cart", JSON.stringify(newCart));

      return {
        ...state,
        cart: newCart,
      };
    }

    case ACTION.CLEAR_CART: {
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: [],
      };
    }

    case ACTION.REMOVE_FROM_CART: {
      const index = state.cart.findIndex((item) => item.id === action.id);
      let newCart = [...state.cart];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in cart!`
        );
      }

      localStorage.setItem("cart", JSON.stringify(newCart));

      return {
        ...state,
        cart: newCart,
      };
    }

    case ACTION.SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }

    default:
      return state;
  }
};

export default reducer;
