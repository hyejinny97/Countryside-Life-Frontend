import { useState } from "react";
import { useFetcher } from "react-router-dom";
import { Modal, Input, Textarea, Button, Spinner } from "@components/ui";

function MessageModal({ handleModalClose }) {
  const fetcher = useFetcher();
  const [messageValue, setMessageValue] = useState("");

  return (
    <>
      <Modal className="MessageModal" handleModalClose={handleModalClose}>
        <h5 className="MessageModal__title">서비스 개선 요청</h5>
        <fetcher.Form method="post">
          <Input
            className="MessageModal__input"
            type="text"
            name="user_name"
            label="닉네임"
            placeholder="닉네임을 입력하세요."
            invalidTexts={fetcher?.data?.nameInvalidText}
            required
          />
          <Input
            className="MessageModal__input"
            type="email"
            name="user_email"
            label="회신 이메일 주소"
            placeholder="답변을 받을 이메일 주소를 입력하세요."
            required
          />
          <Textarea
            name="message_content"
            label="내용"
            placeholder={`서비스 이용 시 불편한 점이나,\n개선되었으면 하는 요청 사항을 입력하세요.`}
            rows={3}
            invalidTexts={fetcher?.data?.messageInvalidText}
            value={messageValue}
            onChange={(newValue) => setMessageValue(newValue)}
            required
          />
          <Button primaryDark>이메일 보내기</Button>
        </fetcher.Form>
      </Modal>
      {fetcher.state === "submitting" && <Spinner />}
    </>
  );
}

export default MessageModal;
