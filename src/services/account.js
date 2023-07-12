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

export {signupAxios, loginAxios, getUserInfoAxios, refreshTokenAxios};
