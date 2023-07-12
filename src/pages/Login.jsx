import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link, Form, redirect, useNavigation, useActionData } from 'react-router-dom';
import { AccountBox } from '@components/account';
import { Input, Button, Spinner } from '@components/ui';
import { PATH_SIGNUP, PATH_ROOT } from '@constants';
import { loginAxios, getUserInfoAxios } from '@services';
import { store, setUserInfo } from '@store';

async function action({ request }) {
    const data = Object.fromEntries(await request.formData());
    try {
        const response = await loginAxios(data);
        const { access, refresh } = response.data;

        // access token은 request header에 저장
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        
        // store에 user 정보 저장
        const userInfo = await getUserInfoAxios();
        store.dispatch(setUserInfo(userInfo.data));
        
        // refresh token은 cookie에 저장
        const cookies = new Cookies();
        cookies.set('refresh_token', refresh);

        return redirect(PATH_ROOT);
    } catch (e) {
        return e.response.data
    }
}

function Login() {
    const navigation = useNavigation();
    const errors = useActionData();

    const usernameInputProps = {
        type: 'text',
        label: '아이디',
        name: 'username',
        placeholder: '아이디',
        className: 'Login__username',
    }

    const passwordInputProps = {
        type: 'password',
        label: '비밀번호',
        name: 'password',
        placeholder: '비밀번호',
        className: 'Login__password',
    }

    return (
        <AccountBox>
            <h2 className="Login__title">로그인</h2>
            <Form method='post'>
                {errors?.detail && <p className="Login__error-message">입력하신 아이디/비밀번호가 존재하지 않습니다.</p>}
                <Input {...usernameInputProps}/>
                <Input {...passwordInputProps}/>
                <Button primaryDark>로그인</Button>
            </Form>
            <p className='Login__goto-signup'>
                아직 회원가입을 하지 않으셨나요? &nbsp;
                <Link to={PATH_SIGNUP}>회원가입</Link>
            </p>
            {navigation.state === 'submitting' && <Spinner />}
        </AccountBox>
    );
}

export default Login;
export {action};