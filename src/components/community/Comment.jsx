import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserImage, WriterInfo, MutateLinks, CommentForm } from '@components/community';

function Comment({ data:{id:commentId, content, created_at, updated_at, user} }) {    
    const [showEditForm, setShowEditForm] = useState(false);
    const authenticatedUser = useSelector(state => state.user);

    useEffect(() => {
        setShowEditForm(false);
    }, [updated_at])

    const handleEditClick = () => {
        setShowEditForm(true);
    }

    return (
        <div className='Comment'>
            <UserImage imageUrl={user.image}/>
            <div>
                <WriterInfo nickName={user.nickname} createdTime={created_at} />
                {showEditForm ? 
                    <CommentForm initialValue={content} edit commentId={commentId} />:
                    <p className='Comment__content'>{content}</p>
                }
            </div>
            {user.id === authenticatedUser.id &&                     
                (showEditForm ? 
                    <p className='Comment__text--editing'>수정 중...</p>:
                    <MutateLinks 
                        comment 
                        commentId={commentId} 
                        handleEditClick={handleEditClick} 
                    />
                )
            }
        </div>
    );
}

export default Comment;