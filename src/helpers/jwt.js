import axios from 'axios';
import Cookies from 'universal-cookie';
import { refreshTokenAxios, getUserInfoAxios, logoutAxios } from '@services';
import { store, setUserInfo } from '@store';
import { JWT_EXPIRRY_TIME } from '@constants';

const processAccessToken = async (accessToken) => {
    // access token은 request header에 저장
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    // store에 user 정보 저장
    const userInfo = await getUserInfoAxios();
    store.dispatch(setUserInfo(userInfo.data));

    // accessToken 만료되기 1분 전에 로그인 연장
    setTimeout(silentRefresh, JWT_EXPIRRY_TIME - 1 * 60 * 1000);
}

const processRefreshToken = async (refreshToken) => {
    // refresh token은 cookie에 저장
    const cookies = new Cookies();
    cookies.set('refresh_token', refreshToken);
}

const silentRefresh = async () => {
    const cookies = new Cookies();
    const refreshToken = cookies.get('refresh_token');

    if (!refreshToken) {
        throw Error('refresh token 없음')
    };

    try {
        const response = await refreshTokenAxios(refreshToken);
        const { access } = response.data;
        await processAccessToken(access);
    } catch (e) {
        throw e;
    }
}

const blacklistRefresh = async () => {
    const cookies = new Cookies();
    const refreshToken = cookies.get('refresh_token');

    if (refreshToken) {
        try {
            await logoutAxios(refreshToken);
        } catch (e) {
            console.log(e.response.data);
        }
    }
}

export {processAccessToken, processRefreshToken, silentRefresh, blacklistRefresh};