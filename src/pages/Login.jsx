import { Link, Form, redirect, useNavigation, useActionData } from 'react-router-dom';
import { AccountBox } from '@components/account';
import { Input, Button, Spinner } from '@components/ui';
import { PATH_SIGNUP, PATH_ROOT } from '@constants';
import { loginAxios } from '@services';
import { processAccessToken, processRefreshToken } from '@helpers';

async function action({ request }) {
    const data = Object.fromEntries(await request.formData());
    try {
        const response = await loginAxios(data);
        const { access, refresh } = response.data;

        processAccessToken(access);
        processRefreshToken(refresh);

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