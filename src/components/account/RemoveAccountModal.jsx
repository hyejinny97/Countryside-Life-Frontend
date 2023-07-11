import { IoMdClose } from "react-icons/io";
import { Modal, Button } from '@components/ui';

function RemoveAccountModal({ handleModalClose }) {
    return (
        <Modal closeIcon={<IoMdClose />} handleModalClose={handleModalClose}>
            <div className='RemoveAccountModal__head'>
                <h4 className='RemoveAccountModal__title'>정말 시골라이프를 떠나실 건가요?</h4>
            </div>
            <div className='RemoveAccountModal__body'>
                <p className='RemoveAccountModal__content'>계정 탈퇴 시 시골라이프 내 모든 활동들이 삭제됩니다.</p>
            </div>
            <div className='RemoveAccountModal__foot'>
                <Button className='RemoveAccountModal__button-close' tertiary onClick={handleModalClose}>취소</Button>
                <Button className='RemoveAccountModal__button-remove' danger>계정탈퇴</Button>
            </div>
        </Modal>
    );
}

export default RemoveAccountModal;