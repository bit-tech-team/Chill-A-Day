import axios from "axios";
import queryString from "query-string";

class BackendClient {
  backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
  options = {};

  constructor() {
    this.options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      this.options.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }
  }

  get(service, query = {}) {
    return axios.get(`${this.backend_url}${service}`, {
      ...this.options,
      params: query,
    });
  }

  post(service, data = {}) {
    return axios.post(`${this.backend_url}${service}`, data, this.options);
  }

  patch(service, query = {}, data = {}) {
    return axios.patch(
      `${this.backend_url}${service}?${queryString.stringify(query, {
        arrayFormat: "bracket",
      })}`,
      data,
      this.options
    );
  }

  delete(service, query = {}) {
    return axios.delete(
      `${this.backend_url}${service}?${queryString.stringify(query, {
        arrayFormat: "bracket",
      })}`,
      this.options
    );
  }
}

export { BackendClient };
