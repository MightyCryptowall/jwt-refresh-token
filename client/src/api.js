import axios from "axios";

const baseURL = "http://localhost:8080/api";

// request interceptor to add the auth token header to requests
axios.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken){
            config.headers["x-auth-token"] = accessToken;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);


// response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;
        let refreshToken = localStorage.getItem("refreshToken");

        if(
            refreshToken &&
            error.response.status === 401 &&
            !originalRequest._retry
        ){
            originalRequest._retry = true;

            return axios
            .post(`${baseURL}/auth/refresh_token`, { refreshToken })
            .then( res => {
                if(res.status === 200){
                    localStorage.setItem("accessToken", res.data.accessToken);
                    console.log("Access token refreshed!");
                    return axios(originalRequest);
                }
            });
        }
        return Promise.reject(error);
    }
);

const api = {
    signup: body => {
        return axios.post(`${baseURL}/auth/signup`, body);
    },
    login: body => {
        return axios.post(`${baseURL}/auth/login`, body);
    },
    refreshToken: body => {
        return axios.post(`${baseURL}/auth/refresh_token`,body);
    },
    logout: body => {
        return axios.delete(`${baseURL}/auth/logout`,body);
    },
    getProtected: () => {
        return axios.get(`${baseURL}/protected_resource`);
    }
};

 export default api;