import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const signupAxios = async (data) => {
    return await axios({
        method: 'post',
        url: baseURL + '/accounts/register/',
        data: data,
    });
}

const getUserInfoAxios = async () => {
    return await axios({
        method: 'get',
        url: baseURL + '/accounts/user/',
    });
}

const updateUserInfoAxios = async (data) => {
    return await axios({
        method: 'put',
        url: baseURL + '/accounts/user/',
        headers: {"Content-Type": "multipart/form-data"},
        data: data,
    });
}

const loginAxios = async (data) => {
    return await axios({
        method: 'post',
        url: baseURL + '/accounts/login/',
        data: data,
    });
}

const refreshTokenAxios = async (refreshToken) => {
    return await axios({
        method: 'post',
        url: baseURL + '/accounts/token/refresh/',
        data: {'refresh': refreshToken},
    });
}

const logoutAxios = async (refreshToken) => {
    return await axios({
        method: 'post',
        url: baseURL + '/accounts/logout/',
        data: {'refresh': refreshToken},
    });
}

export {
    signupAxios, 
    getUserInfoAxios, 
    updateUserInfoAxios,
    loginAxios, 
    logoutAxios, 
    refreshTokenAxios};
