import axios from "axios";
import Storage from "../utils/Storage";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT_URI,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = Storage.get("c_token");
    if (token!==undefined) return config;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      if (error.response?.data.error === "Expired Token") {
        API.auth.refreshToken();
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

API.auth = {
  login       : (data) => API.post(`/auth/login`, data),
  register    : (data) => API.post(`/auth/register`, data),
  logout      : () => API.post(`/auth/logout`, {}),
  checkToken: (token) => API.post(`/auth/checkToken`, {token}),
  refreshToken: () => {}
};

API.patient = {
  getData: (data) => API.get(`/patients/${data}`),
  file: {
    delete: (data) => API.delete(`/files/${data}`),
    download: (data) => API.get(`/files/${data}`),
  },
  note: {
    delete: (data) => API.delete(`/patients/notes/${data}`),
  },
  visit: {
    getDataBySelectedDate: (date, data) =>
      API.get(`/visits?date=${date}`, { params: data }),
    getVisitCount: (data) =>
      API.get(`/visits/count?year=${data.year}&month=${data.month}`),
    create: (data) => API.post(`/visits`, data),
    delete: (data) => API.delete(`/visits/${data}`),
    update: (id, data) => API.put(`/visits/${id}`, data),
  },
  probe: {
    addSet: (data) => API.post(`/probes/probe_set`, data),
    addCollect: (data) => API.post(`/probes/probe_collect`, data),
  },
};

API.doctor = {
  getList: () => API.get(`/doctors`),
};
export default API;
