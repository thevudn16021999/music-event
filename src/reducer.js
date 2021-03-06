import { db } from "./firebase";

// let cartStorage = JSON.parse(localStorage.getItem("cart"));

export const initialState = {
  // cart: new Map(cartStorage),
  cart: new Map(),
  ticketType: [],
  user: null,
  tickets: [],
};

export const ACTION = {
  ADD_TO_CART: 1,
  CLEAR_CART: 2,
  REMOVE_FROM_CART: 3,
  SET_USER: 4,
  LOAD_TICKETTYPE: 5,
  LOAD_TICKETS: 6,
};

export const getCartTotalCost = (cart) => {
  let cost = 0;
  for (const [item, qty] of cart) {
    cost += item.price * qty;
  }
  return cost;
};

export const getTicketQuantity = (cart, item = null) => {
  if (item) {
    return cart?.get(item);
  } else {
    return [...cart?.values()].reduce((sum, qty) => Number(qty) + sum, 0);
  }
};

export const getOrderByPhone = async (phone) => {
  if (phone === "") return [];
  let orders = [];
  await db
    .collection("orders")
    .where("userPhone", "==", phone)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
    });
  return orders;
};

export const getOrderByEmail = async (email) => {
  if (email === "") return [];
  let orders = [];
  await db
    .collection("orders")
    .where("email", "==", email)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
    });
  return orders;
};

export const getCartDetail = (cart) => [...cart.keys()];

export const getTicketType = async (ticketType = [], id = null) => {
  if (ticketType.length === 0) {
    return [
      {
        id: "Ktlfada4M0hUSQXzmdj5-combo",
        name: "Mơ Sớm Combo 5 vé",
        img:
          "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/ticket/dtcombo.jpg",
        imgFont:
          "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/ticket/dtEBFont.jpg",
        price: 1200000,
        services: ["- Vé vào cổng"],
      },
      {
        id: "Ktlfada4M0hUSQXzmdj5",
        name: "Mơ Sớm",
        img:
          "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/ticket/dtEB.jpg",
        imgFont:
          "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/ticket/dtEBFont.jpg",
        price: 279000,
        services: ["- Vé vào cổng"],
      },
      {
        id: "rMlDTF1E3K0ucGl4cgMz",
        name: "Mơ Điêu",
        img:
          "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/ticket/dtDieu.jpg",
        imgFont:
          "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/ticket/dtDieuFont.jpg",
        price: 319000,
        services: ["- Vé vào cổng"],
      },
      {
        id: "mf9pokVR3QKLi4Ib1EPV",
        name: "Mơ Xa Hoa",
        img:
          "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/ticket/dtXaHoa.jpg",
        imgFont:
          "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/ticket/dtXaHoaFont.jpg",
        price: 499000,
        services: ["- Tặng nón mũ", "- Vé vào cổng"],
      },
    ];
  }
  if (id !== null) {
    for (const type of ticketType) {
      if (id === type.id) {
        return type;
      }
    }
  } else {
    return ticketType;
  }
};

export const getOrderOfUser = async (uid) => {
  let userRef = db.collection("users").doc(uid);
  let orders = [];
  await db
    .collection("orders")
    .where("uid", "==", userRef)
    .where("paid", "==", false)
    .get({ source: "default" })
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
    });
  return orders.length > 0 ? orders[0] : false;
};

export const getTicketOfUser = async (uid) => {
  // let userRef = db.collection("users").doc(uid);
  let tickets = [];
  await db
    .collection("tickets")
    .where("uid", "==", uid)
    .get({ source: "default" })
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tickets.push({ ...doc.data(), id: doc.id });
      });
    });
  return tickets;
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case ACTION.ADD_TO_CART: {
      let item = action.item;
      let newCart = new Map(state.cart);

      if (newCart.has(item)) {
        newCart.set(item, newCart.get(item) + 1);
      } else {
        newCart.set(item, 1);
      }
      // localStorage.setItem("cart", JSON.stringify(Array.from(newCart)));

      return {
        ...state,
        cart: newCart,
      };
    }

    case ACTION.CLEAR_CART: {
      // localStorage.removeItem("cart");
      return {
        ...state,
        cart: new Map(),
      };
    }

    case ACTION.REMOVE_FROM_CART: {
      let item = action.item;
      let newCart = new Map(state.cart);

      if (newCart.has(item)) {
        let quantity = newCart.get(item);
        if (quantity > 0) {
          newCart.set(item, quantity - 1);
        } else {
          newCart.delete(item);
        }
      } else {
        console.warn(`Cant remove product (id: ${item}) as its not in cart!`);
      }

      // localStorage.setItem("cart", JSON.stringify(Array.from(newCart)));

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

    case ACTION.LOAD_TICKETTYPE: {
      let ticketType = action.tickets;
      return {
        ...state,
        ticketType: ticketType,
      };
    }

    case ACTION.LOAD_TICKETS: {
      let tickets = action.tickets;
      return {
        ...state,
        tickets: tickets,
      };
    }

    default:
      return state;
  }
};

export default reducer;
