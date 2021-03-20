import axios from "axios";
//import data from "~/static/storedata.json";
//import {data} from "~/plugins/storedata.js";




export const state = () => ({
  cartUIStatus: "idle",
  storedata: "" ,
  cart: [],
  clientSecret: "" // Required to initiate the payment from the client
});

console.log("S-Data:"+JSON.stringify(state.storedata))
console.log("S-Data:"+state.storedata)


export const getters = {
  featuredProducts: state => {
	  console.log("get-S-Data:"+JSON.stringify(state.storedata))
	  return state.storedata.slice(0, 3)},
  women: state => state.storedata.filter(el => el.gender === "Female"),
  men: state => state.storedata.filter(el => el.gender === "Male"),
  tshirts: state => state.storedata.filter(el => el.category.name === "T-Shirts"),
  accessories: state => state.storedata.filter(el => el.category.name === "Accessories"),
  cartCount: state => {
    if (!state.cart.length) return 0;
    return state.cart.reduce((ac, next) => ac + next.quantity, 0);
  },
  cartTotal: state => {
    if (!state.cart.length) return 0;
    return state.cart.reduce((ac, next) => ac + next.quantity * next.price, 0);
  },
  cartItems: state => {
    if (!state.cart.length) return [];
    return state.cart.map(item => {
      return {
        id: item.id,
        quantity: item.quantity
      };
    });
  },
  clientSecret: state => state.clientSecret
};

export const mutations = {
  updateCartUI: (state, payload) => {
    state.cartUIStatus = payload;
  },
  clearCart: state => {
    //this clears the cart
    (state.cart = []), (state.cartUIStatus = "idle");
  },
  addToCart: (state, payload) => {
    let itemfound = state.cart.find(el => el.id === payload.id);
    itemfound
      ? (itemfound.quantity += payload.quantity)
      : state.cart.push(payload)
  },
  setClientSecret: (state, payload) => {
    state.clientSecret = payload;
  },
  setStoredata: (state, payload) => {
    state.storedata = payload;
  }, 
  addOneToCart: (state, payload) => {
    let itemfound = state.cart.find(el => el.id === payload.id)
    itemfound ? itemfound.quantity++ : state.cart.push(payload)
  },
  removeOneFromCart: (state, payload) => {
    let index = state.cart.findIndex(el => el.id === payload.id)
    state.cart[index].quantity
      ? state.cart[index].quantity--
      : state.cart.splice(index, 1)
  },
  removeAllFromCart: (state, payload) => {
    state.cart = state.cart.filter(el => el.id !== payload.id)
  }
};

export const actions = {
  async createPaymentIntent({ getters, commit }) {
    try {
      // Create a PaymentIntent with the information about the order
      const result = await axios.post(
        "https://ecommerce-netlify.netlify.app/.netlify/functions/create-payment-intent",
        {
          items: getters.cartItems
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (result.data.clientSecret) {
        // Store a reference to the client secret created by the PaymentIntent
        // This secret will be used to finalize the payment from the client
        commit("setClientSecret", result.data.clientSecret);
      }
    } catch (e) {
      console.log("error", e);
    }
  },
  async getProducts({commit}) {
    const products = await axios.get("https://subangbang.netlify.app/.netlify/functions/cms-gw", { useCache: true });
	console.log("Products-actions:"+JSON.stringify(products.data.products))
    commit("setStoredata", products.data.products);
  }
};
