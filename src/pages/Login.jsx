import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { AccountBox } from '@components/account';
import { Input, Button } from '@components/ui';

function Login() {
    const usernameInputProps = {
        type: 'text',
        label: '아이디',
        name: 'username',
        placeholder: '아이디',
        className: 'Login__username',
        // helpText: '다른 유저와 겹치지 않도록 입력해 주세요.',
        // invalidTexts: ['동일한 이름의 아이디가 존재합니다.', '최소 8자 이상 작성해주세요.'],
        // left: <BsSearch />,
        // right: <BsSearch />,
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
                <Link to='/signup'>회원가입</Link>
            </p>
        </AccountBox>
    );
}

export default Login;