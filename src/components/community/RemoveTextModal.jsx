import PropTypes from 'prop-types';
import { RemoveModal } from '@components/ui';

function RemoveTextModal({ article, comment, handleModalClose, handleDeleteClick }) {
    const removeModalProps = { 
        title: `${(article && '게시글') || (comment && '댓글')}을 삭제하시겠습니까?`, 
        content: '삭제 시 영원히 복구할 수 없습니다.', 
        closeText: '취소', 
        removeText: '삭제', 
        handleModalClose,
        handleDeleteClick,
    }

    return <RemoveModal {...removeModalProps} />;
}

RemoveTextModal.propTypes = {
    article: PropTypes.bool,
    comment: PropTypes.bool,
    handleModalClose: PropTypes.func,
    selectArticleOrComment: function({article, comment}) {
        const count = Number(!!article) + Number(!!comment);
        
        if (count > 1) return new Error('article과 comment 중 하나는 반드시 선택해야 함')
    },
}

export default RemoveTextModal;