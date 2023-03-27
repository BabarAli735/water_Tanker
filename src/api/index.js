import axios from 'axios';
export const base_url = 'http://192.168.100.49:3000/api/v1/';
export const image_url = '';
export const API = {
  IMAGE_URL: image_url,
  BASE_URL: base_url,
};

export const requestGet = (url, extraHeaders = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base_url}${url}`, {
        headers: {
          Accept: 'application/json',
          ...extraHeaders,
        },
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const requestPost = (url, data, isRaw, extraHeaders = {}) => {
  let formData = data || {};
  if (!isRaw && data) {
    formData = new FormData();
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        formData.append(key, data[key]);
      }
    }
  }
  return new Promise((resolve, reject) => {
    axios
      .post(base_url + url, formData, {
        headers: {
          Accept: 'application/json',
          ...extraHeaders,
        },
      })
      .then(response => {
        console.log('API', url, 'requestPost-response.status', response.data);
        resolve(response);
      })
      .catch(error => {
        console.log('API', url, 'requestPost-error', error);
        reject(error);
      });
  });
};
export const requestPostUrlEncoded = (url, data, extraHeaders = {}) => {
  let params = data || {};
   params = new URLSearchParams();

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        params.append(key, data[key]);
      }
    }
  return new Promise((resolve, reject) => {
    axios
      .post(base_url + url, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...extraHeaders,
        },
      })
      .then(response => {
        // console.log('API', url, 'requestPost-response.status', response.data);
        resolve(response.data);
      })
      .catch(error => {
        // console.log('API', url, 'requestPost-error', error?.response?.data);
        reject(error);
      });
  });
};
axios.interceptors.request.use(
  async config => {
   
    return config;
  },
  err => {
    // console.log('Error', err);
    return Promise.reject(err);
  },
);
axios.interceptors.response.use(
  async response => {
   
    return response;
  },
  err => {
    // console.log('Error', err);
    return Promise.reject(err);
  },
);
