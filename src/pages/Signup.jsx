import { Link } from 'react-router-dom';
import { AccountBox } from '@components/account';
import { Input, Button } from '@components/ui';

function Signup() {
    const usernameInputProps = {
        type: 'text',
        label: '아이디',
        name: 'username',
        placeholder: '아이디',
        className: 'Signup__username',
        helpText: '다른 유저와 겹치지 않도록 입력해 주세요.',
        invalidTexts: [],
    }

    const passwordInputProps = {
        type: 'password',
        label: '비밀번호',
        name: 'password',
        placeholder: '비밀번호',
        className: 'Signup__password',
        helpText: '8자 이상의 비밀번호를 입력해 주세요.',
        invalidTexts: [],
    }

    const checkPasswordInputProps = {
        type: 'password',
        label: '비밀번호 확인',
        name: 'password2',
        placeholder: '비밀번호 확인',
        className: 'Signup__check-password',
        invalidTexts: [],
    }

    const nicknameInputProps = {
        type: 'text',
        label: '닉네임',
        name: 'nickname',
        placeholder: '별명',
        className: 'Signup__nickname',
        invalidTexts: [],
    }

    return (
        <AccountBox>
            <h2 className="Signup__title">회원가입</h2>
            <Input {...usernameInputProps}/>
            <Input {...passwordInputProps}/>
            <Input {...checkPasswordInputProps}/>
            <Input {...nicknameInputProps}/>
            <Link to='/'>
                <Button primaryDark>회원가입하기</Button>
            </Link> 
            <p className='Signup__goto-login'>
                이미 회원 가입을 하셨나요? &nbsp;
                <Link to='/login'>로그인</Link>
            </p>
        </AccountBox>
    );
}

export default Signup;