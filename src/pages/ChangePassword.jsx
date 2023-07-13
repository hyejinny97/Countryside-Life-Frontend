import { Form, useActionData, redirect } from 'react-router-dom';
import { AccountBox } from '@components/account';
import { Input, Button } from '@components/ui';
import { changePasswordAxios } from '@services';
import { PATH_MYPAGE } from '@constants';

async function action({ request }) {
    const data = Object.fromEntries(await request.formData());

    try {
        await changePasswordAxios(data);
        alert('비밀번호가 성공적으로 변경되었습니다.');
        return redirect(PATH_MYPAGE);
    } catch(e) {
        return e.response.data;
    }
}

function ChangePassword() {
    const errors = useActionData();

    const oldPasswordInputProps = {
        type: 'password',
        label: '이전 비밀번호',
        name: 'old_password',
        placeholder: '이전 비밀번호',
        className: 'ChangePassword__old-password',
        invalidTexts: errors?.old_password ? [errors?.old_password.old_password] : [],
    }

    const passwordInputProps = {
        type: 'password',
        label: '새 비밀번호',
        name: 'password',
        placeholder: '새 비밀번호',
        className: 'ChangePassword__password',
        helpText: '8자 이상의 비밀번호를 입력해 주세요.',
        invalidTexts: errors?.password,
    }

    const password2InputProps = {
        type: 'password',
        label: '새 비밀번호 확인',
        name: 'password2',
        placeholder: '새 비밀번호 확인',
        className: 'ChangePassword__password2',
        helpText: '위에 입력한 비밀번호와 동일하게 입력해주세요.',
        invalidTexts: errors?.password2,
    }

    return (
        <AccountBox>
            <h2 className="ChangePassword__title">비밀번호 변경</h2>
            <Form method='put'>
                <Input {...oldPasswordInputProps}/>
                <Input {...passwordInputProps}/>
                <Input {...password2InputProps}/>
                <Button danger>비밀번호 변경</Button>
            </Form>
        </AccountBox>
    );
}

export default ChangePassword;
export {action};