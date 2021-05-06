// import { get, post } from '@/util/http';
import axios from "axios";

const url = 'https://subangbang.netlify.app/.netlify/functions/cms-gw';
const urlUpload = 'https://subangbang.netlify.app/.netlify/functions/cms-gw/upload';


export const getCMS = () => axios.get(url,{ useCache: true });
export const postCMS = params => axios.post(url, params , { useCache: true });
export const postUpload = params => axios.post(urlUpload, params, {headers: {'Content-Type': 'multipart/form-data'}});