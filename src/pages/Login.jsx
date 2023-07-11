import { Link } from 'react-router-dom';
import { AccountBox } from '@components/account';
import { Input, Button } from '@components/ui';
import { PATH_SIGNUP } from '@constants';

function Login() {
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
        className: 'Login__password'
    }

    return (
        <AccountBox>
            <h2 className="Login__title">로그인</h2>
            <Input {...usernameInputProps}/>
            <Input {...passwordInputProps}/>
            <Button primaryDark>로그인</Button>
            <p className='Login__goto-signup'>
                아직 회원가입을 하지 않으셨나요? &nbsp;
                <Link to={PATH_SIGNUP}>회원가입</Link>
            </p>
        </AccountBox>
    );
}

export default Login;