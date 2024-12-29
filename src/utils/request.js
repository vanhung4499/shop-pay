const axios = require('axios')
const config = require('../config/config')
const {ResultCode} = require("../common/constants");

// Create a new axios instance for requests to the shop API
const request = axios.create({
  baseURL: config.shop.url,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': config.security.apiKey,
  },
});

// Add a response interceptor
request.interceptors.response.use(
  (response) => {
    const { status, data } = response.data;
    if (status === ResultCode.SUCCESS) {
      return data;
    }

    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

module.exports = request;