import axios from "axios";

class API {
  constructor() {
    this.api = axios.create({
      timeout: 300000
    });
  }

  get(url, config) {
    return this.api.get(url, config);
  }

  post(url, data, config) {
    return this.api.post(url, data, config);
  }

  put(url, data, config) {
    return this.api.put(url, data, config);
  }

  baseURL() {
    return this.api.defaults.baseURL;
  }
}

export const api = new API();
