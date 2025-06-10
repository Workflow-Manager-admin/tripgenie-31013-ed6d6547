import axios from "axios";

const BASE_URL = 'https://api.geoapify.com/v1/geocode/search';

// You'll need to get your own API key from Geoapify
const API_KEY = '06f5c49b0a5045aa84e623035fe2a1a2';

const config = {
  params: {
    apiKey: API_KEY,
    // You can add other default parameters here
    format: 'json'
  },
  headers: {
    'Content-Type': 'application/json'
  }   
}

export const GetPlaceDetail = (searchText) => {
  return axios.get(BASE_URL, {
    ...config,
    params: {
      ...config.params,
      text: searchText
    }
  });
}



/*import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': 'AIzaSyCYJiw6Cf4JEQ_ybTzw9iXwBZOtKIKYl3s',
    'X-Goog-FieldMask': ['places.displayName','places.photos','places.id']
  }   
}

export const GetPlaceDetail= (data) => axios.post(BASE_URL,data,config); */