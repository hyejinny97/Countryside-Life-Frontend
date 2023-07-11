import { AccountBox } from '@components/account';
import { Input, Button } from '@components/ui';

function ChangePassword() {
    const oldPasswordInputProps = {
        type: 'password',
        label: '이전 비밀번호',
        name: 'old_password',
        placeholder: '이전 비밀번호',
        className: 'ChangePassword__old-password',
        invalidTexts: [],
    }

    const passwordInputProps = {
        type: 'password',
        label: '새 비밀번호',
        name: 'password',
        placeholder: '새 비밀번호',
        className: 'ChangePassword__password',
        helpText: '8자 이상의 비밀번호를 입력해 주세요.',
        invalidTexts: [],
    }

    const password2InputProps = {
        type: 'password',
        label: '새 비밀번호 확인',
        name: 'password2',
        placeholder: '새 비밀번호 확인',
        className: 'ChangePassword__password2',
        helpText: '위에 입력한 비밀번호와 동일하게 입력해주세요.',
        invalidTexts: [],
    }

    return (
        <AccountBox>
            <h2 className="ChangePassword__title">비밀번호 변경</h2>
            <Input {...oldPasswordInputProps}/>
            <Input {...passwordInputProps}/>
            <Input {...password2InputProps}/>
            <Button danger>비밀번호 변경</Button>
        </AccountBox>
    );
}

export default ChangePassword;