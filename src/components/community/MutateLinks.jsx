import { useState } from 'react';
import { Link, Form } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RemoveTextModal } from '@components/community';

function MutateLinks({ 
    article, 
    comment, 
    editPath, 
    articleId, 
    commentId, 
    handleEditClick, 
    handleDeleteClick 
}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='MutateLinks'>
            {article && <Link to={`${editPath}/${articleId}/`}>수정</Link>}
            {comment && <span onClick={() => handleEditClick(commentId)}>수정</span>}
            &nbsp;|&nbsp;
            <span onClick={() => setShowModal(true)}>삭제</span>
            {showModal && 
                (
                    (article &&
                        <Form method='delete'>
                            <RemoveTextModal article handleModalClose={() => setShowModal(false)}/>
                        </Form>
                    )
                    ||
                    (comment && 
                        <RemoveTextModal comment handleModalClose={() => setShowModal(false)} handleDeleteClick={() => handleDeleteClick(commentId)}/>
                    )
                )
            }
        </div>
    );
}

MutateLinks.propTypes = {
    article: PropTypes.bool,
    comment: PropTypes.bool,
    editPath: PropTypes.string,
    articleId: PropTypes.number,
    handleEditClick: PropTypes.func,
    handleDeleteClick: PropTypes.func,
    selectArticleOrComment: function({ article, comment }) {
        const count = Number(!!article) + Number(!!comment);
        
        if (count > 1) return new Error('article과 comment 중 하나는 반드시 선택해야 함')
    },
    checkArticleCase: function({ article, editPath, articleId }) {
        if (!article) return

        const count = Number(!!article) + Number(!!editPath) + Number(!!articleId);
        
        if (count < 3) return new Error('article일 땐, editPath와 articleId를 꼭 지정해야함')
    },
    checkCommentCase: function({ comment, commentId, handleEditClick, handleDeleteClick }) {
        if (!comment) return

        const count = Number(!!comment) + Number(!!commentId) + Number(!!handleEditClick) + Number(!!handleDeleteClick);
        
        if (count < 4) return new Error('comment일 땐, commentId와 handleEditClick와 handleDeleteClick를 꼭 지정해야함')
    },
};

export default MutateLinks;