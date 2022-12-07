import axios from "axios";

const authedAxios = axios.create();
authedAxios.interceptors.request.use(
    async config => {
        config.headers = {
            'Authorization': `Bearer ${refreshToken()}`,
            'Accept': 'application/json'
        };

        return config;
    },
    error => {
        Promise.reject(error)
    });

authedAxios.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = refreshToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return authedAxios(originalRequest);
    }
    return Promise.reject(error);
});

function refreshToken() {

    if (!localStorage.getItem("token")) {
        // history.pushState({},"home","/Home");

    }

    return localStorage.getItem("token") ? localStorage.getItem("token") : null;
}

export default authedAxios