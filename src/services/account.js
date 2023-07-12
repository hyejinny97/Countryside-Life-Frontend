import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const signupAxios = async (data) => {
    return await axios({
        method: 'post',
        url: baseURL + '/accounts/register/',
        data: data,
    });
}

export {signupAxios};
