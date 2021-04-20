// import { get, post } from '@/util/http';
import axios from "axios";

const url = 'https://subangbang.netlify.app/.netlify/functions/cms-gw';
const urlUpload = 'https://subangbang.netlify.app/.netlify/functions/cms-gw/upload';

// export const test = () => get('/');
// export const login = params => post('login', params);
// export const reg = params => post('reg', params);
// export const hotSale = () => post('hotsale');
// export const saleGroup = () => post('salegroup');
// export const discover = () => post('discover');
// export const getCartCount = () => post('getCartCount');
// export const getCart = () => post('getCart');
// export const updateCartCount = params => post('updateCartCount', params);
// export const addToCart = params => post('addToCart', params);
// export const delFromCart = params => post('delFromCart', params);
// export const getAddress = () => post('getAddress');
// export const getOrder = () => post('getOrder');
// export const createOrder = params => post('createOrder', params);
// export const getGoodById = params => post('getGoodById', params);
export const postCMS = params => axios.post(url, params , { useCache: true });
export const postUpload = params => axios.post(urlUpload, params, {headers: {'Content-Type': 'multipart/form-data'}});