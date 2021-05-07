import axios from "axios";
import { getCMS,postCMS } from '@/api/api';
import {myEncrypt,myDecrypt} from '@/util/mycrypto';
//import data from "~/static/storedata.json";
//import {data} from "~/plugins/storedata.js";




export const state = () => ({
  cartUIStatus: "idle",
  storedata: "" ,
  postdata: "",
  userinfo: {},
  cart: [],
  clientSecret: "" // Required to initiate the payment from the client
});


export const getters = {
  featuredProducts: state => {
	  //console.log("get-StoreData:"+JSON.stringify(state.storedata))
	  //let decryptData = this.$myDecrypt()
	  return state.storedata.slice(0, 4)},
  women: state => state.storedata.filter(el => el.gender === "Female"),
  men: state => state.storedata.filter(el => el.gender === "Male"),
  tshirts: state => state.storedata.filter(el => el.category.name === "T-Shirts"),
  accessories: state => state.storedata.filter(el => el.category.name === "Accessories"),
  addressList: state => {return state.addressList;},
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
  clientSecret: state => state.clientSecret,
  gettersUserInfo: state => {
						//console.log('sessionStorage',sessionStorage.getItem('userinfo'));
						console.log('state.userinfo',state.userinfo);
						let decryptData = myDecrypt(sessionStorage.getItem('userinfo'))
						console.log('gettersUserInfo-decryptData',decryptData);
						return JSON.parse(decryptData);
					 },
  gettersStoreData: state => {
						console.log('state.storedata',state.storedata);
						let decryptData = myDecrypt(localStorage.getItem("storedata"))
						return JSON.parse(decryptData);
					 },
  gettersPostData: state => state.postdata
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
  setStoreData: (state, payload) => {
	//console.log('setStoreData-payload',payload)
	let encryptData = myEncrypt(JSON.stringify(payload))
    state.storedata = payload;
	localStorage.setItem("storedata", encryptData);
	console.log('setStoreData-storedata',state.storedata)
  },
  setUserInfo: (state, payload) => {
    //console.log('setUserInfo-payload',payload)
    let encryptData = myEncrypt(JSON.stringify(payload))
	state.userinfo = payload;
	sessionStorage.setItem('userinfo', encryptData);
	console.log('SETUSERINFO',state.userinfo)
  },
  setPostData: (state, payload) => {
    state.postdata = payload;
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
  },
  SET_ADDRESSLIST_MUTATION: (state, payload) => {
    state.addressList = payload;
  },
  SET_EDITADDRESS_MUTATION: (state, payload) => {
    state.editAddress = payload;
  },
  SET_ADDRESSID_MUTATION: (state, payload) => {
    state.addressId = payload;
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
	await getCMS().then(result => {
		//console.log("Products-actions:"+JSON.stringify(result.data.products))
		let encryptData = myEncrypt(JSON.stringify(result.data.products))
		let decryptData = myDecrypt(encryptData)

		//console.log(decryptData)
		commit("setStoreData", result.data.products);
	})
	.catch(error => {
		console.log(error);
	});
  },
  async getUserInfo({getters,commit}) {
    const userinfo = await axios.post("https://subangbang.netlify.app/.netlify/functions/cms-gw", getters.gettersPostData);
	//console.log("UserInfo-actions:"+JSON.stringify(userinfo.data.suUser))
	let encryptData = await myEncrypt(JSON.stringify(userinfo.data.suUser))
	let decryptData = await myDecrypt(encryptData)
	
    commit("setUserInfo", userinfo.data.suUser);
	console.log("Finish SET");
  }
};
