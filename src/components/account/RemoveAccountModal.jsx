import { RemoveModal } from '@components/ui';

function RemoveAccountModal({ handleModalClose }) {
    const removeModalProps = { 
        title: '정말 시골라이프를 떠나실 건가요?', 
        content: '계정 탈퇴 시 시골라이프 내 모든 활동들이 삭제됩니다.', 
        closeText: '취소', 
        removeText: '계정탈퇴', 
        handleModalClose 
    }

    return <RemoveModal {...removeModalProps} />;
}

export default RemoveAccountModal;