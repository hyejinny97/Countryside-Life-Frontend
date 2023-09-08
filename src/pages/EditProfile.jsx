import { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Link, Form, redirect, useActionData } from "react-router-dom";
import { BsCamera } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { AccountBox, RemoveAccountModal } from "@components/account";
import { ImageFileInput, Input, Button } from "@components/ui";
import { PATH_CHANGEPASSWORD, PATH_MYPAGE, PATH_LOGOUT } from "@constants";
import { updateUserInfoAxios, deleteUserInfoAxios } from "@services";
import { store, updateUserInfo, runToast } from "@store";

async function action({ request }) {
  if (request.method === "PUT") {
    const data = Object.fromEntries(await request.formData());

    if (!data.image?.name) delete data.image;

    try {
      const response = await updateUserInfoAxios(data);
      store.dispatch(updateUserInfo(response.data));
      // alert('회원 정보가 성공적으로 수정되었습니다.');
      store.dispatch(runToast("회원 정보가 성공적으로 수정되었습니다."));
      return redirect(PATH_MYPAGE);
    } catch (e) {
      return e.response.data;
    }
  } else if (request.method === "DELETE") {
    try {
      await deleteUserInfoAxios();
      // alert('계정이 성공적으로 삭제되었습니다.');
      store.dispatch(runToast("계정이 성공적으로 삭제되었습니다."));
      return redirect(PATH_LOGOUT);
    } catch (e) {
      // alert('계정을 삭제하는데 실패하였습니다.');
      store.dispatch(runToast("계정을 삭제하는데 실패하였습니다."));
      return null;
    }
  }
}

function EditProfile() {
  const { username, nickname, profileImage } = useSelector(
    ({ user: { username, nickname, profileImage } }) => {
      return {
        username,
        nickname,
        profileImage,
      };
    },
    shallowEqual
  );
  const [image, setImage] = useState(profileImage);
  const [showModal, setShowModal] = useState(false);
  const errors = useActionData();

  const handleImage = (imageUrl) => {
    setImage(imageUrl);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const imageInputProps = {
    label: "프로필이미지",
    labelContent: <BsCamera />,
    name: "image",
    className: "EditProfile__image-input",
    onChange: (e) => handleImage(URL.createObjectURL(e.target.files[0])),
  };

  const usernameInputProps = {
    type: "text",
    label: "아이디",
    name: "username",
    initialValue: username,
    placeholder: "아이디",
    className: "EditProfile__username",
    invalidTexts: errors?.username,
  };

  const nicknameInputProps = {
    type: "text",
    label: "닉네임",
    name: "nickname",
    initialValue: nickname,
    placeholder: "별명",
    className: "EditProfile__nickname",
    invalidTexts: errors?.nickname,
  };

  return (
    <AccountBox>
      <h2 className="EditProfile__title">회원 정보 수정</h2>
      <Form method="put" encType="multipart/form-data">
        <div className="EditProfile__image-container">
          {image ? (
            <img className="EditProfile__image" src={image} alt="profile" />
          ) : (
            <FaUserCircle className="EditProfile__icon-user" />
          )}
          {/* <ImageFileInput {...imageInputProps} /> */}
        </div>
        <Input {...usernameInputProps} />
        <Input {...nicknameInputProps} />
        <div className="EditProfile__change-password">
          <AiFillLock />
          <Link to={PATH_CHANGEPASSWORD}>비밀번호 변경하기</Link>
        </div>
        <Button primaryDark>회원 정보 수정</Button>
      </Form>
      <p
        className="EditProfile__remove-account"
        onClick={() => setShowModal(!showModal)}
      >
        계정탈퇴
      </p>
      {showModal && (
        <Form method="delete">
          <RemoveAccountModal handleModalClose={handleModalClose} />
        </Form>
      )}
    </AccountBox>
  );
}

export default EditProfile;
export { action };
