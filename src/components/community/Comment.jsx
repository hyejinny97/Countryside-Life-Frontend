import { UserImage, WriterInfo, MutateLinks } from '@components/community';

function Comment({ data:{id:commentId, content, created_at, user} }) {
    return (
        <div className='Comment'>
            <UserImage imageUrl={user.image}/>
            <div>
                <WriterInfo nickName={user.nickname} createdTime={created_at} />
                <p className='Comment__content'>{content}</p>
            </div>
            <MutateLinks 
                comment 
                commentId={commentId} 
                handleEditClick={(commentId) => console.log('EditClick')} 
                handleDeleteClick={(commentId) => console.log('DeleteClick')} 
            />
        </div>
    );
}

export default Comment;