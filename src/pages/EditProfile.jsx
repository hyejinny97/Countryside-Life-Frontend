import { useState } from 'react';
import { BsCamera } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { AccountBox, RemoveAccountModal } from '@components/account';
import { ImageFileInput, Input, Button } from '@components/ui';
import { Link } from 'react-router-dom';

function EditProfile() {
    const [image, setImage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleImage = (imageUrl) => {
        setImage(imageUrl)
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    const imageInputProps = {
        label: '프로필이미지',
        labelContent: <BsCamera />,
        name: 'image',
        className: 'EditProfile__image-input',
        onChange: (e) => handleImage(URL.createObjectURL(e.target.files[0])),
    }

    const usernameInputProps = {
        type: 'text',
        label: '아이디',
        name: 'username',
        placeholder: '아이디',
        className: 'EditProfile__username',
        invalidTexts: [],
    }

    const nicknameInputProps = {
        type: 'text',
        label: '닉네임',
        name: 'nickname',
        placeholder: '별명',
        className: 'EditProfile__nickname',
        invalidTexts: [],
    }

    return (
        <AccountBox>
            <h2 className="EditProfile__title">회원 정보 수정</h2>
            <div className="EditProfile__image-container">
                {image ? 
                    <img className="EditProfile__image" src={image} alt='profile' /> : 
                    <FaUserCircle className="EditProfile__icon-user"/>
                }
                <ImageFileInput {...imageInputProps} />
            </div>
            <Input {...usernameInputProps}/>
            <Input {...nicknameInputProps}/>
            <div className="EditProfile__change-password">
                <AiFillLock />
                <Link to='/change-password'>비밀번호 변경하기</Link>
            </div>
            <Button primaryDark>회원 정보 수정</Button>
            <p className="EditProfile__remove-account" onClick={() => setShowModal(!showModal)}>계정탈퇴</p>
            {showModal && <RemoveAccountModal handleModalClose={handleModalClose} />}
        </AccountBox>
    );
}

export default EditProfile;